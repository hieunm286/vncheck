/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React from 'react';
import {useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';
import SVG from 'react-inlinesvg';
import {useIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core/styles';
import '../aside.css';
import {ToAbsoluteUrl} from "../../../../components/helpers/assets-helpers";
import {CheckIsActive} from "../../../../components/helpers/router-helpers";

const useStyles = makeStyles(theme => ({
    subMenu: {
        paddingLeft: '50px',
    }
}));


export function AsideMenuList({layoutProps}) {
    const intl = useIntl();
    const location = useLocation();
    const getMenuItemActive = (url, hasSubmenu = false) => {
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
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/dashboard.svg')}/>
            </span>
                        <span className="menu-text">{intl.formatMessage({id: 'MENU.DASHBOARD'})}</span>
                    </NavLink>
                </li>
                {/*end::1 Level*/}

                {/* Components */}
                {/* begin::section */}
                <li className="menu-section ">
                    <h4 className="menu-text">{intl.formatMessage({id: 'MENU.MANAGEMENT.USERS'})}</h4>
                    <i className="menu-icon flaticon-more-v2"/>
                </li>
                {/* end:: section */}

                {/*User management*/}

                <li
                    className={`menu-item ${getMenuItemActive('/account/user', false)}`}
                    aria-haspopup="true">
                    <NavLink className="menu-link" to="/account/user">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/account.svg')} style={{width: 22}}/>
            </span>
                        <span className="menu-text">
              {intl.formatMessage({id: 'MENU.MANAGEMENT.ACCOUNTS'})}
            </span>
                    </NavLink>
                </li>

                {/*Roles*/}
                <li className={`menu-item ${getMenuItemActive('/websocket', false)}`} aria-haspopup="true">
                    <NavLink className="menu-link" to="/websocket">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/role.svg')}/>
            </span>
                        <span className="menu-text">{intl.formatMessage({id: 'MENU.MANAGEMENT.ROLES'})}</span>
                    </NavLink>
                </li>

                <li className={`menu-item ${getMenuItemActive('/websocket', false)}`} aria-haspopup="true">
                    <NavLink className="menu-link" to="/websocket">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/organize-tree.svg')}/>
            </span>
                        <span className="menu-text">
              {intl.formatMessage({id: 'MENU.MANAGEMENT.ORGANIZE-TREE'})}
            </span>
                    </NavLink>
                </li>

                <li className="menu-section ">
                    <h4 className="menu-text">
                        {intl.formatMessage({id: 'MENU.MANAGEMENT.DATA.CATEGORIES'})}
                    </h4>
                    <i className="menu-icon flaticon-more-v2"/>
                </li>

                {/*Danh mục dữ liệu */}

                <li className={`menu-item ${getMenuItemActive('/categories', false)}`} aria-haspopup="true">
                    <NavLink className="menu-link" to="/categories">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/product.svg')}/>
            </span>
                        <span className="menu-text">
              {intl.formatMessage({id: 'MENU.MANAGEMENT.CATEGORIES'})}
            </span>
                    </NavLink>
                </li>

                <li
                    className={`menu-item menu-item-submenu ${getMenuItemActive('/agency', true)}`}
                    aria-haspopup="true"
                    data-menu-toggle="hover">
                    <NavLink className="menu-link menu-toggle" to="/agency">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/distributor-1.svg')}/>
            </span>
                        <span className="menu-text">
              {intl.formatMessage({id: 'MENU.MANAGEMENT.DISTRIBUTORS'})}
            </span>
                        <i className="menu-arrow"/>
                    </NavLink>
                    <div className="menu-submenu ">
                        <i className="menu-arrow"/>
                        <ul className="menu-subnav">
                            <li className="menu-item  menu-item-parent" aria-haspopup="true">
                <span className="menu-link">
                  <span className="menu-text">
                    {intl.formatMessage({id: 'MENU.MANAGEMENT.DISTRIBUTORS'})}
                  </span>
                </span>
                            </li>
                            <li
                                className={`menu-item  ${getMenuItemActive('/agency/agency-management')}`}
                                aria-haspopup="true">
                                <NavLink className="menu-link" to="/agency/agency-management"
                                         style={{paddingLeft: '50px'}}>
                  <span className="svg-icon menu-icon">
                    <SVG src={ToAbsoluteUrl('/media/svg/vncheck/distributor-2.svg')}/>
                  </span>
                                    <span className="menu-text">
                    {intl.formatMessage({id: 'MENU.MANAGEMENT.DISTRIBUTORS'})}
                  </span>
                                </NavLink>
                            </li>
                            <li
                                className={`menu-item  ${getMenuItemActive('/agency/classify')}`}
                                aria-haspopup="true">
                                <NavLink className="menu-link" to="/agency/classify" style={{paddingLeft: '50px'}}>
                  <span className="svg-icon menu-icon">
                    <SVG src={ToAbsoluteUrl('/media/svg/vncheck/distributor-type.svg')}/>
                  </span>
                                    <span className="menu-text">
                    {intl.formatMessage({id: 'MENU.MANAGEMENT.DISTRIBUTORS.TYPE'})}
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
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/transport-company.svg')}/>
            </span>
                        <span className="menu-text">
              {intl.formatMessage({id: 'MENU.MANAGEMENT.TRANSPORT-COMPANY'})}
            </span>
                    </NavLink>
                </li>

                <li className="menu-section ">
                    <h4 className="menu-text">{intl.formatMessage({id: 'MENU.INVENTORIES'})}</h4>
                </li>

                <li className="menu-section ">
                    <h4 className="menu-text">{intl.formatMessage({id: 'MENU.ORDERS'})}</h4>
                </li>

                <li className={`menu-item ${getMenuItemActive('/orders')}`} aria-haspopup="true">
                    <NavLink className="menu-link" to="/orders">
            <span className="svg-icon menu-icon">
              <SVG src={ToAbsoluteUrl('/media/svg/vncheck/order.svg')}/>
            </span>
                        <span className="menu-text">{intl.formatMessage({id: 'MENU.ORDERS'})}</span>
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
