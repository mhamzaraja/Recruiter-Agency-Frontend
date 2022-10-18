import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from '../../../config/config';
import userToken from '../../../config/userToken';

@Injectable({
    providedIn: 'root',
})
export class ResumeService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) {}

    //EducationService
    async findAllEducations() {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        return this.http.get<any>(
            `${this.host}/api/user/education/getAll?userId=${profileId}`,
            this.httpOptions
        );
    }
    //WorkExperience
    async findAllExperiences() {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        return this.http.get<any>(
            `${this.host}/api/user/experience/getAll?userId=${profileId}`,
            this.httpOptions
        );
    }
    //Basic Info
    findUsers() {
        return this.http.get<any>(
            `${this.host}/api/user/profile/getAll?userId=${this.userId}`,
            this.httpOptions
        );
    }

    //Projects
    async findAllProjects() {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        return this.http.get<any>(
            `${this.host}/api/user/projects/getAll?userId=${profileId}`,
            this.httpOptions
        );
    }
    //Skills
    async findAllSkill() {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;

        return this.http.get<any>(
            `${this.host}/api/user/skills/getAll?userId=${profileId}`,
            this.httpOptions
        );
    }
    //languages
    async findAllLanguages() {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;

        return this.http.get<any>(
            `${this.host}/api/user/languages/getAll?userId=${profileId}`,
            this.httpOptions
        );
    }
}
