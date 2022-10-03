import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../config/config';
import userToken from "../../../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class ExperienceService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    findAllExperiences() {
        return this.http.get<any>(`${this.host}/api/user/experience/getAll`, this.httpOptions);
    }

    findExperience( id: number) {
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
