import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from './services/admin-dashboard.service';
import userToken from "../../config/userToken";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

    id: string = userToken.id;

    constructor(private adminDashboardService: AdminDashboardService,
        private toastr: ToastrService
        ) { }

    ngOnInit(): void {
    }

    onLogout(event: Event) {
        event.preventDefault();
        this.adminDashboardService.logout().subscribe(
            (res) => {
                this.toastr.success(res.message);
            },
            (error) => {
                this.toastr.error(error.error.message);
            }
        )
    }
}
