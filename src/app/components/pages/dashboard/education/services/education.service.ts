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
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    //education form

    findAllEducations() {
        return this.http.get<any>(`${this.host}/api/user/education/getAll`, this.httpOptions);
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

    updateEducation(data: any, i: number) {
        let id = i;

        data.completion_year = Number(data.completion_year);
        data.obtained_gpa = parseFloat(data.obtained_gpa);

        let educationData = {
            ...data,
            userId: this.userId
        };


        return this.http.put<any>(`${this.host}/api/user/education/update?id=${id}`, educationData, this.httpOptions);
    }

    deleteEducation(i: number) {
        let id = i;
        return this.http.delete<any>(`${this.host}/api/user/education/delete?id=${id}`, this.httpOptions);
    }

}
