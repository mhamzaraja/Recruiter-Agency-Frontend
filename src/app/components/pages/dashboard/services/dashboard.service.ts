import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../../config/config';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    host: string = config.host;
    constructor(private http: HttpClient) {}

    basicInfoForm(data: any){
        var basicInfoData = data;
        return this.http.post<any>(`${this.host}/api/user/profile/create`, basicInfoData);
    }

    educationForm(data: any){
        var educationData = data;
        console.log(educationData);
        return this.http.post<any>(`${this.host}/api/user/education/create`, educationData);
    }

    experienceForm(data: any){
        var experienceData = data;
        return this.http.post<any>(`${this.host}/api/user/education/create`, experienceData);
    }

    projectsForm(data: any){
        var projectsData = data;
        return this.http.post<any>(`${this.host}/api/user/projects/create`, projectsData);
    }
    skillsForm(data: any){
        var skillsData = data;
        return this.http.post<any>(`${this.host}/api/user/skills/create`, skillsData);
    }
    languagesForm(data: any){
        var languagesData = data;
        return this.http.post<any>(`${this.host}/api/user/languages/create`, languagesData);
    }
    resumeForm(){
        return this.http.get<any>(`${this.host}/api/auth/signin`);
    }

    logoutForm(){
    }
}
