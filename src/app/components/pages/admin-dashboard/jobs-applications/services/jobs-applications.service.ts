import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from '../../../../config/config';
import userToken from "../../../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class JobsApplicationsService {
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

    findJobDataById(id: number) {
        return this.http.get<any>(`${this.host}/api/admin/jobs/list/getOne?id=${id}`, this.httpOptions);
    }

    findCandidatesData(id: number) {
        return this.http.get<any>(`${this.host}/api/job/application/getOne?id=${id}`, this.httpOptions);
    }

    updateStatus(id: number, data: any){
        data.application_status = "Approved";
        let applicationData = {
            ...data,
            userId: this.userId
        };

        return this.http.put<any>(`${this.host}/api/job/application/update?id=${id}`, applicationData, this.httpOptions);
    }

    rejectStatus(id: number, data: any){
        data.application_status = "Rejected";
        let applicationData = {
            ...data,
            userId: this.userId
        };

        return this.http.put<any>(`${this.host}/api/job/application/update?id=${id}`, applicationData, this.httpOptions);
    }

}
