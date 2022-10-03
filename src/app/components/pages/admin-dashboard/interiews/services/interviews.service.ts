import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../config/config';
import userToken from "../../../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class InterviewsService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    findAllInterviewsData() {
        return this.http.get<any>(`${this.host}/api/job/interview/getAll`, this.httpOptions);
    }
}
