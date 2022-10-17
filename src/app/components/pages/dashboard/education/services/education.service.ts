import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../config/config';
import userToken from "../../../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class EducationService {
    host: string = config.host;
    token: any = userToken.token;
    profileId: string = userToken.CandID;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    //education form

    async findAllEducations() {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;

        return this.http.get<any>(`${this.host}/api/user/education/getAll?userId=${profileId}`, this.httpOptions);
    }

    findEducation(data: any, id: number) {
        return this.http.get<any>(`${this.host}/api/user/education/getOne?id=${id}`, this.httpOptions);
    }

    async educationForm(data: any) {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;

        data.completion_year = Number(data.completion_year);
        data.obtained_gpa = parseFloat(data.obtained_gpa);

        let educationData = {
            ...data,
            userId:profileId
        };
        return this.http.post<any>(`${this.host}/api/user/education/create`, educationData, this.httpOptions);
    }

    async updateEducation(data: any, id: number) {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        data.completion_year = Number(data.completion_year);
        data.obtained_gpa = parseFloat(data.obtained_gpa);

        let educationData = {
            ...data,
            userId: profileId
        };
        return this.http.put<any>(`${this.host}/api/user/education/update?userId=${profileId}&id=${id}`, educationData, this.httpOptions);
    }

    async deleteEducation(i: number) {
        let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        let id = i;
        return this.http.delete<any>(`${this.host}/api/user/education/delete?userId=${profileId}&id=${id}`, this.httpOptions);
    }

}
