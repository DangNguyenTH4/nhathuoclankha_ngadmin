import { NbMenuItem } from '@nebular/theme';
import { CommonData } from '../common/common';
import { Title } from '@angular/platform-browser';
class TitleMenu{
  static readonly SELLMEDICINE = 'Tạo hóa đơn bán hàng';
  static readonly IMPORTMEDICINE = 'Tạo hóa đơn nhập hàng';
  static readonly REPORT = 'Báo cáo / Thống kê';
  static readonly REPORTDAILY = 'Thống kê theo ngày';
  static readonly HISTORYSELL = 'Lịch sử bán hàng';
  static readonly HISTORYIMPORT = 'Lịch sử nhập hàng';
  static readonly LISTMEDICINE = 'Danh sách các thuốc';
}

export const MENU_ITEMS_ALL: NbMenuItem[] = [
  {
    title: TitleMenu.SELLMEDICINE,
    icon: 'shopping-cart-outline',
    link: '/'+CommonData.StorePagePrefix+'/sell-medicine',
    home: true,
  },
  {
    title: TitleMenu.IMPORTMEDICINE,
    icon: 'shopping-cart-outline',
    link: '/'+CommonData.StorePagePrefix+'/import-medicine',
    home: true,
  },
  {
    title: TitleMenu.REPORT,
    icon: 'shopping-cart-outline',
      children: [
     
      {
        title: TitleMenu.REPORTDAILY,
        link:  '/'+CommonData.StorePagePrefix+'/report/report1',
      },
      {
        title: TitleMenu.HISTORYSELL,
        link:  '/'+CommonData.StorePagePrefix+'/report/history-import',
      },
      {
        title: TitleMenu.HISTORYIMPORT,
        link:  '/'+CommonData.StorePagePrefix+'/report/history-sell-order',
      },
      {
        title: TitleMenu.LISTMEDICINE,
        link:  '/'+CommonData.StorePagePrefix+'/admin/list-medicine',
      },

    ]
  },
];
export const MENU_ITEMS_STAFF: NbMenuItem[] = [
  {
    title: TitleMenu.SELLMEDICINE,
    icon: 'shopping-cart-outline',
    link: '/'+CommonData.StorePagePrefix+'/sell-medicine',
    home: true,
  },
  {
    title: TitleMenu.IMPORTMEDICINE,
    icon: 'shopping-cart-outline',
    link: '/'+CommonData.StorePagePrefix+'/import-medicine',
    home: true,
  },
  {
    title: TitleMenu.REPORT,
    icon: 'shopping-cart-outline',
      children: [
     
      {
        title: TitleMenu.HISTORYSELL,
        link:  '/'+CommonData.StorePagePrefix+'/report/myhistory-sell',
      },

    ]
  },
];
