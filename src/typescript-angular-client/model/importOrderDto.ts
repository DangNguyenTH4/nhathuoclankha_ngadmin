import { MedicineDto } from './medicineDto';

export interface ImportOrderDto{
    id?:number;
    importDate?: Date;
    listMedicineImport?: Array<MedicineDto>;
    staffName?:string;
}