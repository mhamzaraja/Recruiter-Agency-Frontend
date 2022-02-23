import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../config/config';

@Injectable({
    providedIn: 'root'
})
export class BasicInfoService {
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

    // userInfo(id: number){
    //     return this.http.get<any>(`${this.host}/api/user/profile/getOne?id=${id}`, this.httpOptions);
    // }

    findUsers(){
        return this.http.get<any>(`${this.host}/api/user/profile/getAll`, this.httpOptions);
    }
    //basicInfo form
    basicInfoForm(data: any) {
        // let avatar;
        let email;

        data.cnic = Number(data.cnic);
        data.mobile_number = Number(data.mobile_number);

        let basicInfoData = {
            ...data,
            userId: this.userId
        };

        return this.http.post<any>(`${this.host}/api/user/profile/create`, basicInfoData, this.httpOptions);
    }
}
