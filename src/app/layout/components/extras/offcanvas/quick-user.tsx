/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,no-undef */
import React from 'react';
import SVG from 'react-inlinesvg';
import {useHistory, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {ToAbsoluteUrl} from '../../../../common-library/helpers/assets-helpers';

const DEFAULT_AVATAR = {
  male: '/media/users/avatar-1.png',
  female: '/media/users/girl-no-avatar.png'
}

export function QuickUser() {
  const history = useHistory();
  const user = useSelector((state: any) => state.auth);
  
  const location = window.location;
  const {pathname} = location;
  const callbackUrl = pathname;
  const logoutClick = () => {
    const toggle = document.getElementById('kt_quick_user_toggle');
    if (toggle) {
      toggle.click();
    }
    history.push({
      pathname: '/logout',
      state: { callbackUrl: callbackUrl }
    });
  };
  return (
    <div id="kt_quick_user" className="offcanvas offcanvas-right offcanvas p-10">
      <div className="offcanvas-header d-flex align-items-center justify-content-between pb-5">
        <h3 className="font-weight-bold m-0">
          Thông tin cá nhân
          {/* <small className="text-muted font-size-sm ml-2">12 messages</small> */}
        </h3>
        <a
          href="#"
          className="btn btn-xs btn-icon btn-light btn-hover-primary"
          id="kt_quick_user_close">
          <i className="ki ki-close icon-xs text-muted"/>
        </a>
      </div>
      
      <div className="offcanvas-content pr-5 mr-n5">
        <div className="d-flex align-items-center mt-5">
          <div className="symbol symbol-100 mr-5">
            <div
              className="symbol-label"
              style={{
                backgroundImage: `url(${user.avatar ? `'${user.avatar}'` : user.image ? `'${user.image}'` : ToAbsoluteUrl(user.gender === '0' ? DEFAULT_AVATAR.female : DEFAULT_AVATAR.male)})`,
              }}
            />
            <i className="symbol-badge bg-success"/>
          </div>
          <div className="d-flex flex-column">
            <a href="#" className="font-weight-bold font-size-h5 text-dark-75 text-hover-primary">
              {user.fullName ? user.fullName : (user.firstName + ' ' + user.lastName)}
            </a>
            <div className="text-muted mt-1">{user.role.name}</div>
            <div className="navi mt-2">
              <a href="#" className="navi-item">
                <span className="navi-link p-0 pb-2">
                  <span className="navi-icon mr-1">
                    <span className="svg-icon-lg svg-icon-primary">
                      <SVG
                        src={ToAbsoluteUrl('/media/svg/icons/Communication/Mail-notification.svg')}
                      />
                    </span>
                  </span>
                  <span className="navi-text text-muted text-hover-primary"> {user.email}</span>
                </span>
              </a>
            </div>
            {/* <Link to="/logout" className="btn btn-light-primary btn-bold">
                Sign Out
              </Link> */}
            <button className="btn btn-light-primary btn-bold" onClick={logoutClick}>
              Đăng xuất
            </button>
          </div>
        </div>
        
        <div className="separator separator-dashed mt-8 mb-5"/>
        
        <div className="navi navi-spacer-x-0 p-0">
          <a href={"/auth/change-password?callbackUrl=" + callbackUrl} className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-success">
                    <SVG src={ToAbsoluteUrl('/media/svg/icons/General/Notification2.svg')}/>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">Đổi mật khẩu</div>
                <div className="text-muted">
                  Thay đổi mật khẩu của bạn!
                  {/* <span className="label label-light-danger label-inline font-weight-bold">
                    update
                  </span> */}
                </div>
              </div>
            </div>
          </a>
          
          {/* <a href="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-warning">
                    <SVG src={ToAbsoluteUrl('/media/svg/icons/Shopping/Chart-bar1.svg')}/>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">My Messages</div>
                <div className="text-muted">Inbox and tasks</div>
              </div>
            </div>
          </a>
          
          <a href="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-danger">
                    <SVG src={ToAbsoluteUrl('/media/svg/icons/Files/Selected-file.svg')}/>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">My Activities</div>
                <div className="text-muted">Logs and notifications</div>
              </div>
            </div>
          </a>
          
          <a href="/user/profile" className="navi-item">
            <div className="navi-link">
              <div className="symbol symbol-40 bg-light mr-3">
                <div className="symbol-label">
                  <span className="svg-icon svg-icon-md svg-icon-primary">
                    <SVG src={ToAbsoluteUrl('/media/svg/icons/Communication/Mail-opened.svg')}/>
                  </span>
                </div>
              </div>
              <div className="navi-text">
                <div className="font-weight-bold">My Tasks</div>
                <div className="text-muted">latest tasks and projects</div>
              </div>
            </div>
          </a> */}
        </div>
        
        <div className="separator separator-dashed my-7"/>
        
        {/* <div>
          <h5 className="mb-5">Recent Notifications</h5>
          
          <div className="d-flex align-items-center bg-light-warning rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-warning mr-5">
              <SVG
                src={ToAbsoluteUrl('/media/svg/icons/Home/Library.svg')}
                className="svg-icon svg-icon-lg"
              />
            </span>
            
            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1">
                Another purpose persuade
              </a>
              <span className="text-muted font-size-sm">Due in 2 Days</span>
            </div>
            
            <span className="font-weight-bolder text-warning py-1 font-size-lg">+28%</span>
          </div>
          
          <div className="d-flex align-items-center bg-light-success rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-success mr-5">
              <SVG
                src={ToAbsoluteUrl('/media/svg/icons/Communication/Write.svg')}
                className="svg-icon svg-icon-lg"
              />
            </span>
            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normal text-dark-75 text-hover-primary font-size-lg mb-1">
                Would be to people
              </a>
              <span className="text-muted font-size-sm">Due in 2 Days</span>
            </div>
            
            <span className="font-weight-bolder text-success py-1 font-size-lg">+50%</span>
          </div>
          
          <div className="d-flex align-items-center bg-light-danger rounded p-5 gutter-b">
            <span className="svg-icon svg-icon-danger mr-5">
              <SVG
                src={ToAbsoluteUrl('/media/svg/icons/Communication/Group-chat.svg')}
                className="svg-icon svg-icon-lg"
              />
            </span>
            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1">
                Purpose would be to persuade
              </a>
              <span className="text-muted font-size-sm">Due in 2 Days</span>
            </div>
            
            <span className="font-weight-bolder text-danger py-1 font-size-lg">-27%</span>
          </div>
          
          <div className="d-flex align-items-center bg-light-info rounded p-5">
            <span className="svg-icon svg-icon-info mr-5">
              <SVG
                src={ToAbsoluteUrl('/media/svg/icons/General/Attachment2.svg')}
                className="svg-icon svg-icon-lg"
              />
            </span>
            
            <div className="d-flex flex-column flex-grow-1 mr-2">
              <a
                href="#"
                className="font-weight-normel text-dark-75 text-hover-primary font-size-lg mb-1">
                The best product
              </a>
              <span className="text-muted font-size-sm">Due in 2 Days</span>
            </div>
            
            <span className="font-weight-bolder text-info py-1 font-size-lg">+8%</span>
          </div>
        </div> */}
      </div>
    </div>
  );
}
