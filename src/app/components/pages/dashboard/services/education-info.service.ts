import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../config/config';

@Injectable({
    providedIn: 'root'
})
export class EducationInfoService {
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

    //education form

    findAllEducations(){
        return this.http.get<any>(`${this.host}/api/user/education/getAll`, this.httpOptions);
    }

    findEducation(data: any, id: number) {
        return this.http.get<any>(`${this.host}/api/user/education/getOne?id=${id}`, this.httpOptions);

    }

    educationForm(data: any) {
        data.completion_year = Number(data.completion_year);
        data.obtained_gpa = Number(data.obtained_gpa);
        console.log(data);

        let educationData = {
            ...data,
            userId: this.userId
        };
        console.log(educationData);

        return this.http.post<any>(`${this.host}/api/user/education/create`, educationData, this.httpOptions);
    }

    updateEducation(data: any, i: number) {
        let id = i;

        data.completion_year = Number(data.completion_year);
        data.obtained_gpa = Number(data.obtained_gpa);
        console.log(data);

        let educationData = {
            ...data,
            userId: this.userId
        };


        return this.http.put<any>(`${this.host}/api/user/education/update?id=${id}`, educationData, this.httpOptions);
    }

}
