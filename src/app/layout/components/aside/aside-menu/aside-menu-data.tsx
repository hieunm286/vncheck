import { MenuItemModel } from './menu-item-model';
import { ToAbsoluteUrl } from '../../../../common-library/helpers/assets-helpers';
import SVG from 'react-inlinesvg';
import React from 'react';
import ImageOutlinedIcon from '@material-ui/icons/ImageOutlined';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import SyncOutlinedIcon from '@material-ui/icons/SyncOutlined';

export const MenuItems: MenuItemModel[] = [
  { parent: true, title: 'MENU.DASHBOARD', url: '/dashboard' },
  {
    // section: true,
    parent: true,
    title: 'MENU.USER',
    url: '/acount/user',
    icon: 'distributor-1.svg',
    children: [
      {
        title: 'MENU.USER.ACCOUNT',
        url: '/account/user',
        icon: (
          <SVG src={ToAbsoluteUrl('/media/svg/vncheck/account.svg')} style={{ width: '17px' }} />
        ),
      },
      { title: 'MENU.USER.ROLE', url: '/account/role', icon: 'role.svg' },
      { title: 'MENU.USER.ORGANIZATION', url: '/account/organization', icon: 'role.svg' },
    ],
  },
  // {
  //   section: true,
  //   title: 'MENU.USER',
  //   children: [
  //     {
  //       title: 'MENU.USER.ACCOUNT',
  //       url: '/account/user',
  //       icon: <SVG src={ToAbsoluteUrl('/media/svg/vncheck/account.svg')} style={{width: '17px'}}/>,
  //     },
  //     {title: 'MENU.USER.ROLE', url: '/account/role', icon: 'role.svg',},
  //     {title: 'MENU.USER.ORGANIZATION', url: '/account/organization', icon: 'role.svg'}
  //   ]
  // },
  {
    // section: true,
    parent: true,
    title: 'MENU.DATA',
    url: '/acount/user',
    icon: 'distributor-1.svg',
    children: [
      {
        title: 'MENU.DATA.CATEGORY.BATCH',
        url: '/land-lot',
        icon: <ImageOutlinedIcon style={{ width: '17px' }} htmlColor="#888C9F" />,
      },
      {
        title: 'MENU.DATA.CATEGORY',
        url: '/category',
        icon: 'product.svg',
        children: [
          {
            title: 'MENU.DATA.CATEGORY.PRODUCT',
            url: '/category/PRODUCT',
            icon: <FormatListBulletedIcon style={{ width: '17px' }} htmlColor="#888C9F" />,
          },
          { title: 'MENU.DATA.CATEGORY.CATEGORY', url: '/category/CATEGORY', icon: 'category.svg' },
          {
            title: 'MENU.DATA.CATEGORY.BASE_UNIT',
            url: '/category/basic-unit',
            icon: 'base-unit.svg',
          },
          {
            title: 'MENU.DATA.CATEGORY.CONVERT_UNIT',
            url: '/category/CONVERT_UNIT',
            icon: <SyncOutlinedIcon htmlColor="#888C9F" />,
          },
        ],
      },
      {
        title: 'MENU.DATA.AGENCY',
        url: '/agency',
        icon: 'distributor-1.svg',
        children: [
          {
            title: 'MENU.DATA.AGENCY.AGENCY',
            url: '/agency',
            icon: 'distributor-2.svg',
          },
          {
            title: 'MENU.DATA.AGENCY.AGENCY_TYPE',
            url: '/agency-type',
            icon: 'distributor-type.svg',
          },
        ],
      },
      {
        title: 'MENU.DATA.PRODUCT',
        url: '/product',
        icon: 'distributor-1.svg',
        children: [
          {
            title: 'MENU.DATA.PRODUCT.PRODUCT_TYPE',
            url: '/product-type',
            icon: 'distributor-2.svg',
          },
          {
            title: 'MENU.DATA.PRODUCT.PACK',
            url: '/product-packaging',
            icon: 'distributor-type.svg',
          },
        ],
      },
      {
        title: 'MENU.DATA.DISTRIBUTION',
        url: '/distribution',
        icon: 'distributor-1.svg',
        children: [
          {
            title: 'MENU.DATA.DISTRIBUTION.MULTILEVEL_SALE',
            url: '/multilevel-sale',
            icon: 'distributor-2.svg',
          },
          {
            title: 'MENU.DATA.DISTRIBUTION.SHIPPING_AGENCY',
            url: '/shipping-agency',
            icon: 'distributor-2.svg',
          },
        ],
      },
    ],
  },
  {
    // section: true,
    parent: true,
    title: 'MENU.QRCODE',
    url: '/acount/user',
    icon: 'distributor-1.svg',
    children: [
      {
        url: '/purchase-order',
        title: 'MENU.PURCHASE_ORDER.PURCHASE_ORDER',
        icon: 'distributor-type.svg',
      },
    ],
  },
  { parent: true, title: 'MENU.PRODUCT_PLANT', url: '/production-plan' },


  { parent: true, title: 'MENU.REPORT' },
  { parent: true, title: 'MENU.PRODUCT_MANAGEMENT' },
  { parent: true, title: 'MENU.INVENTORY' },
];
