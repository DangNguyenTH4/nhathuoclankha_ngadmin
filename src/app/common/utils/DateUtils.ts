export class DateUtils{
    public static addDays(date:Date, addMore:number ):Date{
        console.log(date);
        date.setDate(date.getDate()+addMore);
        console.log(date);
        return date;
    }
    public static toEndOfDate(date:Date):Date{
        console.log(date);
        date.setHours(23,59,59,999);
        console.log(date);
        return date;
    }
    public static toStartOfDate(date:Date):Date{
        console.log(date);
        date.setHours(0,0,0,0);
        console.log(date);
        return date;
    }
}