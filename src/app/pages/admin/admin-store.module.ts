import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminStoreRoutingModule } from './admin-store-routing.module';
import { AdminStoreComponent } from './admin-store.component';
import { ListMeicineComponent } from './list-meicine/list-meicine.component';
import { SharedModule } from '../sharedmodule/sharemodule.module';
import { NbCardModule, NbDatepickerModule, NbInputModule, NbButtonModule } from '@nebular/theme';
import { FormsModule } from '@angular/forms';
import { MyCoreModule } from '../../service/core2';
import { ThemeModule } from '../../@theme/theme.module';
import { GridModule, PDFModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [AdminStoreComponent, ListMeicineComponent],
  imports: [
    CommonModule,
    AdminStoreRoutingModule,
    SharedModule,
    ThemeModule,

    NbCardModule,
    NbDatepickerModule,
    NbInputModule,
    NbButtonModule,
    FormsModule,
    MyCoreModule,
    GridModule,
    PDFModule,
  ]
})
export class AdminStoreModule { }
