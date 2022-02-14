import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../../config/config';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {
    host: string = config.host;
    constructor(private http: HttpClient) { }

    basicInfoForm(data: any) {
        let name = data.name;
        let email = data.email;
        let phone = Number(data.phone);
        let summary = data.summary;
        let dob = data.dob;
        let gender = data.gender;
        let maritalStatus = data.maritalStatus;
        let nationality = data.nationality;
        let cnic = Number(data.cnic);
        let career = data.career;
        let experience = Number(data.experience);
        let city = data.city;
        let area = data.area;
        let expectedSalary = data.expectedSalary;

        let basicInfoData = {
            name,
            email,
            phone,
            summary,
            dob,
            gender,
            maritalStatus,
            nationality,
            cnic,
            career,
            experience,
            city,
            area,
            expectedSalary
        };
        console.log(basicInfoData);
        console.log(data);

        return this.http.post<any>(`${this.host}/api/user/profile/create`, basicInfoData);
    }

    educationForm(data: any) {
        let degreeTitle = data.degreeTitle;
        let fieldOfStudy = data.fieldOfStudy;
        let location = data.location;
        let institute = data.institute;
        let completionYear = Number(data.completionYear);
        let gpa = Number(data.gpa);

        let educationData = {
            degreeTitle,
            fieldOfStudy,
            location,
            institute,
            completionYear,
            gpa
        }
        console.log(educationData);
        console.log(data);

        return this.http.post<any>(`${this.host}/api/user/education/create`, educationData);
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
            checkbox
        }
        console.log(experienceData);
        return this.http.post<any>(`${this.host}/api/user/education/create`, experienceData);
    }

    projectsForm(data: any) {
        let projectsData = data;
        console.log(projectsData);
        console.log(data);

        return this.http.post<any>(`${this.host}/api/user/projects/create`, projectsData);
    }
    skillsForm(data: any) {
        var skillsData = data;
        console.log(skillsData);
        console.log(data);

        return this.http.post<any>(`${this.host}/api/user/skills/create`, skillsData);
    }
    languagesForm(data: any) {
        var languagesData = data;
        console.log(languagesData);
        console.log(data);

        return this.http.post<any>(`${this.host}/api/user/languages/create`, languagesData);
    }
    resumeForm() {
        return this.http.get<any>(`${this.host}/api/auth/signin`);
    }

    logoutForm() {
    }
}
