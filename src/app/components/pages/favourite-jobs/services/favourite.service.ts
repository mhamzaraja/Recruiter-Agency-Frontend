import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import config from '../../../config/config';
import userToken from "../../../config/userToken";
@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  host: string = config.host;
  token: any = userToken.token;
  userId:number = userToken.id;


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

  findAllFavJobs(userId: number){
    userId=this.userId    
    return this.http.get<any>(`${this.host}/api/jobs/list/getAllFavaouriteJobs?userId=${userId}`, this.httpOptions)

  }
  deleteFavJobs(i:number){
    
    let id = i;
    console.log("deleeee", id);

    return this.http.get<any>(`${this.host}/api/job/favaourite/delete?id=${id}`, this.httpOptions)
  }
  
}
