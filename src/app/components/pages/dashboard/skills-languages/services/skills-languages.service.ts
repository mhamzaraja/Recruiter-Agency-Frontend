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
    userId: string = userToken.CandID;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    //skills form

    async findAllSkill() {
        let userid = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        return this.http.get<any>(`${this.host}/api/user/skills/getAll?userId=${userid}`, this.httpOptions);
    }

    findSkill(data: any, id: number) {
        return this.http.get<any>(`${this.host}/api/user/skills/getOne?id=${id}`, this.httpOptions);
    }

    skillsForm(data: any) {

        let skillsData = {
            ...data,
            userId: this.userId
        };
        return this.http.post<any>(`${this.host}/api/user/skills/create?userId=${this.userId}`, skillsData, this.httpOptions);
    }

    updateSkill(data: any, id: number) {

        var skillsData = {
            ...data,
            userId: this.userId
        };
        return this.http.put<any>(`${this.host}/api/user/skills/update?userId=${this.userId}&id=${id}`, skillsData, this.httpOptions);
    }

    deleteSkill(id: number) {
        return this.http.delete<any>(`${this.host}/api/user/skills/delete?userId=${this.userId}&id=${id}`, this.httpOptions);
    }


    //languages form
    async findAllLanguages() {
        let userid = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        return this.http.get<any>(`${this.host}/api/user/languages/getAll?userId=${userid}`, this.httpOptions);
    }

    findLanguage(data: any, id: number) {
        return this.http.get<any>(`${this.host}/api/user/languages/getOne?id=${id}`, this.httpOptions);
    }

    languagesForm(data: any) {
        var languagesData = {
            ...data,
            userId: this.userId
        };
        return this.http.post<any>(`${this.host}/api/user/languages/create?userId=${this.userId}`, languagesData, this.httpOptions);
    }

    updateLanguage(data: any, id: number) {
        var languagesData = {
            ...data,
            userId: this.userId
        };
        return this.http.put<any>(`${this.host}/api/user/languages/update?userId=${this.userId}&id=${id}`, languagesData, this.httpOptions);
    }

    deleteLanguage(id: number) {
        return this.http.delete<any>(`${this.host}/api/user/languages/delete?userId=${this.userId}&id=${id}`, this.httpOptions);
    }
}
