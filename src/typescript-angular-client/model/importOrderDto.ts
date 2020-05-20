import { MedicineDto } from './medicineDto';

export interface ImportOrderDto{
    id?:number;
    //La ma hóa đơn trên chứng từ, giấy tờ nhập hàng, dùng để sau này đối chiếu.
    maHoaDonReal:string;
    importDate?: Date;
    listMedicineImport?: Array<MedicineDto>;
    staffName?:string;
}