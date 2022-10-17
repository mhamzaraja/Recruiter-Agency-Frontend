import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../config/config';
import userToken from "../../../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class SkillsLanguagesService {
    host: string = config.host;
    token: any = userToken.token;
    profileId: string = userToken.CandID;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    //skills form
 
    async findAllSkill() {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        return this.http.get<any>(`${this.host}/api/user/skills/getAll?userId=${profileId}`, this.httpOptions);
    }

    findSkill(data: any, id: number) {
        return this.http.get<any>(`${this.host}/api/user/skills/getOne?id=${id}`, this.httpOptions);
    }

    async skillsForm(data: any) {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        let skillsData = {
            ...data,
            userId:profileId
        };
        return this.http.post<any>(`${this.host}/api/user/skills/create`, skillsData, this.httpOptions);
    }

    async updateSkill(data: any, id: number) {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        var skillsData = {
            ...data,
            userId: profileId
        };
        return this.http.put<any>(`${this.host}/api/user/skills/update?userId=${profileId}&id=${id}`, skillsData, this.httpOptions);
    }

    async deleteSkill(id: number) {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        return this.http.delete<any>(`${this.host}/api/user/skills/delete?userId=${profileId}&id=${id}`, this.httpOptions);
    }


    //languages form
    async findAllLanguages() {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        return this.http.get<any>(`${this.host}/api/user/languages/getAll?userId=${profileId}`, this.httpOptions);
    }

    findLanguage(data: any, id: number) {
        return this.http.get<any>(`${this.host}/api/user/languages/getOne?id=${id}`, this.httpOptions);
    }

    async languagesForm(data: any) {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        
        var languagesData = {
            ...data,
            userId:profileId
        };
        return this.http.post<any>(`${this.host}/api/user/languages/create`, languagesData, this.httpOptions);
    }

    async updateLanguage(data: any, id: number) {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;

        var languagesData = {
            ...data,
            userId: profileId
        };
        return this.http.put<any>(`${this.host}/api/user/languages/update?userId=${profileId}&id=${id}`, languagesData, this.httpOptions);
    }

    async deleteLanguage(id: number) {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;

        return this.http.delete<any>(`${this.host}/api/user/languages/delete?userId=${profileId}&id=${id}`, this.httpOptions);
    }
}
