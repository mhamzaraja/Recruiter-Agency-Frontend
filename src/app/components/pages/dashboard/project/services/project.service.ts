import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import config from '../../../../config/config';
import userToken from "../../../../config/userToken";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

    host: string = config.host;
    token: any = userToken.token;
    userId: string = userToken.id;

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

  findAllProjects(){
    return this.http.get<any>(`${this.host}/api/user/projects/getAll`, this.httpOptions);
  }

  updateProject(data: any, id: number){
      data.currently_ongoing = Boolean(data.currently_ongoing);

      let projectData = {
          ...data,
          userId: this.userId
        }
        return this.http.put<any>(`${this.host}/api/user/projects/update?id=${id}`, projectData, this.httpOptions);
    }

    projectForm(data: any){
      data.currently_ongoing = Boolean(data.currently_ongoing);

      let projectData = {
          ...data,
          userId: this.userId
        }
        return this.http.post<any>(`${this.host}/api/user/projects/create`, projectData, this.httpOptions);
    }

    deleteProject(id: number){
      return this.http.delete<any>(`${this.host}/api/user/projects/delete?id=${id}`, this.httpOptions);
    }
}
