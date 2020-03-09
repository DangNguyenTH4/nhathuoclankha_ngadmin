import { NgModule } from '@angular/core';
import { NbCardModule, NbIconModule, NbInputModule, NbTreeGridModule, NbButtonModule, NbUserModule, NbCheckboxModule, NbActionsModule, NbRadioModule, NbDatepickerModule, NbSelectModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { FormsModule } from '@angular/forms';
import { ImportMedicineComponent } from './import-medicine.component';
import { ImportMedicineRoutingModule } from './import-medicine-routing.module';
import { ImportMedicineControllerService } from '../../../typescript-angular-client';
import { SharedModule } from '../sharedmodule/sharemodule.module';
// import { TablesRoutingModule, routedComponents } from './tables-routing.module';

@NgModule({
  imports: [ 

    NbCardModule,
    NbTreeGridModule,
    NbIconModule,
    NbUserModule,
    NbCheckboxModule,
   
    ThemeModule,
    Ng2SmartTableModule,
    ImportMedicineRoutingModule,
    FormsModule,
    NbButtonModule,
    // ngFormsModule
    SharedModule,
    NbActionsModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,

  ],
  declarations: [
      ImportMedicineComponent,
    //   DialogNamePromptComponent
  ],
  entryComponents:[
    
  ]
  ,providers:[ImportMedicineControllerService]
  
})
export class ImportMedicineModule { }