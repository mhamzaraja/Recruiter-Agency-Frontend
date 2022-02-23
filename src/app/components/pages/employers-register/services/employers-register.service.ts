import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../../config/config';

@Injectable({
    providedIn: 'root'
})
export class EmployersRegisterService {
    host: string = config.host;

    constructor(private http: HttpClient) { }

    signup(data: any) {
        var signupData = data;
        delete signupData.confirmPassword;

        return this.http.post<any>(`${this.host}/api/auth/signup`, signupData);
    }
}