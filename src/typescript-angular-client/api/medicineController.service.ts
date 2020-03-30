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

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';
import { MedicineDto, MedicineDtoAdmin } from '../model/models';
import { environment } from '../../environments/environment';
import { CommonData } from '../../app/common/common';
import { TokenStorageService } from '../../app/service/tokenstorage.service';


@Injectable({
    providedIn: "root"
  })
export class MedicineControllerService {

    protected basePath =  environment.host;
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(private tokenStorage:TokenStorageService,@Optional() @SkipSelf()protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
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
    public getListAllMedicine(observe?: 'body', reportProgress?: boolean): Observable<MedicineDto[]>;
    public getListAllMedicine(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MedicineDto[]>>;
    public getListAllMedicine(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MedicineDto[]>>;
    public getListAllMedicine(observe: any = 'body', reportProgress: boolean = false): Observable<any> {




        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
       

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

        return this.httpClient.get<Medicine[]>(`${this.basePath}/medicine/get-all`,
            {
                // params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
/**
     * createNewOne
     * 
     * @param dto dto
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createNewOneUsingPOST(dto: MedicineDtoAdmin, observe?: 'body', reportProgress?: boolean): Observable<MedicineDtoAdmin>;
    public createNewOneUsingPOST(dto: MedicineDtoAdmin, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<MedicineDtoAdmin>>;
    public createNewOneUsingPOST(dto: MedicineDtoAdmin, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<MedicineDtoAdmin>>;
    public createNewOneUsingPOST(dto: MedicineDtoAdmin, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {

        if (dto === null || dto === undefined) {
            throw new Error('Required parameter dto was null or undefined when calling createNewOneUsingPOST.');
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

        return this.httpClient.post<MedicineDtoAdmin>(`${this.basePath}/medicine/newone`,
            dto,
            {
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
    public createSellOrderUsingPOST(sellOrderDto: SellOrderDto, observe?: 'body', reportProgress?: boolean): Observable<SellOrder>;
    public createSellOrderUsingPOST(sellOrderDto: SellOrderDto, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<SellOrder>>;
    public createSellOrderUsingPOST(sellOrderDto: SellOrderDto, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<SellOrder>>;
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

        return this.httpClient.post<SellOrder>(`${this.basePath}/sell-medicine/sell`,
            sellOrderDto,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }


}
