import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from '../../../../config/config';
import userToken from "../../../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class CandidatesService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    findAllCandidatesData() {
        return this.http.get<any>(`${this.host}/api/admin/user/profile/getAll`, this.httpOptions);
    }

    // deleteCandidate(id: number) {
    //     // return this.http.delete<any>(`${this.host}/api/employer/profile/delete?id=${id}`, this.httpOptions);
    //     return this.http.get<any>(`${this.host}/api/user/profile/getAll`, this.httpOptions);
    // }
}
