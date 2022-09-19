import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import userToken from "../../config/userToken";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    role: any = userToken.role;
    userId: any = userToken.id;
    token: any = userToken.token;
    // "ROLE_SUPER_USER", "ROLE_CANDIDATE", "ROLE_EMPLOYER"

    constructor(private router: Router) { }

    navigateToDash() {
        const userRole = (this.role === "ROLE_SUPER_USER") ? ("admin")
            : ((this.role === "ROLE_CANDIDATE") ? ("candidate")
                : (((this.role === "ROLE_EMPLOYER") ? ("employer")
                    : (null))))
        if (userRole !== null)  return this.router.navigate([`/${userRole}/dashboard`, this.userId])
        // if user is not logged in and try to access the dashboard or any authorized components, he will redirect to home screen
        return this.router.navigate(["/"]);
    }

    isAuthorized(route: ActivatedRouteSnapshot): boolean {
        const roles = [this.role];
        const expectedRoles = route.data.expectedRoles;
        let roleMatches = roles.findIndex(role => expectedRoles.indexOf(role) !== -1);
        return roleMatches < 0 ? false : true;
    }

    isloggedIn() {
        if (!this.token) return of(false).pipe(delay(300));
        return of(true).pipe();
    }

    loggedin(){
        if (this.token){
            return true
        }else{
            return false
        }
    }
}
