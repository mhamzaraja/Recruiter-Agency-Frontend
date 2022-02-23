import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../config/config';

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {
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

    findAllExperiences() {
        return this.http.get<any>(`${this.host}/api/user/experience/getAll`, this.httpOptions);
    }

    findExperience(data: any, id: number) {
        return this.http.get<any>(`${this.host}/api/user/experience/getOne?id=${id}`, this.httpOptions);
    }

    //experience form
    experienceForm(data: any) {
        data.currentlyWorking = Boolean(data.currentlyWorking);

        let experienceData = {
            ...data,
            userId: this.userId
        }
        return this.http.post<any>(`${this.host}/api/user/experience/create`, experienceData, this.httpOptions);
    }

    updateExperience(data: any, id: number) {
        data.manageTeam = Boolean(data.manageTeam);
        data.currentlyWorking = Boolean(data.currentlyWorking);

        let experienceData = {
            ...data,
            userId: this.userId
        }
        return this.http.put<any>(`${this.host}/api/user/experience/update?id=${id}`, experienceData, this.httpOptions);

    }

    deleteExperience(i: number){
        let id = i;
        return this.http.delete<any>(`${this.host}/api/user/experience/delete?id=${id}`, this.httpOptions);
    }

}
