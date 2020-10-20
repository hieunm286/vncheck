/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';
import SVG from 'react-inlinesvg';
import { useIntl } from 'react-intl';
import { makeStyles } from '@material-ui/core/styles';
import { ToAbsoluteUrl } from '../../../../components/helpers/assets-helpers';
import { CheckIsActive } from '../../../../components/helpers/router-helpers';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const useStyles = makeStyles(theme => ({
  subMenu: {
    paddingLeft: '50px',
  },
}));

export function AsideMenuList({ layoutProps }: any) {
  const intl = useIntl();
  const location = useLocation();
  const getMenuItemActive = (url: string, hasSubmenu = false) => {
    return CheckIsActive(location, url)
      ? ` ${!hasSubmenu && 'menu-item-active'} menu-item-open `
      : '';
  };

  const classes = useStyles();

  return (
    <>
      {/* begin::Menu Nav */}
      <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        {/*begin::1 Level*/}
        <li className={`menu-item ${getMenuItemActive('/dashboard', false)}`} aria-haspopup="true">
          <NavLink className="menu-link" to="/dashboard">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/dashboard.svg')} />
            </span>
            <span className="menu-text">{intl.formatMessage({ id: 'MENU.DASHBOARD' })}</span>
          </NavLink>
        </li>
        {/*end::1 Level*/}

        {/* Components */}
        {/* begin::section */}
        <li className="menu-section ">
          <h4 className="menu-text">{intl.formatMessage({ id: 'MENU.MANAGEMENT.USERS' })}</h4>
          <i className="menu-icon flaticon-more-v2" />
        </li>
        {/* end:: section */}

        {/*User management*/}

        <li
          className={`menu-item ${getMenuItemActive('/account/user', false)}`}
          aria-haspopup="true">
          <NavLink className="menu-link" to="/account/user">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/account.svg')} style={{ width: 22 }} />
            </span>
            <span className="menu-text">
              {intl.formatMessage({ id: 'MENU.MANAGEMENT.ACCOUNTS' })}
            </span>
          </NavLink>
        </li>

        {/*Roles*/}
        <li className={`menu-item ${getMenuItemActive('/websocket', false)}`} aria-haspopup="true">
          <NavLink className="menu-link" to="/websocket">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/role.svg')} />
            </span>
            <span className="menu-text">{intl.formatMessage({ id: 'MENU.MANAGEMENT.ROLES' })}</span>
          </NavLink>
        </li>

        <li className={`menu-item ${getMenuItemActive('/websocket', false)}`} aria-haspopup="true">
          <NavLink className="menu-link" to="/websocket">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/organize-tree.svg')} />
            </span>
            <span className="menu-text">
              {intl.formatMessage({ id: 'MENU.MANAGEMENT.ORGANIZE-TREE' })}
            </span>
          </NavLink>
        </li>

        <li className="menu-section ">
          <h4 className="menu-text">
            {intl.formatMessage({ id: 'MENU.MANAGEMENT.DATA.CATEGORIES' })}
          </h4>
          <i className="menu-icon flaticon-more-v2" />
        </li>

        {/*Danh mục dữ liệu */}

        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive('/category', true)}`}
          aria-haspopup="true"
          data-menu-toggle="hover">
          <NavLink className="menu-link menu-toggle" to="/category">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/product.svg')} />
            </span>
            <span className="menu-text">
              {intl.formatMessage({ id: 'MENU.MANAGEMENT.CATEGORIES' })}
            </span>
          </NavLink>
          <div className="menu-submenu ">
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">
                    {intl.formatMessage({ id: 'MENU.MANAGEMENT.BASIC-UNIT' })}
                  </span>
                </span>
              </li>
              <li
                className={`menu-item  ${getMenuItemActive('/category/basic-unit')}`}
                aria-haspopup="true">
                <NavLink
                  className="menu-link"
                  to="/category/basic-unit"
                  style={{ paddingLeft: '50px' }}>
                  <span className="svg-icon menu-icon">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M11.5 12.4584C11.7542 12.4584 11.9979 12.3574 12.1776 12.1777C12.3574 11.9979 12.4583 11.7542 12.4583 11.5V5.75002C12.4583 5.49585 12.3574 5.2521 12.1776 5.07238C11.9979 4.89265 11.7542 4.79169 11.5 4.79169H5.74999C5.49582 4.79169 5.25207 4.89265 5.07235 5.07238C4.89262 5.2521 4.79166 5.49585 4.79166 5.75002V11.5C4.79166 11.7542 4.89262 11.9979 5.07235 12.1777C5.25207 12.3574 5.49582 12.4584 5.74999 12.4584H11.5Z"
                        fill="white"
                      />
                      <path
                        d="M1.91667 12.4583H2.875V4.79167C2.875 4.28333 3.07693 3.79582 3.43638 3.43638C3.79582 3.07693 4.28333 2.875 4.79167 2.875H12.4583V1.91667C12.4583 1.40833 12.2564 0.920823 11.897 0.561379C11.5375 0.201934 11.05 0 10.5417 0H1.91667C1.40833 0 0.920823 0.201934 0.561379 0.561379C0.201934 0.920823 0 1.40833 0 1.91667V10.5417C0 11.05 0.201934 11.5375 0.561379 11.897C0.920823 12.2564 1.40833 12.4583 1.91667 12.4583ZM4.79167 15.3333C4.79167 15.8417 4.9936 16.3292 5.35305 16.6886C5.71249 17.0481 6.2 17.25 6.70833 17.25H15.3333C15.8417 17.25 16.3292 17.0481 16.6886 16.6886C17.0481 16.3292 17.25 15.8417 17.25 15.3333V6.70833C17.25 6.2 17.0481 5.71249 16.6886 5.35305C16.3292 4.9936 15.8417 4.79167 15.3333 4.79167H14.375V12.4583C14.375 12.9667 14.1731 13.4542 13.8136 13.8136C13.4542 14.1731 12.9667 14.375 12.4583 14.375H4.79167V15.3333Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                  <span className="menu-text">
                    {intl.formatMessage({ id: 'MENU.MANAGEMENT.BASIC-UNIT' })}
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        <li
          className={`menu-item menu-item-submenu ${getMenuItemActive('/agency', true)}`}
          aria-haspopup="true"
          data-menu-toggle="hover">
          <NavLink className="menu-link menu-toggle" to="/agency">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/distributor-1.svg')} />
            </span>
            <span className="menu-text">
              {intl.formatMessage({ id: 'MENU.MANAGEMENT.DISTRIBUTORS' })}
            </span>
            <i className="menu-arrow" />
          </NavLink>
          <div className="menu-submenu ">
            {/* <ArrowForwardIosIcon className="menu-arrow" /> */}
            <ul className="menu-subnav">
              <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">
                    {intl.formatMessage({ id: 'MENU.MANAGEMENT.DISTRIBUTORS' })}
                  </span>
                </span>
              </li>
              <li
                className={`menu-item  ${getMenuItemActive('/agency/agency-management')}`}
                aria-haspopup="true">
                <NavLink
                  className="menu-link"
                  to="/agency/agency-management"
                  style={{ paddingLeft: '50px' }}>
                  <span className="svg-icon menu-icon">
                    <SVG src={ToAbsoluteUrl('/media/svg/vncheck/distributor-2.svg')} />
                  </span>
                  <span className="menu-text">
                    {intl.formatMessage({ id: 'MENU.MANAGEMENT.DISTRIBUTORS' })}
                  </span>
                </NavLink>
              </li>
              <li
                className={`menu-item  ${getMenuItemActive('/agency/classify')}`}
                aria-haspopup="true">
                <NavLink
                  className="menu-link"
                  to="/agency/classify"
                  style={{ paddingLeft: '50px' }}>
                  <span className="svg-icon menu-icon">
                    <SVG src={ToAbsoluteUrl('/media/svg/vncheck/distributor-type.svg')} />
                  </span>
                  <span className="menu-text">
                    {intl.formatMessage({ id: 'MENU.MANAGEMENT.DISTRIBUTORS.TYPE' })}
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li>

        <li
          className={`menu-item ${getMenuItemActive('/transport-company', false)}`}
          aria-haspopup="true">
          <NavLink className="menu-link" to="/transport-company">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/transport-company.svg')} />
            </span>
            <span className="menu-text">
              {intl.formatMessage({ id: 'MENU.MANAGEMENT.TRANSPORT-COMPANY' })}
            </span>
          </NavLink>
        </li>

        <li className="menu-section ">
          <h4 className="menu-text">{intl.formatMessage({ id: 'MENU.INVENTORIES' })}</h4>
        </li>

        <li className="menu-section ">
          <h4 className="menu-text">{intl.formatMessage({ id: 'MENU.ORDERS' })}</h4>
        </li>

        <li className={`menu-item ${getMenuItemActive('/orders')}`} aria-haspopup="true">
          <NavLink className="menu-link" to="/orders">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/order.svg')} />
            </span>
            <span className="menu-text">{intl.formatMessage({ id: 'MENU.ORDERS' })}</span>
          </NavLink>
        </li>

        {/* eCommerce */}
        {/* <li
          className={`menu-item menu-item-submenu ${getMenuItemActive('/e-commerce', true)}`}
          aria-haspopup="true"
          data-menu-toggle="hover">
          <NavLink className="menu-link menu-toggle" to="/e-commerce">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/icons/Shopping/Bag2.svg')} />
            </span>
            <span className="menu-text">
              {intl.formatMessage({ id: 'MENU.MANAGEMENT.E-COMMERCE' })}
            </span>
          </NavLink>
          <div className="menu-submenu">
            <i className="menu-arrow" />
            <ul className="menu-subnav">
              <li className="menu-item menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">
                    {intl.formatMessage({ id: 'MENU.MANAGEMENT.E-COMMERCE' })}
                  </span>
                </span>
              </li>
              <li
                className={`menu-item ${getMenuItemActive('/e-commerce/customers')}`}
                aria-haspopup="true">
                <NavLink className="menu-link" to="/e-commerce/customers">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">
                    {intl.formatMessage({ id: 'MENU.MANAGEMENT.CUSTOMERS' })}
                  </span>
                </NavLink>
              </li>
              <li
                className={`menu-item ${getMenuItemActive('/e-commerce/products')}`}
                aria-haspopup="true">
                <NavLink className="menu-link" to="/e-commerce/products">
                  <i className="menu-bullet menu-bullet-dot">
                    <span />
                  </i>
                  <span className="menu-text">
                    {intl.formatMessage({ id: 'MENU.MANAGEMENT.PRODUCTS' })}
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </li> */}
      </ul>
      {/*begin::1 Level*/}
      {/* <ul className={`menu-nav ${layoutProps.ulClasses}`}>
        <li className={`menu-item ${getMenuItemActive('/test')}`} aria-haspopup="true">
          <NavLink className="menu-link" to="/my-page">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/icons/Design/Layers.svg')} />
            </span>{' '}
            <span className={customizedClasses.menuText}>Test</span>
          </NavLink>
        </li>
      </ul> */}
      {/*end::1 Level*/}
      {/* end::Menu Nav */}
    </>
  );
}
