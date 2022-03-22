import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class AdminRegisterService {
    host: string = config.host;

  constructor(private http: HttpClient) { }

  signup(data: any) {
    var signupData = data;
    delete signupData.confirmPassword;

    console.log("ad:", signupData);
    return this.http.post<any>(`${this.host}/api/auth/signup`, signupData);
}
}
