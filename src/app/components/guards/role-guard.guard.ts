import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import userToken from "../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {

    constructor(private authService: AuthService,
        private router: Router
        ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        let roleMatch = this.authService.isAuthorized(route);

        if(!roleMatch)  return this.authService.navigateToDash();
        return this.authService.isAuthorized(route);
    }

}
