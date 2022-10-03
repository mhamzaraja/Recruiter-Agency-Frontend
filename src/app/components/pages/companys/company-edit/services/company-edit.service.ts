import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../config/config';
import userToken from "../../../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class CompanyEditService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    findOneCompany(id: number){
        return this.http.get<any>(`${this.host}/api/employer/company/getOne?id=${id}`, this.httpOptions);
    }
    companyUpdateForm(data: any, id: number) {

        data.is_default = Boolean(data.is_default);
        data.is_active = Boolean(data.is_active);
        data.office_number = Number(data.office_number);
        data.mobile_number = Number(data.mobile_number);

        let companyData = {
            ...data,
            employerId: this.userId
        }
        return this.http.put<any>(`${this.host}/api/employer/company/update?id=${id}`, companyData, this.httpOptions);

    }
}
