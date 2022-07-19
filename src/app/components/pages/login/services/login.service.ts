import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../../config/config';
import userToken from "../../../config/userToken";
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})


export class LoginService {
    host: string = config.host;
    constructor(private http: HttpClient) {}

    login(data: any) {
        var loginData = data;
        delete loginData.confirmPassword;

        return this.http.post<any>(`${this.host}/api/auth/signin`, loginData);

    }
}
