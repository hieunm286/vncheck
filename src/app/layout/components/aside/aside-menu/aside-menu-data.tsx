import {MenuItemModel} from "./menu-item-model";
import {ToAbsoluteUrl} from "../../../../components/helpers/assets-helpers";
import SVG from "react-inlinesvg";
import React from "react";
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import SyncOutlinedIcon from '@material-ui/icons/SyncOutlined';

export const MenuItems: MenuItemModel[] = [
  {title: 'MENU.DASHBOARD', url: '/dashboard', icon: 'dashboard.svg',},
  {
    section: true,
    title: 'MENU.USER',
    children: [
      {
        title: 'MENU.USER.ACCOUNT',
        url: '/account/user',
        icon: <SVG src={ToAbsoluteUrl('/media/svg/vncheck/account.svg')} style={{width: '17px'}}/>,
      },
      {title: 'MENU.USER.ROLE', url: '/account/role', icon: 'role.svg',}
    ]
  },
  {
    section: true,
    title: 'MENU.DATA',
    children: [
      {
        title: 'MENU.DATA.CATEGORY',
        url: '/category',
        icon: 'product.svg',
        children: [
          {
            title: 'MENU.DATA.CATEGORY.BATCH',
            url: '/category/BATCH',
            icon: (<ImageOutlinedIcon style={{width: '17px'}} htmlColor='#888C9F'/>)
          },
          {
            title: 'MENU.DATA.CATEGORY.PRODUCT',
            url: '/category/PRODUCT',
            icon: (<FormatListBulletedIcon style={{width: '17px'}} htmlColor='#888C9F'/>)
          },
          {title: 'MENU.DATA.CATEGORY.CATEGORY', url: '/category/CATEGORY', icon: 'category.svg'},
          {title: 'MENU.DATA.CATEGORY.BASE_UNIT', url: '/category/basic-unit', icon: 'base-unit.svg'},
          {
            title: 'MENU.DATA.CATEGORY.CONVERT_UNIT',
            url: '/category/CONVERT_UNIT',
            icon: (<SyncOutlinedIcon htmlColor='#888C9F'/>)
          },
        ]
      },
      {
        title: 'MENU.DATA.AGENCY',
        url: '/agency-management',
        icon: 'distributor-1.svg',
        children: [
          {
            title: 'MENU.DATA.AGENCY.AGENCY',
            url: '/agency-management',
            icon: 'distributor-2.svg',
          },
          {title: 'MENU.DATA.AGENCY.AGENCY_TYPE', url: '/agency-type', icon: 'distributor-type.svg',},
        ],
      },
    ]
  },
  {section: true, title: 'MENU.QRCODE',},
  {url: '/purchase-order', title: 'MENU.PURCHASE_ORDER.PURCHASE_ORDER', icon: 'distributor-type.svg'},
  {section: true, title: 'MENU.REPORT',},
  {section: true, title: 'MENU.PRODUCT_MANAGEMENT',},
  {section: true, title: 'MENU.INVENTORY',},
]