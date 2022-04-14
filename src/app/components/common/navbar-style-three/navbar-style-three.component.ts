import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import userToken from "../../config/userToken";


@Component({
    selector: 'app-navbar-style-three',
    templateUrl: './navbar-style-three.component.html',
    styleUrls: ['./navbar-style-three.component.scss']
})
export class NavbarStyleThreeComponent implements OnInit {
    token: any = userToken.token;
    isToken: boolean = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.getToken();
    }

    getToken() {
        if (this.token) this.isToken = true;
    }

    onLogout(event: Event) {
        event.preventDefault();
        localStorage.removeItem('userToken');
        this.router.navigate(['/login']);
    }

}
