import { NbMenuItem } from '@nebular/theme';
import { CommonData } from '../common/common';

export const MENU_ITEMS_ALL: NbMenuItem[] = [
  {
    title: 'Bán thuốc',
    icon: 'shopping-cart-outline',
    link: '/'+CommonData.StorePagePrefix+'/sell-medicine',
    home: true,
  },
  {
    title: 'Nhập thuốc',
    icon: 'shopping-cart-outline',
    link: '/'+CommonData.StorePagePrefix+'/import-medicine',
    home: true,
  },
  {
    title: 'Báo cáo',
    icon: 'shopping-cart-outline',
      children: [
     
      {
        title: 'Báo cáo 1',
        link:  '/'+CommonData.StorePagePrefix+'/report/report1',
      },
      {
        title: 'Lịch sử nhập hàng',
        link:  '/'+CommonData.StorePagePrefix+'/report/history-import',
      },
      {
        title: 'Lịch sử bán hàng',
        link:  '/'+CommonData.StorePagePrefix+'/report/history-sell-order',
      },

    ]
  },
];
export const MENU_ITEMS_STAFF: NbMenuItem[] = [
  {
    title: 'Bán thuốc',
    icon: 'shopping-cart-outline',
    link: '/'+CommonData.StorePagePrefix+'/sell-medicine',
    home: true,
  },
  {
    title: 'Nhập thuốc',
    icon: 'shopping-cart-outline',
    link: '/'+CommonData.StorePagePrefix+'/import-medicine',
    home: true,
  },
  {
    title: 'Báo cáo',
    icon: 'shopping-cart-outline',
      children: [
     
      {
        title: 'Lịch sử bán hàng',
        link:  '/'+CommonData.StorePagePrefix+'/report/myhistory-sell',
      },

    ]
  },
];
