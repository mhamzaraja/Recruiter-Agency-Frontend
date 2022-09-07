import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import config from '../../../config/config';
import userToken from "../../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class JobsService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;

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

    findAllJobs() {
        return this.http.get<any>(`${this.host}/api/jobs/list/getAll`, this.httpOptions);
    }
    searchJobs(data: any) {
        let searchData = {
            ...data
        }
        return this.http.post<any>(`${this.host}/api/jobs/list/search`, searchData, this.httpOptions);
    }
}
