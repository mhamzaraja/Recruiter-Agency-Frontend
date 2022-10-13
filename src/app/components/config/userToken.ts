import { HttpClient, HttpHeaders } from '@angular/common/http';
export default {
    token: JSON.parse(localStorage.getItem('userToken'))?.token,
    role: JSON.parse(localStorage.getItem('userToken'))?.roles[0],
    id : JSON.parse(localStorage.getItem('userToken'))?.id,
    CandID: JSON.parse(localStorage.getItem('candID'))?.ProfID,
    httpOptions: {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Headers': 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('userToken'))?.token,
          'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
          'Allow': 'GET, POST, OPTIONS, PUT, DELETE'
        })
      }
};
