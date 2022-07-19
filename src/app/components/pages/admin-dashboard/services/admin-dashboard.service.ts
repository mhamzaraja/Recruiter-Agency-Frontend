import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import config from '../../../config/config';
import userToken from "../../../config/userToken";
import { Router } from '@angular/router'

@Injectable({
    providedIn: 'root'
})
export class AdminDashboardService {
    host: string = config.host;
    token: any = userToken.token;

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

    constructor(private router: Router,
        private http: HttpClient
    ) { }

    logout() {
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
        return this.http.post<any>(`${this.host}/api/auth/signout`, this.httpOptions);
    }

}
