export class GenerateFileName{
    public static genfileName(customerName:string):string{
        if(!customerName||customerName===''){
            customerName='KhachLe';
        }
        let date = new Date();
        let homnay = date.getDate()+''+(date.getMonth()+1)+''+date.getFullYear();
        return customerName+'-'+homnay;
    }
    public static genNormalReportName(fromDate,toDate,something):string{
        return 'Báo cáo '+something+fromDate+'-'+toDate;
    }
}