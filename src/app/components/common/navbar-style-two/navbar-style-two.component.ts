import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import userToken from "../../config/userToken";

@Component({
    selector: 'app-navbar-style-two',
    templateUrl: './navbar-style-two.component.html',
    styleUrls: ['./navbar-style-two.component.scss']
})
export class NavbarStyleTwoComponent implements OnInit {

    token: any = userToken.token;
    isToken: boolean = false;

    constructor(private router: Router) { }

    ngOnInit(): void {
        this.getToken()
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
