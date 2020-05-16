export class AppUtils{
    public static appendVND(value ):string{
        return value === 'Total' 
        ? value : 
        Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'Vnd' }).format(value * 1000)
    }
}