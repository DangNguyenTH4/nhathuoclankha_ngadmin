import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellMedicineComponent } from './sell-medicine.component';
import { DialogNamePromptComponent } from './dialog/dialog-name-prompt/dialog-name-prompt.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { SellComponent } from './sell/sell.component';


const routes: Routes = [{
  path: '',
  component: SellComponent,
  children: [

    {
      path: 'invoice',
      component: InvoiceComponent,
    },
   
  ],
},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SellMedicineRoutingModule { }

export const routedComponents = [
];
