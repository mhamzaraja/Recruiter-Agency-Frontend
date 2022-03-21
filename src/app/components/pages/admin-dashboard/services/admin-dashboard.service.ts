import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AdminDashboardService {

    constructor(private router: Router) { }

    logout() {
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
    }

}
