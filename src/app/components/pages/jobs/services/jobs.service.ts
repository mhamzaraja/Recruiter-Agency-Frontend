import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import config from '../../../config/config';
import userToken from "../../../config/userToken";
import { data } from 'jquery';

@Injectable({
    providedIn: 'root'
})
export class JobsService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;
    jobId: number;


    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
            'Authorization': 'Bearer ' + this.token,
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
            'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
        })
    };

    constructor(private http: HttpClient) { }

    findAllJobs(p: number) {
        let page = p;
        return this.http.get<any>(`${this.host}/api/jobs/list/getAll?page=${page}`, this.httpOptions);
    }
    searchJobs(data: any,) {
        let searchData = {
            ...data,
        }
        console.log("serdata", data);
        
        return this.http.post<any>(`${this.host}/api/jobs/list/search`, searchData, this.httpOptions);
    }
    favouriteJobs(data: any) {
        console.log("data" ,data)
        let body={
            userId:this.userId,
            jobId:data
            // jobId:id
        };
        console.log("api", body);
        
        return this.http.post<any>(`${this.host}/api/job/favaourite/create`, body, this.httpOptions);
    }
}
