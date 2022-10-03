import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../config/config';
import userToken from "../../../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class EmployeesService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    findAllEmployersData() {
        return this.http.get<any>(`${this.host}/api/admin/employer/profile/getAll`, this.httpOptions);
    }

    findAllCompanysData() {
        return this.http.get<any>(`${this.host}/api/employer/company/getAll`, this.httpOptions);
    }
}
