/**
 * Api Documentation
 * Api Documentation
 *
 * OpenAPI spec version: 1.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */


export interface MedicineDto {
    code: string;
    name: string;
    unit: string;
    //bought price for import order
    boughtPrice:number;
    expiryDate:string;

    realSellPrice:number;

    priceForCompany: number;
    priceForFarm: number;
    priceForPersonal: number;
    total: number;
    amount: number;
}
