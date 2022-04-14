import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import userToken from "../../config/userToken";

@Component({
    selector: 'app-navbar-style-one',
    templateUrl: './navbar-style-one.component.html',
    styleUrls: ['./navbar-style-one.component.scss']
})
export class NavbarStyleOneComponent implements OnInit {
    token: any = userToken.token;
    isToken: boolean = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.getToken();
    }

    getToken(){
        if(this.token) this.isToken = true;
    }

    onLogout(event: Event) {
        event.preventDefault();
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
    }

}
