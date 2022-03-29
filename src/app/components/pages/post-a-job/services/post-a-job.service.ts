import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../config/config';
import userToken from "../../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class PostAJobService {
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

    findJobById(id: number){
        return this.http.get<any>(`${this.host}/api/employer/job/getOne?id=${id}`, this.httpOptions);
    }

    jobPostForm(data: any) {
        data.is_active = Boolean(data.is_active);
        data.is_sponsor = Boolean(data.is_sponsor);
        data.positions_available = Number(data.positions_available);

        let jobPostData = {
            ...data,
            employerId: this.userId
        }
        return this.http.post<any>(`${this.host}/api/employer/job/create`, jobPostData, this.httpOptions);
    }

    deleteJobPost(id: number){
        return this.http.delete<any>(`${this.host}/api/employer/job/delete?id=${id}`, this.httpOptions);
    }

    updateJobPost(id: number, data: any){
        data.is_active = Boolean(data.is_active);
        data.is_sponsor = Boolean(data.is_sponsor);
        data.positions_available = Number(data.positions_available);

        let jobPostData = {
            ...data,
            employerId: this.userId
        }
        return this.http.put<any>(`${this.host}/api/employer/job/update?id=${id}`, jobPostData, this.httpOptions);
    }
}
