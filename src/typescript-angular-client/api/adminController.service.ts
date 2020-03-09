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

import { Inject, Injectable, Optional } from '@angular/core';
import {
    HttpClient, HttpHeaders, HttpParams,
    HttpResponse, HttpEvent
} from '@angular/common/http';
import { CustomHttpUrlEncodingCodec } from '../encoder';

import { Observable } from 'rxjs/Observable';

import { MedicineDtoAdmin } from '../model/medicineDtoAdmin';
import { BASE_PATH, COLLECTION_FORMATS } from '../variables';
import { Configuration } from '../configuration';
import { environment } from '../../environments/environment';
import { ReportDto } from '../model/models';


@Injectable()
export class AdminControllerService {

    protected basePath = environment.host;
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional() @Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
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
     * create
     * 
     * @param listMedicineDto listMedicineDto
     * @param isNewCompany isNewCompany
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public createUsingPOST(listMedicineDto: Array<MedicineDtoAdmin>, isNewCompany?: boolean, observe?: 'body', reportProgress?: boolean): Observable<Array<MedicineDtoAdmin>>;
    public createUsingPOST(listMedicineDto: Array<MedicineDtoAdmin>, isNewCompany?: boolean, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<MedicineDtoAdmin>>>;
    public createUsingPOST(listMedicineDto: Array<MedicineDtoAdmin>, isNewCompany?: boolean, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<MedicineDtoAdmin>>>;
    public createUsingPOST(listMedicineDto: Array<MedicineDtoAdmin>, isNewCompany?: boolean, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

        if (listMedicineDto === null || listMedicineDto === undefined) {
            throw new Error('Required parameter listMedicineDto was null or undefined when calling createUsingPOST.');
        }


        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (isNewCompany !== undefined && isNewCompany !== null) {
            queryParameters = queryParameters.set('isNewCompany', <any>isNewCompany);
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

        return this.httpClient.post<Array<MedicineDtoAdmin>>(`${this.basePath}/admin/create`,
            listMedicineDto,
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
     * getListAll
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public getListAllUsingPOST(observe?: 'body', reportProgress?: boolean): Observable<Array<MedicineDtoAdmin>>;
    public getListAllUsingPOST(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<MedicineDtoAdmin>>>;
    public getListAllUsingPOST(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<MedicineDtoAdmin>>>;
    public getListAllUsingPOST(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

        return this.httpClient.post<Array<MedicineDtoAdmin>>(`${this.basePath}/admin/get-list-medicine`,
            null,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
    /**
        * report2
        * 
        * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
        * @param reportProgress flag to report request and response progress.
        */
    public report2UsingGET(observe?: 'body', reportProgress?: boolean): Observable<Array<ReportDto>>;
    public report2UsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ReportDto>>>;
    public report2UsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ReportDto>>>;
    public report2UsingGET(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

        return this.httpClient.get<Array<ReportDto>>(`${this.basePath}/admin/report2`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * reportDaily
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public reportDailyUsingGET(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public reportDailyUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public reportDailyUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public reportDailyUsingGET(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

        return this.httpClient.get<any>(`${this.basePath}/admin/report-daily`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

    /**
     * reportMonthly
     * 
     * @param month month
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public reportMonthlyUsingGET(month?: number, observe?: 'body', reportProgress?: boolean): Observable<Array<ReportDto>>;
    public reportMonthlyUsingGET(month?: number, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ReportDto>>>;
    public reportMonthlyUsingGET(month?: number, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ReportDto>>>;
    public reportMonthlyUsingGET(month?: number, observe: any = 'body', reportProgress: boolean = false): Observable<any> {


        let queryParameters = new HttpParams({ encoder: new CustomHttpUrlEncodingCodec() });
        if (month !== undefined && month !== null) {
            queryParameters = queryParameters.set('month', <any>month);
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

        return this.httpClient.get<Array<ReportDto>>(`${this.basePath}/admin/report-monthly`,
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
     * report
     * 
     * @param fromDate fromDate
     * @param toDate toDate
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public reportUsingGET(fromDate: string, toDate: string, observe?: 'body', reportProgress?: boolean): Observable<Array<ReportDto>>;
    public reportUsingGET(fromDate: string, toDate: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<Array<ReportDto>>>;
    public reportUsingGET(fromDate: string, toDate: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<Array<ReportDto>>>;
    public reportUsingGET(fromDate: string, toDate: string, observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

        return this.httpClient.get<Array<ReportDto>>(`${this.basePath}/admin/report`,
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
     * reportYearly
     * 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public reportYearlyUsingGET(observe?: 'body', reportProgress?: boolean): Observable<any>;
    public reportYearlyUsingGET(observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<any>>;
    public reportYearlyUsingGET(observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<any>>;
    public reportYearlyUsingGET(observe: any = 'body', reportProgress: boolean = false): Observable<any> {

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

        return this.httpClient.get<any>(`${this.basePath}/admin/report-yearly`,
            {
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }
}
