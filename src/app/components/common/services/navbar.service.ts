import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import config from '../../config/config';
import userToken from "../../config/userToken";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
    host: string = config.host;
    token: any = userToken.token;
    httpOptions = userToken.httpOptions;
    

  constructor(private router: Router,
    private http: HttpClient) { }

  logout(){
    localStorage.removeItem('userToken');
    this.router.navigate(['/login']);
    return this.http.post<any>(`${this.host}/api/auth/signout`, this.httpOptions);
  }
}
