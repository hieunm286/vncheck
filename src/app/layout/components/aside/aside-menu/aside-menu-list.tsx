/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {Fragment, ReactElement} from 'react';
import {useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';
import {useIntl} from 'react-intl';
import '../aside.scss';
import {CheckIsActive} from '../../../../common-library/helpers/router-helpers';
import {MenuItemModel} from './menu-item-model';
import {MenuItems} from './aside-menu-data';
import {ToAbsoluteUrl} from '../../../../common-library/helpers/assets-helpers';
import SVG from 'react-inlinesvg';

export function AsideMenuList({layoutProps}: any) {
  const intl = useIntl();
  const location = useLocation();
  const getMenuItemActive = (url?: string, hasSubmenu = false) => {
    return CheckIsActive(location, url)
      ? ` ${!hasSubmenu && 'menu-item-active'} menu-item-open `
      : '';
  };
  const MenuItem = (item: MenuItemModel, index: number): ReactElement | null => {
    if (item.display != null && !item.display) return null;
    const hasSubmenu = item.children ? item.children.length > 0 : false;
    const url = item.url ?? '';
    if (item.section) {
      return (
        <Fragment key={'menuitem_' + index}>
          <li className="menu-section " key={'menuitem_' + index} style={{color: '#0B9446'}}>
            <h4 className="menu-text title" style={{color: '#0B9446'}}>
              {intl.formatMessage({id: item.title})}
            </h4>
            <i className="menu-icon flaticon-more-v2"/>
          </li>
          {item.children?.map(MenuItem)}
        </Fragment>
      );
    } else if (hasSubmenu) {
      return (
        <li
          key={'menuitem_' + index}
          className={`menu-item menu-item-submenu ${getMenuItemActive(url, hasSubmenu)}`}
          aria-haspopup="true"
          data-menu-toggle="hover">
          <NavLink className="menu-link menu-toggle" to={url}>
            {item.icon && !item.parent ? (
              <span className="svg-icon menu-icon">
                {typeof item.icon == 'string' ? (
                  <SVG
                    style={{width: '15px'}}
                    src={ToAbsoluteUrl('/media/svg/vncheck/' + item.icon)}
                  />
                ) : (
                  item.icon
                )}
              </span>
            ) : (
              <></>
            )}
            <span className={item.parent ? 'menu-text title' : 'menu-text'}>
              {intl.formatMessage({id: item.title})}
            </span>
            <i className="menu-arrow"/>
          </NavLink>
          <div className="menu-submenu ">
            <i className="menu-arrow"/>
            <ul className="menu-subnav">
              {item.parent && (
                <li className="menu-item  menu-item-parent" aria-haspopup="true">
                  <span className="menu-link">
                    <span className="menu-text title">
                      {intl.formatMessage({id: item.title})}
                    </span>
                  </span>
                </li>
              )}
              {item.children?.map(MenuItem)}
            </ul>
          </div>
        </li>
      );
    } else
      return (
        <li
          key={'menuitem_' + index}
          className={`menu-item ${getMenuItemActive(url, hasSubmenu)}`}
          aria-haspopup="true">
          <NavLink className="menu-link" to={url}>
            {item.icon ? (
              <span className="svg-icon menu-icon">
                {typeof item.icon == 'string' ? (
                  <SVG
                    style={{width: '15px'}}
                    src={ToAbsoluteUrl('/media/svg/vncheck/' + item.icon)}
                  />
                ) : (
                  item.icon
                )}
              </span>
            ) : (
              <></>
            )}
            <span
              className={item.parent ? 'menu-text title' : 'menu-text'}>{intl.formatMessage({id: item.title})}</span>
          </NavLink>
        </li>
      );
  };
  return (
    <ul className={`menu-nav ${layoutProps.ulClasses}`}>
      {MenuItems.map((me, index) => {
        return MenuItem(me, index);
      })}
    </ul>
  );
}
