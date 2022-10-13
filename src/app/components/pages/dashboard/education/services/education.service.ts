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
    userId: string = userToken.CandID;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    //education form

    async findAllEducations() {
        let userid = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
        
        return this.http.get<any>(`${this.host}/api/user/education/getAll?userId=${userid}`, this.httpOptions);
    }

    findEducation(data: any, id: number) {
        return this.http.get<any>(`${this.host}/api/user/education/getOne?id=${id}`, this.httpOptions);
    }

    educationForm(data: any) {
        data.completion_year = Number(data.completion_year);
        data.obtained_gpa = parseFloat(data.obtained_gpa);

        let educationData = {
            ...data,
            userId: this.userId
        };
        return this.http.post<any>(`${this.host}/api/user/education/create`, educationData, this.httpOptions);
    }

    updateEducation(data: any, id: number) {
    

        data.completion_year = Number(data.completion_year);
        data.obtained_gpa = parseFloat(data.obtained_gpa);

        let educationData = {
            ...data,
            userId: this.userId
        };


        return this.http.put<any>(`${this.host}/api/user/education/update?userId=${this.userId}&id=${id}`, educationData, this.httpOptions);
    }

    deleteEducation(i: number) {
        let id = i;
        return this.http.delete<any>(`${this.host}/api/user/education/delete?userId=${this.userId}&id=${id}`, this.httpOptions);
    }

}
