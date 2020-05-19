export class AppUtils {
    public static appendVND(value): string {
        return value === 'Total'
            ? value :
            Intl.NumberFormat('vi-vn', { style: 'currency', currency: 'Vnd' }).format(value * 1000)
    }
    public static appendPercent(value): string {
        value = value /100;
        return value === 'Percent'
            ? value :
            Intl.NumberFormat('vi-vn', { style: 'percent',  maximumFractionDigits: 1 }).format(value)
    }
    public static isEmpty(something: any): boolean {
        return something === null || something === '' || something === undefined ;
    }
    public static isEmptyOrZero(something: any): boolean {
        return something === null || something === '' || something === '0';
    }

    public static genSoTienBangChu(total:number):string {

    if (total == null) {
      return this.numberStringMap[0];
    }
    if (total < 0) {
      return "Không có số tiền âm!";
    }
    if (total > 999999999) {
      return "Số quá lớn!";
    }
    let  isTrieuLe = false;
    let ty:string = null;
    let trieu:string = null;
    let nghin:string = null;
    let sb = "";
    if (total > 0) {
      let nghinNumber:number = total % 1000;
      nghin = this.buildBaSoLienTiep(nghinNumber);
      total = total / 1000;
      total = Math.floor(total);
      if (total > 0) {
        let trieuNumber = total % 1000;
        if (trieuNumber == 0) {
          trieu = " lẻ ";
          isTrieuLe = true;
        } else {
          trieu = this.buildBaSoLienTiep(trieuNumber);
        }
        total = total / 1000;
        total = Math.floor(total);
      }
    }

    if (total > 0) {
      let tyNumber = total % 1000;
      ty = this.buildBaSoLienTiep(tyNumber);
      total = total / 1000;
      total = Math.floor(total);
    }
    if (total > 0) {
      return "Số quá lớn!";
    }
    if (!this.isEmpty(ty)) {
      sb+=(ty)+(" tỷ ");
    }
    if (!this.isEmpty(trieu)) {
      if (isTrieuLe) {
        sb+=(trieu);
      } else {
        sb+=(trieu)+" triệu ";
      }
    }
    if (!this.isEmpty(nghin)) {
      sb+=(nghin)+(" nghìn ");
    }
    sb+=("đồng.");

    let result = sb;
    // first = Character.toUpperCase(result.charAt(0));
    // return first + result.substring(1, result.length());
    return sb;
  }

  private static  buildBaSoLienTiep(baSo:number ):string {
    if (baSo == null || baSo == 0) {
      return null;
    }
    let tram :string= null;
    let chuc:string = null;
    let dv:string = null;
    let isLe:boolean = false;
    if (baSo >= 100) {
      tram = this.numberStringMap[(baSo / 100)];
      baSo = baSo % 100;
      
    }
    if (baSo >= 10 && tram!=='') {
        chuc = this.numberStringMap[(baSo / 10)];
        baSo = baSo % 10;
      } else if(baSo < 10 && tram!=='') {
        chuc = "lẻ";
        isLe = true;
      }else if(baSo>=10 && tram===''){
        chuc = this.numberStringMap[(baSo / 10)];
        baSo = baSo % 10;
      }

    if (baSo > 0) {
      let ab = baSo;
      let a =  ab;
      dv = this.numberStringMap[a];
    }
    let sb:string = "";
    if (!this.isEmpty(tram)) {
      sb+=tram +" trăm ";
    }
    if (!this.isEmpty(chuc)) {
      if (isLe) {
        sb+=chuc;
      } else {
        sb+=(chuc)+(" mươi ");
      }
    }
    if (!this.isEmpty(dv)) {
      sb+=(dv);
    }
    return sb.toString();
  }
  private static numberStringMap=[
      "không",
      "một",
      "hai",
      "ba",
      "bốn",
      "năm",
      "sáu",
      "bảy",
      "tám",
      "chín"];


}