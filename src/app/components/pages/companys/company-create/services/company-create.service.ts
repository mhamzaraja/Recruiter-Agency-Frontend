import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../config/config';
import userToken from "../../../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class CompanyCreateService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    companyForm(data: any) {

        data.is_default = Boolean(data.is_default);
        data.is_active = Boolean(data.is_active);
        data.office_number = Number(data.office_number);
        data.mobile_number = Number(data.mobile_number);

        let companyData = {
            ...data,
            employerId: this.userId
        }
        return this.http.post<any>(`${this.host}/api/employer/company/create`, companyData, this.httpOptions);

    }

    findAllCompanys(){
        return this.http.get<any>(`${this.host}/api/employer/company/getAll`, this.httpOptions);
    }



    companyDeleteForm(id: number) {
        return this.http.delete<any>(`${this.host}/api/employer/company/delete?id=${id}`, this.httpOptions);
    }
}
