import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';

import { AdminControllerService } from './api/adminController.service';
import { HomeControllerService } from './api/homeController.service';
import { ImportMedicineControllerService } from './api/importOrderController.service';
import { SellMedicineControllerService } from './api/sellMedicineController.service';
import { MedicineControllerService } from './api/medicineController.service';
import { CustomerControllerService } from './api/customerController.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    ImportMedicineControllerService,
    SellMedicineControllerService,
    MedicineControllerService,
    HomeControllerService,
    AdminControllerService,
    CustomerControllerService
 ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
