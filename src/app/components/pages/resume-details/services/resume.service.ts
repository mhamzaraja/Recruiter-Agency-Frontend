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

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers':
                'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
            Authorization: 'Bearer ' + this.token,
            'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
            Allow: 'GET, POST, OPTIONS, PUT, DELETE',
        }),
    };

    constructor(private http: HttpClient) {}

    //EducationService
    findAllEducations() {
        return this.http.get<any>(
            `${this.host}/api/user/education/getAll`,
            this.httpOptions
        );
    }
    //WorkExperience
    findAllExperiences() {
        return this.http.get<any>(
            `${this.host}/api/user/experience/getAll`,
            this.httpOptions
        );
    }
    //Basic Info
    findUsers() {
        return this.http.get<any>(
            `${this.host}/api/user/profile/getAll`,
            this.httpOptions
        );
    }

    //Projects
    findAllProjects() {
        return this.http.get<any>(
            `${this.host}/api/user/projects/getAll`,
            this.httpOptions
        );
    }
    //Skills
    findAllSkill() {
        return this.http.get<any>(
            `${this.host}/api/user/skills/getAll`,
            this.httpOptions
        );
    }
    //languages
    findAllLanguages() {
        return this.http.get<any>(
            `${this.host}/api/user/languages/getAll`,
            this.httpOptions
        );
    }
}
