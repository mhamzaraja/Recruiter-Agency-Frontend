import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../../config/config';

@Injectable({
    providedIn: 'root'
})
export class EmployersLoginService {

    host: string = config.host;
    constructor(private http: HttpClient) { }
    login(data: any) {
        var loginData = data;
        delete loginData.confirmPassword;

        return this.http.post<any>(`${this.host}/api/auth/signin`, loginData);

    }
}
