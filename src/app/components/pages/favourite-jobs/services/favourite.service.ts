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
  userId: number = userToken.id;
  httpOptions = userToken.httpOptions;

  constructor(private http: HttpClient) { }

  findAllFavJobs(userId: number) {
    userId = this.userId
    return this.http.get<any>(`${this.host}/api/jobs/list/getAllFavaouriteJobs?userId=${userId}`, this.httpOptions)

  }
  deleteFavJobs(i: number) {

    let id = i;
    return this.http.get<any>(`${this.host}/api/job/favaourite/delete?id=${id}`, this.httpOptions)
  }

}
