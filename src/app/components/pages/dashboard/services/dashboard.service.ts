import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import config from '../../../config/config';
import userToken from "../../../config/userToken";


@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient,
        private router: Router) { }

    findUsers() {
        return this.http.get<any>(`${this.host}/api/user/profile/getAll`, this.httpOptions);
    }

    logout() {
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
        return this.http.post<any>(`${this.host}/api/auth/signout`, this.httpOptions);
    }
}
