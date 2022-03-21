import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from '../../../../config/config';

@Injectable({
    providedIn: 'root'
})
export class JobsService {
    host: string = config.host;
    token: any = JSON.parse(localStorage.getItem('userToken')).token;
    userId: string = JSON.parse(localStorage.getItem('userToken')).id;

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

    findAllJobsData() {
        return this.http.get<any>(`${this.host}/api/admin/jobs/list/getAll`, this.httpOptions);
    }

    findAllEmployersData() {
        return this.http.get<any>(`${this.host}/api/admin/employer/profile/getAll`, this.httpOptions);
    }

    findEmployerDataById(id: number) {
        return this.http.get<any>(`${this.host}/api/admin/employer/profile/getOne?id=${id}`, this.httpOptions);
    }

    deleteJob(id: number){
        return this.http.delete<any>(`${this.host}/api/employer/job/delete?id=${id}`, this.httpOptions);
    }
}
