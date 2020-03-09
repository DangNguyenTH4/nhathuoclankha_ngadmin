export * from './importOrderController.service';
import { ImportMedicineControllerService } from './importOrderController.service';
export * from './medicineController.service';
import { MedicineControllerService } from './medicineController.service';
import { CustomerControllerService} from './customerController.service';
export * from './customerController.service'
export * from './sellMedicineController.service';
import { SellMedicineControllerService } from './sellMedicineController.service';
import { AuthenticateControllerService } from './authenticateController.service';
export * from './authenticateController.service';
export const APIS = [ CustomerControllerService,AuthenticateControllerService, MedicineControllerService, ImportMedicineControllerService, SellMedicineControllerService];
