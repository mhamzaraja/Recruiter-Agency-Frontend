import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../config/config';
import userToken from "../../../config/userToken";

@Injectable({
  providedIn: 'root'
})
export class EmployerBasicInfoService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;

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

  constructor(private http: HttpClient) { }

  employerForm(data: any) {

    data.office_number = Number(data.office_number);
    data.mobile_number = Number(data.mobile_number);

    let emloyerData = {
        ...data,
        employerId: this.userId
    }
    return this.http.post<any>(`${this.host}/api/employer/profile/create`, emloyerData, this.httpOptions);

}

  findEmployerData(){
    return this.http.get<any>(`${this.host}/api/employer/profile/getAll`, this.httpOptions);
  }
}
