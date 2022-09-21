import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import config from '../../../config/config';
import userToken from "../../../config/userToken";
import { data } from 'jquery';

@Injectable({
    providedIn: 'root'
})
export class JobsService {
    host: string = config.host;
    token: any = userToken.token;
    userId: number = userToken.id;
    jobId: number;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    findAllJobs(p: number) {
        let page = p;
        return this.http.get<any>(`${this.host}/api/jobs/list/getAll?page=${page}&userId=${this.userId}`, this.httpOptions);
    }
    searchJobs(data: any,) {
        let searchData = {
            ...data,
        }
        return this.http.post<any>(`${this.host}/api/jobs/list/search`, searchData, this.httpOptions);
    }
    favouriteJobs(data: any) {
        let body = {
            userId: this.userId,
            jobId: data
        };
        return this.http.post<any>(`${this.host}/api/job/favaourite/create`, body, this.httpOptions);
    }

    deleteFavJobs(candidateFavjobId: any) {

        let id = candidateFavjobId;
        return this.http.get<any>(`${this.host}/api/job/favaourite/delete?id=${id}`, this.httpOptions)
    }

    findAllFavJobs(userId: number) {
        userId = this.userId
        return this.http.get<any>(`${this.host}/api/jobs/list/getAllFavaouriteJobs?userId=${userId}`, this.httpOptions)

    }
}
