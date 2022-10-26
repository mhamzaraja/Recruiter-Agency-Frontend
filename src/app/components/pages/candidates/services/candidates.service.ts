import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import config from '../../../config/config';
import userToken from "../../../config/userToken";

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {
  host: string = config.host;
  token: any = userToken.token;
  userId: string = userToken.id;
  httpOptions = userToken.httpOptions;

  constructor(private http: HttpClient) { }

  getAllCandidates() {
    return this.http.get<any>(`${this.host}/api/admin/user/profile/getAll`, this.httpOptions);
  }

  // Delete Candidates Profile
  async deleteCandidate(id: number) {
    let profileId = JSON.parse(await localStorage.getItem('candID'))?.ProfID;
    return this.http.delete<any>(`${this.host}/api/user/profile/delete?id=${id}&userId=${profileId}`, this.httpOptions);
  }
}

