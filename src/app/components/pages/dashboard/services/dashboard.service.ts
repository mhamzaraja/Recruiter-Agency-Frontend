import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import config from '../../../config/config';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {
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

    constructor(private http: HttpClient,
        private router: Router) { }

    resumeForm() {
        return this.http.get<any>(`${this.host}/api/auth/signin`);
    }

    logout() {
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
    }
}
