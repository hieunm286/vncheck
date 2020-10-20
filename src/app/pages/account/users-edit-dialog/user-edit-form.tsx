// Form is based on Formik
// Data validation is based on Yup
// Please, be familiar with article first:
// https://hackernoon.com/react-form-validation-with-formik-and-yup-8b76bda62e10
import React from 'react';
import {Modal} from 'react-bootstrap';
import {Field, Form, Formik} from 'formik';
import * as Yup from 'yup';
import {Input, Select, DatePickerField} from '../../../../_metronic/_partials/controls';

// Validation schema
const UserEditSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .email('Vui lòng nhập đúng email')
    .required('Email không được để trống'),
  // dateofbirth: Yup.mixed()
  //   .nullable(false)
  //   .required('Date of Birth is required'),
  first_name: Yup.string()
    .required('Vui lòng nhập First name')
    .matches(/^([^0-9!@#\\$%^&*)(+=._-]*)$/u, {
      message: 'Vui lòng nhập tên đúng định dạng',
    }),
  last_name: Yup.string()
    .required('Last name không được để trống')
    .matches(/^([^0-9!@#\\$%^&*)(+=._-]*)$/u, {
      message: 'Vui lòng nhập tên đúng định dạng',
    }),
  username: Yup.string().required('Username không được để trống'),
  // password: Yup.string().required('Password không được để trống'),
  is_locked: Yup.string().required('Status không được để trống'),
});

const NewUserSchema = Yup.object().shape({
  email: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .email('Vui lòng nhập đúng email')
    .required('Email không được để trống'),
  // dateofbirth: Yup.mixed()
  //   .nullable(false)
  //   .required('Date of Birth is required'),
  first_name: Yup.string()
    .required('Vui lòng nhập First name')
    .matches(/^([^0-9!@#\\$%^&*)(+=._-]*)$/u, {
      message: 'Vui lòng nhập tên đúng định dạng',
    })
    .trim('Tên không thể bắt đầu bằng dấu cách'),
  last_name: Yup.string()
    .required('Last name không được để trống')
    .matches(/^([^0-9!@#\\$%^&*)(+=._-]*)$/u, {
      message: 'Vui lòng nhập tên đúng định dạng',
    }),
  username: Yup.string().required('Username không được để trống'),
  password: Yup.string().required('Password không được để trống'),
});

export function UserEditForm({saveUser, user, actionsLoading, onHide}: any) {
  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={user.username === '' ? user : {...user, password: ''}}
        validationSchema={user.username === '' ? NewUserSchema : UserEditSchema}
        onSubmit={values => {
          // const newValues = {
          //   ...values,
          //   dateofbirth: new Date(values.dateofbirth).toISOString(),
          // };
          console.log(values);
          saveUser(values);
        }}>
        {({handleSubmit}) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              {actionsLoading && (
                <div className="overlay-layer bg-transparent">
                  <div className="spinner spinner-lg spinner-success"/>
                </div>
              )}
              <Form className="form form-label-right">
                <div className="form-group row">
                  {/* Last Name */}
                  <div className="col-lg-4">
                    <Field
                      name="first_name"
                      component={Input}
                      withFeedbackLabel
                      placeholder="Enter First Name"
                      label="First Name"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="last_name"
                      component={Input}
                      withFeedbackLabel
                      placeholder="Enter Last Name"
                      label="Last Name"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="username"
                      component={Input}
                      withFeedbackLabel
                      placeholder="Username"
                      label="Username"
                    />
                  </div>
                </div>
                {/* Email */}
                <div className="form-group row">
                  <div className={user.username === '' ? 'col-lg-4' : 'd-none'}>
                    <Field
                      name="password"
                      component={Input}
                      withFeedbackLabel
                      placeholder="Password"
                      label="Password"
                    />
                  </div>
                  
                  <div className="col-lg-4">
                    <Field
                      //   type="email"
                      name="email"
                      component={Input}
                      withFeedbackLabel
                      placeholder="Email"
                      label="Email"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Select name="is_locked" label="User locking status" withFeedbackLabel>
                      {/* <option defaultValue hidden>
                        Select user locking status
                      </option> */}
                      <option value="0">
                        Normal
                      </option>
                      <option value="1">Locked</option>
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select name="issuer_signature" label="Role" withFeedbackLabel>
                      {/* {COUNTRY_LIST.map((value, key) => (
                      <option key={key} value={value.code}>
                        {value.name}
                      </option>
                    ))} */}
                      {/* <option defaultValue hidden>
                        Please choose user's role
                      </option> */}
                      <option value="User">
                        User
                      </option>
                      
                      <option value="Admin System">Admin System</option>
                    </Select>
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <Select name="issuer_signature" label="Role">
                      {/* {COUNTRY_LIST.map((value, key) => (
                      <option key={key} value={value.code}>
                        {value.name}
                      </option>
                    ))} */}
                      <option hidden>
                        Please choose user's role
                      </option>
                      <option value="Admin System">Admin System</option>
                      <option value="User">User</option>
                    </Select>
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <button type="button" onClick={onHide} className="btn btn-light btn-elevate">
                Cancel
              </button>
              <> </>
              <button
                type="submit"
                onClick={() => handleSubmit()}
                className="btn btn-danger btn-elevate">
                Save
              </button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </>
  );
}
