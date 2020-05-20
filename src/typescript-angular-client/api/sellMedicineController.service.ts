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
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional, SkipSelf }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs/Observable';

import { Medicine } from '../model/medicine';
import { SellOrder } from '../model/sellOrder';
import { SellOrderDto } from '../model/sellOrderDto';
// import { enviroment} from './../../enviroments/enviroment';
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { environment } from '../../environments/environment';
import { TokenStorageService } from '../../app/service/tokenstorage.service';


@Injectable({
    providedIn: "root"
  })
export class SellMedicineControllerService {

    protected basePath =  environment.host;
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * addMedicine
     * 
     * @param code code
     * @param name name
     * @param price price
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public addMedicineUsingGET(code?: string, name?: string, price?: number, observe?: 'body', reportProgress?: boolean): Observable<Medicine>;
    public addMedicineUsingGET(code?: string, name?: string, price?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Medicine>>;
    public addMedicineUsingGET(code?: string, name?: string, price?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Medicine>>;
    public addMedicineUsingGET(code?: string, name?: string, price?: number, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {




        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (code !== undefined && code !== null) {
            queryParameters = queryParameters.set('code', <any>code);
        }
        if (name !== undefined && name !== null) {
            queryParameters = queryParameters.set('name', <any>name);
        }
        if (price !== undefined && price !== null) {
            queryParameters = queryParameters.set('price', <any>price);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }
        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Medicine>(`${this.basePath}/sell-medicine/add-medicine`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * createSellOrder1
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createSellOrder1UsingGET(observe?: 'body', reportProgress?: boolean): Observable<string>;
    public createSellOrder1UsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<string>>;
    public createSellOrder1UsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<string>>;
    public createSellOrder1UsingGET(observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<string>(`${this.basePath}/sell-medicine/sell`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * createSellOrder
     * 
     * @param sellOrderDto sellOrderDto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createSellOrderUsingPOST(sellOrderDto: SellOrderDto, observe?: 'body', reportProgress?: boolean): Observable<SellOrderDto>;
    public createSellOrderUsingPOST(sellOrderDto: SellOrderDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SellOrderDto>>;
    public createSellOrderUsingPOST(sellOrderDto: SellOrderDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SellOrderDto>>;
    public createSellOrderUsingPOST(sellOrderDto: SellOrderDto, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (sellOrderDto === null || sellOrderDto === undefined) {
            throw new Error('Required parameter sellOrderDto was null or undefined when calling createSellOrderUsingPOST.');
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
            'application/json'
        ];
        const httpContentTypeSelected: string | undefined = this.configuration.selectHeaderContentType(consumes);
        if (httpContentTypeSelected != undefined) {
            headers = headers.set('Content-Type', httpContentTypeSelected);
        }

        return this.httpClient.post<SellOrderDto>(`${this.basePath}/sell-medicine/sell`,
            sellOrderDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
      /**
   * my history sell
   * @param seller 
   * @param observe 
   * @param reportProgress 
   */ 
  public reportMyHistorySellGET(seller: string,observe?: 'body', reportProgress?: boolean): Observable<Array<SellOrderDto>>;
  public reportMyHistorySellGET(seller: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<SellOrderDto>>>;
  public reportMyHistorySellGET(seller: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<SellOrderDto>>>;
  public reportMyHistorySellGET(seller: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

      if (seller === null || seller === undefined) {
          throw new Error('Required parameter seller was null or undefined when calling reportUsingGET.');
      }

     

      let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
      if (seller !== undefined && seller !== null) {
          queryParameters = queryParameters.set('seller', <any>seller);
      }
      

      let headers = this.defaultHeaders;

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          '*/*'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
      ];

      return this.httpClient.get<Array<SellOrderDto>>(`${this.basePath}/sell-medicine/myhistory-sell`,
          {
              params: queryParameters,
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }
  /**
  * my history sell
  * @param seller 
  * @param observe 
  * @param reportProgress 
  */ 
 public reportMyHistorySellByIdGET(sellOrderId: string,observe?: 'body', reportProgress?: boolean): Observable<SellOrderDto>;
 public reportMyHistorySellByIdGET(sellOrderId: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SellOrderDto>>;
 public reportMyHistorySellByIdGET(sellOrderId: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SellOrderDto>>;
 public reportMyHistorySellByIdGET(sellOrderId: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

     if (sellOrderId === null || sellOrderId === undefined) {
         throw new Error('Required parameter seller was null or undefined when calling reportUsingGET.');
     }

    

     let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
     if (sellOrderId !== undefined && sellOrderId !== null) {
         queryParameters = queryParameters.set('sellOrderId', <any>sellOrderId);
     }
     

     let headers = this.defaultHeaders;

     // to determine the Accept header
     let httpHeaderAccepts: string[] = [
         '*/*'
     ];
     const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
     if (httpHeaderAcceptSelected != undefined) {
         headers = headers.set('Accept', httpHeaderAcceptSelected);
     }

     // to determine the Content-Type header
     const consumes: string[] = [
     ];

     return this.httpClient.get<Array<SellOrderDto>>(`${this.basePath}/sell-medicine/getSellOrder`,
         {
             params: queryParameters,
             withCredentials: this.configuration.withCredentials,
             headers: headers,
             observe: observe,
             reportProgress: reportProgress
         }
     );
 }
    /**
   * history sell
   * 
   * @param fromDate fromDate
   * @param toDate toDate
   * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
   * @param reportProgress flag to report request and response progress.
   */
  public reportMyHistorySellBetweenDays(fromDate: string, toDate: string, observe?: 'body', reportProgress?: boolean): Observable<Array<SellOrderDto>>;
  public reportMyHistorySellBetweenDays(fromDate: string, toDate: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<SellOrderDto>>>;
  public reportMyHistorySellBetweenDays(fromDate: string, toDate: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<SellOrderDto>>>;
  public reportMyHistorySellBetweenDays(fromDate: string, toDate: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

      if (fromDate === null || fromDate === undefined) {
          throw new Error('Required parameter fromDate was null or undefined when calling reportUsingGET.');
      }

      if (toDate === null || toDate === undefined) {
          throw new Error('Required parameter toDate was null or undefined when calling reportUsingGET.');
      }

      let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
      if (fromDate !== undefined && fromDate !== null) {
          queryParameters = queryParameters.set('fromDate', <any>fromDate);
      }
      if (toDate !== undefined && toDate !== null) {
          queryParameters = queryParameters.set('toDate', <any>toDate);
      }

      let headers = this.defaultHeaders;

      // to determine the Accept header
      let httpHeaderAccepts: string[] = [
          '*/*'
      ];
      const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
      if (httpHeaderAcceptSelected != undefined) {
          headers = headers.set('Accept', httpHeaderAcceptSelected);
      }

      // to determine the Content-Type header
      const consumes: string[] = [
      ];

      return this.httpClient.get<Array<SellOrderDto>>(`${this.basePath}/sell-medicine/my-history-betweendays`,
          {
              params: queryParameters,
              withCredentials: this.configuration.withCredentials,
              headers: headers,
              observe: observe,
              reportProgress: reportProgress
          }
      );
  }

  /**
     * genMoney
     * 
     * @param money money
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public genMoneyUsingGET(money: string, observe?: 'body', reportProgress?: boolean): Observable<Array<string>>;
    public genMoneyUsingGET(money: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<string>>>;
    public genMoneyUsingGET(money: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<string>>>;
    public genMoneyUsingGET(money: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (money === null || money === undefined) {
            throw new Error('Required parameter money was null or undefined when calling genMoneyUsingGET.');
        }

        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (money !== undefined && money !== null) {
            queryParameters = queryParameters.set('money', <any>money);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            '*/*'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.get<Array<string>>(`${this.basePath}/sell-medicine/gen-money`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
}
