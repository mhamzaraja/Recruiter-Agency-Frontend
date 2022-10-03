import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from '../../../config/config';
import userToken from "../../../config/userToken";


@Injectable({
  providedIn: 'root'
})
export class CamdidatesDetailsService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

  constructor(private http: HttpClient) { }

  getCandidateData(id: number){
    return this.http.get<any>(`${this.host}/api/admin/user/profile/getOne?id=${id}&userId=${this.userId}`, this.httpOptions);
  }

}
