import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminStoreComponent } from './admin-store.component';
import { ListMeicineComponent } from './list-meicine/list-meicine.component';


const routes: Routes = [{
    path: '',
    component: AdminStoreComponent,
    children: [
        {
            path: '', redirectTo: '', pathMatch: 'full'
        },
        {
            path: 'list-medicine', 
            component: ListMeicineComponent
        },

        // {
        //   path: 'myhistory-sell',
        //   component: MySellHistoryComponent,
        // }
    ],
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminStoreRoutingModule { }

export const routedComponents = [
    AdminStoreComponent

];
