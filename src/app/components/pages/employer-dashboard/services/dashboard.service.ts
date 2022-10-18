import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../config/config';
import userToken from "../../../config/userToken";


@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;
    
    constructor(private http: HttpClient) { }

    findAllJobs(p: number) {
        let page = p; 
        return this.http.get<any>(`${this.host}/api/employer/job/getAll?page=${page}`, this.httpOptions);
    }

    findAllCompanys() {
        return this.http.get<any>(`${this.host}/api/employer/company/getAll`, this.httpOptions);
    }

    findEmployerData(){
        return this.http.get<any>(`${this.host}/api/employer/profile/getOne?userId=${this.userId}`, this.httpOptions);
      }

    resumeForm() {
        return this.http.get<any>(`${this.host}/api/auth/signin`);
    }

    logoutForm() {
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

    deleteJobPost(id: number){
        return this.http.delete<any>(`${this.host}/api/employer/job/delete?id=${id}`, this.httpOptions);
    }
}
