import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class LanguageInfoService {
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

  constructor(private http: HttpClient) { }

      //languages form
      findAllLanguages(){
        return this.http.get<any>(`${this.host}/api/user/languages/getAll`, this.httpOptions);
      }

      findLanguage(data:any, id:number){
        return this.http.get<any>(`${this.host}/api/user/languages/getOne?id=${id}`, this.httpOptions);
      }

      languagesForm(data: any) {
        var languagesData = {
            ...data,
            userId: this.userId
        };
        return this.http.post<any>(`${this.host}/api/user/languages/create`, languagesData, this.httpOptions);
    }

    updateLanguage(data: any, id: number) {
        var languagesData = {
            ...data,
            userId: this.userId
        };
        return this.http.put<any>(`${this.host}/api/user/languages/update?id=${id}`, languagesData, this.httpOptions);
    }
}
