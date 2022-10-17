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
  profileId: string = userToken.CandID;
  userId: string = userToken.id;
  httpOptions = userToken.httpOptions;



  constructor(private http: HttpClient) { }


  async findAllProjects(){
    let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
    
    return this.http.get<any>(`${this.host}/api/user/projects/getAll?userId=${profileId}`, this.httpOptions);
  }

  async updateProject(data: any, id: number){
    let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
      data.currently_ongoing = Boolean(data.currently_ongoing);

      let projectData = {
          ...data,
          userId: profileId
        }
        return this.http.put<any>(`${this.host}/api/user/projects/update?userId=${profileId}&id=${id}`, projectData, this.httpOptions);
  }


    async projectForm(data: any){
      let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
      data.currently_ongoing = Boolean(data.currently_ongoing);

      let projectData = {
          ...data,
          userId: profileId
        }
        return this.http.post<any>(`${this.host}/api/user/projects/create?userId=${profileId}`, projectData, this.httpOptions);
  }

    async deleteProject(id: number){
      let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
      return this.http.delete<any>(`${this.host}/api/user/projects/delete?userId=${profileId}&id=${id}`, this.httpOptions);
    }

}
