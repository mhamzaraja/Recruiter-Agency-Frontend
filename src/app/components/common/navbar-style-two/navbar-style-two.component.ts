import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import userToken from "../../config/userToken";
import { NavbarService } from '../services/navbar.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar-style-two',
    templateUrl: './navbar-style-two.component.html',
    styleUrls: ['./navbar-style-two.component.scss']
})
export class NavbarStyleTwoComponent implements OnInit {

    token: any = userToken.token;
    isToken: boolean = false;
    userId: number = userToken.id;

    constructor(private navbarService: NavbarService,
        private toastr: ToastrService,
        private router: Router
        ) { }

    ngOnInit(): void {
        this.getToken()
    }

    getToken() {
        if (this.token) this.isToken = true;
    }

    onLogout(event: Event) {
        event.preventDefault();
        this.navbarService.logout().subscribe(
            (res) => {
                window.location.reload();
                this.router.navigate(['/']);
                this.toastr.success(res.message);
            },
            (error) => {
                this.toastr.error(error.error.message);
            }
        )
    }
}
