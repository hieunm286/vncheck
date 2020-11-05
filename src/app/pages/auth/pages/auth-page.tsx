import React, {useLayoutEffect, useState} from 'react';
import {Link, Switch} from 'react-router-dom';
import LoginUsername from './login-username';
import ForgotPassword from './forgot-password';
import '../../../../_metronic/_assets/sass/pages/login/classic/login-1.scss';
import ChangePassword from './change-password';
import LoginPassword from './login-password';
import {FormattedMessage} from 'react-intl';
import ReceiveCode from './receive-code';
import VerificationCode from './verification-code';
import {ToAbsoluteUrl} from "../../../common-library/helpers/assets-helpers";
import {ContentRoute} from "../../../layout/components/content/content-route";

//Custom hook
function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);
  return size;
}

export function AuthPage() {
  const [width] = useWindowSize();
  const {search} = window.location;
  let callbackUrl = new URLSearchParams(search).get('callbackUrl');
  console.log(callbackUrl);
  
  const style = {
    customBg: {
      //   backgroundImage: `url('https://www.chotot.com/kinhnghiem/wp-content/uploads/2015/04/Nen-mua-hay-thue-dat-lam-trang-trai-7.jpg')`,
      backgroundRepeat: `no-repeat`,
      backgroundSize: 'cover',
    },
    linearAside: {
      background: `linear-gradient(to top, rgba(14.12%, 14.51%, 16.86%, 0.45) 150px, rgba(22.35%, 22.35%, 22.35%, 0) 100%) no-repeat cover`,
      backgroundImage: `url(${ToAbsoluteUrl('/media/authImage/bia_vncheck_v2.jpg')})`,
      //   backgroundRepeat: 'no-repeat',
    },
    linearContent: {
      //   background: `linear-gradient(${
      //     width > 992 ? 'to top' : 'to bottom'
      //   }, rgba(14.12%, 14.51%, 16.86%, 0.45) 150px, rgba(22.35%, 22.35%, 22.35%, 0) 100%)`,
    },
  };
  return (
    <>
      <div className="d-flex flex-column flex-root">
        {/*begin::Login*/}
        <div
          className="login login-1 login-signin-on d-flex flex-column flex-lg-row flex-row-fluid bg-white"
          id="kt_login"
          style={style.customBg}>
          {/*begin::Aside*/}
          <div
            className="login-aside d-flex flex-row-auto bgi-size-cover bgi-no-repeat p-10 p-lg-10"
            style={style.linearAside}>
            {/*begin: Aside Container*/}
            <div className="d-flex flex-row-fluid flex-column justify-content-between">
              {/* start:: Aside header */}
              {/* <Link to="/" className="flex-column-auto mt-5">
                <img
                  alt="Logo"
                  className="max-h-70px"
                  src={ToAbsoluteUrl('/media/logos/logo-letter-1.png')}
                />
              </Link> */}
              {/* end:: Aside header */}
              
              {/* start:: Aside content */}
              <div className="flex-column-fluid d-flex flex-column justify-content-center">
                {/* <h3 className="font-size-h1 mb-5 text-white" style={{ fontSize: 50 }}>
                  Welcome to VnCheck!
                </h3>
                <p className="font-weight-lighter text-white opacity-80">
                  Quản lý hàng hóa và truy xuất nguồn gốc sử dụng công nghệ Blockchain
                </p> */}
              </div>
              {/* end:: Aside content */}
              
              {/* start:: Aside footer for desktop */}
              <div className="d-none flex-column-auto d-lg-flex justify-content-between mt-10">
                <div className="opacity-70 font-weight-bold	text-white">&copy; 2020 VnCheck</div>
                <div className="d-flex">
                  {/* <Link to="/terms" className="text-white">
                    <FormattedMessage id="AUTH.GENERAL.PRIVACY" />
                  </Link>
                  <Link to="/terms" className="text-white ml-10">
                    <FormattedMessage id="AUTH.GENERAL.LEGAL" />
                  </Link> */}
                  <Link to="/terms" className="text-white ml-10">
                    <FormattedMessage id="AUTH.GENERAL.CONTACT"/>
                  </Link>
                </div>
              </div>
              {/* end:: Aside footer for desktop */}
            </div>
            {/*end: Aside Container*/}
          </div>
          {/*begin::Aside*/}
          {/* <div className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden">
            <img src={ToAbsoluteUrl('/media/logos/logo-unifarm.png')} alt="logo" />
          </div> */}
          
          {/*begin::Content*/}
          <div
            className="flex-row-fluid d-flex flex-column position-relative p-7 overflow-hidden"
            style={style.linearContent}>
            {/*begin::Content header*/}
            <div
              className="position-absolute top-0 right-0 text-right mt-5 mb-15 mb-lg-0 flex-column-auto justify-content-center py-5 px-10">
              <span className="font-weight-bold text-dark-50">
                <FormattedMessage id="AUTH.GENERAL.NO_ACCOUNT"/>
              </span>
              <Link to="/auth/registration" className="font-weight-bold ml-2" id="kt_login_signup">
                <FormattedMessage id="AUTH.GENERAL.SIGNUP_BUTTON"/>
              </Link>
            </div>
            {/*end::Content header*/}
            
            {/* begin::Content body */}
            <div
              className="d-flex flex-column-fluid justify-content-center align-items-center flex-column mt-30 mt-lg-0 input-section">
              <div className="d-flex justify-content-center align-items-center flex-column mb-10">
                <img src={ToAbsoluteUrl('/media/logos/logo-unifarm.png')} alt="logo" width="50"/>
                <h6 className="text-center mt-5">
                  VNCheck - Giải pháp Blockchain truy xuất nguồn gốc nông sản
                </h6>
              </div>
              <Switch>
                <ContentRoute
                  children={null}
                  path={'/auth/login/identifier'}
                  component={LoginUsername}
                  render={null}
                />
                <ContentRoute
                  children={null}
                  path={'/auth/login/challenge'}
                  component={LoginPassword}
                  render={null}
                />
                <ContentRoute
                  children={null}
                  path={'/auth/change-password'}
                  component={ChangePassword}
                  render={null}
                />
                <ContentRoute
                  children={null}
                  path={'/auth/forgot-password'}
                  component={ForgotPassword}
                  render={null}
                />
                <ContentRoute
                  children={null}
                  path={'/auth/receive-code'}
                  component={ReceiveCode}
                  render={null}
                />
                <ContentRoute
                  children={null}
                  path={'/auth/verify-code'}
                  component={VerificationCode}
                  render={null}
                />
                {/* <Redirect
                    from="/auth"
                    exact={true}
                    to={'/auth/login/identifier?callbackUrl=' + 123}
                />
                <Redirect to={'/auth/login/identifier?callbackUrl=' + 3}/> */}
              </Switch>
            </div>
            {/* <div className="text-right font-weight-bold">Chọn ngôn ngữ của bạn</div> */}
            {/*end::Content body*/}
            
            {/* begin::Mobile footer */}
            <div
              className="d-flex d-lg-none flex-column-auto flex-column flex-sm-row justify-content-between align-items-center mt-5 p-5">
              <div className="text-dark-50 font-weight-bold order-2 order-sm-1 my-2">
                &copy; 2020 Metronic
              </div>
              <div className="d-flex order-1 order-sm-2 my-2"/>
            </div>
            {/* end::Mobile footer */}
          </div>
          {/*end::Content*/}
        </div>
        {/*end::Login*/}
      </div>
    </>
  );
}
