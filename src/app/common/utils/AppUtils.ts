export class AppUtils {
    public static appendVND(value): string {
        return value === 'Total'
            ? value :
            Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'Vnd' }).format(value * 1000)
    }
    public static isEmpty(something: any): boolean {
        return something === null || something === '';
    }
    public static isEmptyOrZero(something: any): boolean {
        return something === null || something === '' || something === '0';
    }
}