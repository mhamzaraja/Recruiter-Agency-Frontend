import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class LoggedinGuard implements CanActivate {
  constructor(private authservice: AuthService, private router:Router){}
  canActivate(): any{
    if(this.authservice.loggedin()){
      //if user is logged in and try to access the login or register component, he will redirect to home screen
      return this.authservice.navigateToDash();
      // return false
    }else{
      return true
    }
  }
  
}
