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
    profileId: string = userToken.CandID;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    async findAllExperiences() {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        return this.http.get<any>(`${this.host}/api/user/experience/getAll?userId=${profileId}`, this.httpOptions);
    }

    findExperience(id: number) {
        return this.http.get<any>(`${this.host}/api/user/experience/getOne?id=${id}`, this.httpOptions);
    }

    //experience form
    async experienceForm(data: any) {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        data.currentlyWorking = Boolean(data.currentlyWorking);

        let experienceData = {
            ...data,
            userId: profileId
        }
        return this.http.post<any>(`${this.host}/api/user/experience/create?userId=${profileId}`, experienceData, this.httpOptions);
    }

    async updateExperience(data: any, id: number) {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        data.currentlyWorking = Boolean(data.currentlyWorking);

        let experienceData = {
            ...data,
            userId: profileId
        }
        return this.http.put<any>(`${this.host}/api/user/experience/update?userId=${profileId}&id=${id}`, experienceData, this.httpOptions);

    }

    async deleteExperience(i: number) {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        let id = i;
        return this.http.delete<any>(`${this.host}/api/user/experience/delete?userId=${profileId}&id=${id}`, this.httpOptions);
    }

}
