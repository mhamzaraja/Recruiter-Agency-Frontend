import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from '../../../../config/config';
import userToken from "../../../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class ProfessionalsService {
    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;
    httpOptions = userToken.httpOptions;

    constructor(private http: HttpClient) { }

    findAllEmployersData() {
        return this.http.get<any>(`${this.host}/api/admin/employer/profile/getAll`, this.httpOptions);
    }

    // deleteEmployer(id: number){
    //     return this.http.delete<any>(`${this.host}/api/employer/profile/delete?id=${id}`, this.httpOptions);
    // }
}
