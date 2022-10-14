import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../config/config';
import userToken from "../../../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class BasicInfoService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    // userInfo(id: number){
    //     return this.http.get<any>(`${this.host}/api/user/profile/getOne?id=${id}`, this.httpOptions);
    // }

    async findUsers(){
        // let userid = JSON.parse(await localStorage.getItem('candID'))?.ProfID;

        return this.http.get<any>(`${this.host}/api/user/profile/getAll?userId=${this.userId}`, this.httpOptions);
    }
    //basicInfo form
    basicInfoForm(data: any) {
        // let avatar;

        data.cnic = Number(data.cnic);
        data.mobile_number = Number(data.mobile_number);

        let basicInfoData = {
            ...data,
            userId: this.userId
        };

        return this.http.post<any>(`${this.host}/api/user/profile/create?userId=${this.userId}`, basicInfoData, this.httpOptions);
    }
}
