/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, {ReactElement} from 'react';
import {useLocation} from 'react-router';
import {NavLink} from 'react-router-dom';
import {useIntl} from 'react-intl';
import {makeStyles} from '@material-ui/core/styles';
import '../aside.css';
import {CheckIsActive} from "../../../../components/helpers/router-helpers";
import {MenuItemModel} from "./menu-item-model";
import {MenuItems} from "./aside-menu-data";
import {ToAbsoluteUrl} from "../../../../components/helpers/assets-helpers";
import SVG from "react-inlinesvg";

const useStyles = makeStyles(theme => ({
  subMenu: {
    paddingLeft: '50px',
  }
}));


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
      return (<>
        <li className="menu-section " key={'menuitem_' + index}>
          <h4 className="menu-text">{intl.formatMessage({id: item.title})}</h4>
          <i className="menu-icon flaticon-more-v2"/>
        </li>
        {item.children?.map(MenuItem)}
      </>)
    } else if (hasSubmenu) {
      return (<li className={`menu-item menu-item-submenu ${getMenuItemActive(url, hasSubmenu)}`}
                  aria-haspopup="true" data-menu-toggle="hover">
        <NavLink className="menu-link menu-toggle" to={url}>
            <span className="svg-icon menu-icon">
              {typeof item.icon == 'string' ?
                (<SVG style={{width:'17px'}} src={ToAbsoluteUrl('/media/svg/vncheck/' + item.icon)}/>) : item.icon}
            </span>
          <span className="menu-text">
              {intl.formatMessage({id: item.title})}
            </span>
          <i className="menu-arrow"/>
        </NavLink>
        <div className="menu-submenu ">
          <i className="menu-arrow"/>
          <ul className="menu-subnav">
            {item.children?.map(MenuItem)}
          </ul>
        </div>
      </li>)
    } else return (
      <li key={'menuitem_' + index} className={`menu-item ${getMenuItemActive(url, hasSubmenu)}`} aria-haspopup="true">
        <NavLink className="menu-link" to={url}>
            <span className="svg-icon menu-icon">
           {typeof item.icon == 'string' ?
             (<SVG style={{width:'17px'}}  src={ToAbsoluteUrl('/media/svg/vncheck/' + item.icon)}/>) : item.icon}
            </span>
          <span className="menu-text">{intl.formatMessage({id: item.title})}</span>
        </NavLink>
      </li>)
  }
  return (
    <ul className={`menu-nav ${layoutProps.ulClasses}`}>
      {MenuItems.map((me, index) => {
        console.log(me);
        return MenuItem(me, index);
      })}
    </ul>
  );
}
