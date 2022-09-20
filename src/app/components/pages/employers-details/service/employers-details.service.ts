import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from '../../../config/config';
import userToken from "../../../config/userToken";

@Injectable({
  providedIn: 'root'
})
export class EmployersDetailsService {

  host: string = config.host; 
  token: any = userToken.token;
  userId: string = userToken.id;
  httpOptions = userToken.httpOptions;

  constructor(private http: HttpClient) { }

  getemployerdata(id: number){
    return this.http.get<any>(`${this.host}/api/admin/employer/profile/getOne?id=${id}`, this.httpOptions);
  }
}
