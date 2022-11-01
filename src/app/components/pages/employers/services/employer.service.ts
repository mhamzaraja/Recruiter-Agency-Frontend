import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from '../../../config/config';
import userToken from "../../../config/userToken";

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  host: string = config.host;
  token: any = userToken.token;
  httpOptions = userToken.httpOptions;

  constructor(private http: HttpClient) { }


  getAllEmployers() {
    return this.http.get<any>(`${this.host}/api/admin/employer/profile/getAll`, this.httpOptions);
  }
  deleteEmployer(id: number, empProfId: number){
    return this.http.delete<any>(`${this.host}/api/employer/profile/delete?id=${id}&employerId=${empProfId}`, this.httpOptions);
}
}
