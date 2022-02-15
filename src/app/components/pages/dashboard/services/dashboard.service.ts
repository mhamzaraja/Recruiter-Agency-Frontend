import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../config/config';


@Injectable({
    providedIn: 'root'
})
export class DashboardService {
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

    basicInfoForm(data: any) {
        let avatar;
        let email;

        let name = data.name;
        let dob = data.dob;
        let gender = data.gender;
        let marital_status = data.maritalStatus;
        let nationality = data.nationality;
        let cnic = Number(data.cnic);
        let city = data.city;
        let area = data.area;
        let mobile_number = Number(data.phone);
        let career_level = data.career;
        let expected_salary = data.expectedSalary;
        let summary = data.summary;
        let experience = data.experience;

        let basicInfoData = {
            name,
            email,
            mobile_number,
            summary,
            dob,
            gender,
            marital_status,
            nationality,
            cnic,
            career_level,
            experience,
            city,
            area,
            expected_salary,
            userId: this.userId
        };

        return this.http.post<any>(`${this.host}/api/user/profile/create`, basicInfoData, this.httpOptions);
    }

    educationForm(data: any) {
        let degree_title = data.degreeTitle
        let field_of_study = data.fieldOfStudy
        let location = data.location
        let institution = data.institute
        let completion_year = Number(data.completionYear)
        let obtained_gpa = Number(data.gpa)


        let educationData = {
            degree_title,
            field_of_study,
            location,
            institution,
            completion_year,
            obtained_gpa,
            userId: this.userId
        };
        return this.http.post<any>(`${this.host}/api/user/education/create`, educationData, this.httpOptions);
    }

    experienceForm(data: any) {
        let jobTitle = data.jobTitle;
        let company = data.company;
        let industry = data.industry;
        let manageTeam = data.manageTeam;
        let salary = data.salary;
        let locationExp = data.locationExp;
        let startDate = data.startDate;
        let endDate = data.endDate;
        let summaryExp = data.summaryExp;
        let checkbox = data.checkbox;

        let experienceData = {
            jobTitle,
            company,
            industry,
            manageTeam,
            salary,
            locationExp,
            startDate,
            endDate,
            summaryExp,
            checkbox,
            userId: this.userId
        }
        console.log(experienceData);
        return this.http.post<any>(`${this.host}/api/user/education/create`, experienceData, this.httpOptions);
    }

    projectsForm(data: any) {
        let project_name = data.projectName;
        let project_url = data.projectUrl;
        let start_date = data.startDate;
        let end_date = data.endDate;
        let currently_ongoing = data.checkbox;
        let associated_with = data.associated;
        let description = data.descPrj;

        let projectsData = {
            project_name,
            project_url,
            start_date,
            end_date,
            currently_ongoing,
            associated_with,
            description,
            userId: this.userId
        };
        return this.http.post<any>(`${this.host}/api/user/projects/create`, projectsData, this.httpOptions);
    }

    skillsForm(data: any) {
        let skill_title = data.skill;
        let skill_proficiency = data.experienceSkill;
        var skillsData = {
            skill_title,
            skill_proficiency,
            userId: this.userId
        };
        return this.http.post<any>(`${this.host}/api/user/skills/create`, skillsData, this.httpOptions);
    }

    languagesForm(data: any) {
        let language_title = data.language;
        let language_proficiency = data.proficiencyLang;
        var languagesData = {
            language_title,
            language_proficiency,
            userId: this.userId
        };
        return this.http.post<any>(`${this.host}/api/user/languages/create`, languagesData, this.httpOptions);
    }

    resumeForm() {
        return this.http.get<any>(`${this.host}/api/auth/signin`);
    }

    logoutForm() {
    }
}
