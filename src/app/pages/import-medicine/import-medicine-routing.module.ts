import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ImportMedicineComponent } from './import-medicine.component';


const routes: Routes = [{
  path: '',
  component: ImportMedicineComponent,
  children: [
    {
      path: 'smart-table',
      component: ImportMedicineComponent,
    },
    {
        path:'**',
        redirectTo:'',
        pathMatch:'full'
    }
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportMedicineRoutingModule { }

export const routedComponents = [
];
