import { Logger } from '../../log.service';

export class DateUtils{
    public static addDays(date:Date, addMore:number ):Date{
        date.setDate(date.getDate()+addMore);
        return date;
    }
    public static toEndOfDate(date:Date):Date{
        date.setHours(23,59,59,999);
        return date;
    }
    public static toStartOfDate(date:Date):Date{
        date.setHours(0,0,0,0);
        return date;
    }
}