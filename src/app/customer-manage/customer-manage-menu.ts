import { NbMenuItem } from '@nebular/theme';
import { CommonData } from '../common/common';
import { Title } from '@angular/platform-browser';
class TitleMenu{
  static readonly REPORT = 'Quản lí khách hàng';
  static readonly REPORTDAILY = 'Thẻ hàng';
  static readonly HISTORYSELL = 'Lịch sử bán hàng';
  static readonly HISTORYIMPORT = 'Lịch sử nhập hàng';
  static readonly LISTMEDICINE = 'Danh sách các thuốc';
  static  readonly DETAILSELL = 'Chi tiết bán các mặt hàng';
}
class Icon{
  static readonly REPORT = 'map-outline';
  static readonly SELLMEDICINE = 'shopping-cart-outline';
}

export const MENU_ITEMS_ALL: NbMenuItem[] = [
  {
    title: TitleMenu.REPORT,
    icon: Icon.REPORT,
      children: [
     
      {
        title: TitleMenu.REPORTDAILY,
      },
      {
        title: TitleMenu.HISTORYIMPORT,
      },
      {
        title: TitleMenu.HISTORYSELL,
      },
      {
        title: TitleMenu.DETAILSELL,
      },
      {
        title: TitleMenu.LISTMEDICINE,
      },


    ]
  },
];

export const MENU_ITEMS_STAFF: NbMenuItem[] = [
 
  {
    title: TitleMenu.REPORT,
    icon: Icon.REPORT,
      children: [
     
      {
        title: TitleMenu.HISTORYSELL,
      },

    ]
  },
];

export const MENU_ITEMS_ACCOUNTANT: NbMenuItem[] = [
  
  {
    title: TitleMenu.REPORT,
    icon: Icon.REPORT,
      children: [
      {
        title: TitleMenu.REPORTDAILY,
      },
      {
        title: TitleMenu.HISTORYIMPORT,
      },
      {
        title: TitleMenu.HISTORYSELL,
      },
      {
        title: TitleMenu.DETAILSELL,
      },
    ]
  },
  
];
