import {MenuItemModel} from './menu-item-model';
import {ToAbsoluteUrl} from '../../../../common-library/helpers/assets-helpers';
import SVG from 'react-inlinesvg';
import React from 'react';

export const MenuItems: MenuItemModel[] = [
  {parent: true, title: 'MENU.DASHBOARD', url: '/dashboard'},
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
          <SVG src={ToAbsoluteUrl('/media/svg/vncheck/account.svg')} style={{width: '17px'}}/>
        ),
      },
      {
        title: 'MENU.USER.ROLE',
        url: '/account/role',
        icon: 'role.svg'
      },
      {
        title: 'MENU.USER.ORGANIZATION',
        url: '/account/organization',
        icon: 'organization.svg'
      },
    ],
  },
  {parent: true, title: 'MENU.CUSTOMERS_MANAGEMENT', url: '/customers-management'},
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
        // icon: <ImageOutlinedIcon style={{ width: '17px' }} htmlColor="#888C9F" />,
        icon: 'land-lot.svg',
      },
      {
        title: 'MENU.DATA.PRODUCT',
        url: '/product',
        icon: 'species-categories.svg',
        children: [
          {
            title: 'MENU.DATA.PRODUCT.PRODUCT_TYPE',
            url: '/species',
            icon: 'species.svg',
          },
          {
            title: 'MENU.DATA.PRODUCT.PACK',
            url: '/product-packaging',
            icon: 'product-packaging.svg',
          },
        ],
      },
      {
        title: 'MENU.DATA.DISTRIBUTION',
        url: '/distribution',
        icon: 'distribution.svg',
        children: [
          {
            title: 'MENU.DATA.DISTRIBUTION.MULTILEVEL_SALE',
            url: '/multilevel-sale',
            icon: 'multilevel-sale.svg',
          },
          {
            title: 'MENU.DATA.DISTRIBUTION.AGENCY',
            url: '/agency',
            icon: 'agency.svg',
          },
          {
            title: 'MENU.DATA.DISTRIBUTION.SHIPPING_AGENCY',
            url: '/shipping-agency',
            icon: 'shipping-agency.svg',
          },
        ],
      },
    ],
  },
  {parent: true, title: 'MENU.PRODUCT_PLANT', url: '/production-plan'},
  {parent: true, title: 'MENU.PRODUCT_MANAGEMENT', url: '/production-management'},
  {parent: true, title: 'MENU.QRCODE', url: '/qr',},
];
