import React, { useEffect, useState } from 'react';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import { FormattedMessage, injectIntl } from 'react-intl';
import * as auth from '../_redux/authRedux';
import { getUserFromIdentity, GetCredential, Ping } from '../_redux/auth.service';
import {
  GenerateKeyPair,
  GenerateKeyPairAndEncrypt,
  loginCryption,
  SignMessage,
  // SymmetricDecrypt,
  VerifyMessage,
} from '../service/AuthCryptography';
import { CERTIFICATE_EXP } from '../../../Const';
import { TextField } from '@material-ui/core';
// eslint-disable-next-line no-restricted-imports
import { makeStyles } from '@material-ui/core/styles';

/*
  INTL (i18n) docs:
  https://github.com/formatjs/react-intl/blob/master/docs/Components.md#formattedmessage
*/

/*
  Formik+YUP:
  https://jaredpalmer.com/formik/docs/tutorial#getfieldprops
*/

const initialValues = {
  username: '',
  password: 'admin',
};

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      backgroundColor: 'white',
    },
  },
}));

const LoginUsername = (props: { saveUserInfo?: any; intl?: any; location?: any }) => {
  const { intl } = props;
  const [loading, setLoading] = useState(false);
  const { location } = props;
  const history = useHistory();
  const [invalidUsername, setInvalidUsername] = useState(false);
  const classes = useStyles();
  const { search } = window.location;
  let callbackUrl = new URLSearchParams(search).get('callbackUrl');
  console.log(window.location);

  const LoginSchema = Yup.object().shape({
    username: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        }),
      ),
    password: Yup.string()
      .min(3, 'Minimum 3 symbols')
      .max(50, 'Maximum 50 symbols')
      .required(
        intl.formatMessage({
          id: 'AUTH.VALIDATION.REQUIRED_FIELD',
        }),
      ),
  });

  // const getInputClasses = (fieldName: any) => {
  //   if (formik.touched[fieldName] && formik.errors[fieldName]) {
  //     return 'is-invalid';
  //   }

  //   if (formik.touched[fieldName] && !formik.errors[fieldName]) {
  //     return 'is-valid';
  //   }

  //   return '';
  // };

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, []);

  const submitUsername = (
    { username }: { username: string },
    { setStatus, setSubmitting }: { setStatus: any; setSubmitting: any },
  ) => {
    setLoading(true);

    setTimeout(() => {
      GetCredential(username)
        .then(response => {
          console.log(response.data);
          const {
            encryptedPrivateKey,
            publicKey,
            username,
          }: {
            encryptedPrivateKey: string;
            publicKey: string;
            username: string;
          } = response.data;
          const fullName = response.data.firstName + ' ' + response.data.lastName;
          localStorage.setItem('userInfo', JSON.stringify({ username, fullName }));

          // const _privateKey = SymmetricDecrypt(encryptedPrivateKey, password);
          // console.log(_privateKey);
          // const certificate = GenerateCertificate(
          //   {
          //     username,
          //     timestamp: new Date(),
          //     exp: CERTIFICATE_EXP,
          //   },
          //   _privateKey,
          // );
          // console.log(certificate);
          // VerifyMessage(certificate.publicKey, certificate.certificateInfo, certificate.signature);
          // const isValidUser = certificate.publicKey === publicKey;
          // console.log(isValidUser);
          props.saveUserInfo({
            ...response.data,
            fullName: response.data.firstName + ' ' + response.data.lastName,
            // _certificate: certificate,
            // _preLoggedIn: true,
            // _privateKey,
          });
          history.push('/auth/login/challenge?callbackUrl=' + callbackUrl);

          // const accessToken = response.data.token;
          // Ping(certificate)
          //   .then(res => {
          //     console.log(res);
          //     props.saveUserInfo({
          //       ...res.data,
          //       fullName: res.data.first_name + ' ' + res.data.last_name,
          //       _certificate: certificate,
          //       _privateKey,
          //       _preLoggedIn: false,
          //     });
          //   })
          //   .catch(err => {
          //     props.savePingErrorData(err.response.data);
          //   });
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          setSubmitting(false);
          setStatus(
            intl.formatMessage({
              id: 'AUTH.VALIDATION.INVALID_USERNAME',
            }),
          );
          setInvalidUsername(true);
        });
    }, 200);
  };

  const GenerateCertificate = (
    certificateInfo: { username: string; timeStamp: Date; exp: number },
    privateKey: string,
  ) => {
    const keyPair = GenerateKeyPair(privateKey);
    const signature = SignMessage(privateKey, certificateInfo);
    return { signature, certificateInfo, publicKey: keyPair.publicKey };
  };

  const formik = useFormik({
    initialValues,
    validationSchema: LoginSchema,
    onSubmit: submitUsername,
  });

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
  };

  return (
    <div
      className="login-form login-signin p-5"
      id="kt_login_signin_form"
      //   style={{
      //     background: `linear-gradient(to right, rgba(21.96%, 17.25%, 21.96%, 0.55) 150px, rgba(27.06%, 25.88%, 27.06%, 0.41) 100%)`,
      //     borderRadius: 10,
      //   }}
    >
      {/* begin::Head */}
      <div className="text-center mb-10 mb-lg-10">
        <h3 className="font-size-h1">
          <FormattedMessage id="AUTH.LOGIN.TITLE" />
        </h3>
        <p className="text-muted font-weight-bold">Vui lòng nhập tên đăng nhập của bạn</p>
      </div>
      {/* end::Head */}

      {/*begin::Form*/}
      <form
        onSubmit={formik.handleSubmit}
        className="form fv-plugins-bootstrap fv-plugins-framework">
        <div className="form-group fv-plugins-icon-container">
          {/* <input
            placeholder="Username"
            type="text"
            className={`form-control form-control-solid h-auto py-5 px-6 ${getInputClasses(
              'username',
            )}`}
            name="username"
            {...formik.getFieldProps('username')}
          /> */}
          <TextField
            id="outlined-basic"
            autoFocus
            className={`form-control form-control-solid h-auto`}
            label="Tên đăng nhập"
            variant="outlined"
            // name="username"
            // onClick={() => alert('cc')}

            {...formik.getFieldProps('username')}
          />
          {formik.touched.username && formik.errors.username ? (
            <div className="fv-plugins-message-container">
              <div className="fv-help-block">{formik.errors.username}</div>
            </div>
          ) : null}
          {formik.status && <span className="text-danger font-weight-bold">{formik.status}</span>}
        </div>
        <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
          <Link
            to="/auth/forgot-password"
            className="text-dark-50 text-hover-primary my-3 mr-2"
            id="kt_login_forgot">
            <p className="text-muted font-weight-bold"></p>
          </Link>
          <button
            id="kt_login_signin_submit"
            type="submit"
            // disabled={formik.isSubmitting}
            className={`btn btn-danger font-weight-bold px-9 py-4 my-3`}>
            <span>Tiếp theo</span>
            {loading && <span className="ml-3 spinner spinner-white"></span>}
          </button>
        </div>
      </form>
      {/*end::Form*/}
    </div>
  );
};

export default injectIntl(connect(null, auth.actions)(LoginUsername));
