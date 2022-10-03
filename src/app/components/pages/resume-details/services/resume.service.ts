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
