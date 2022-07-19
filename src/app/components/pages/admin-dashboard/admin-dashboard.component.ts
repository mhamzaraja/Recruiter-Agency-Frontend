import { Component, OnDestroy, OnInit } from '@angular/core';
import { AdminDashboardService } from './services/admin-dashboard.service';
import userToken from "../../config/userToken";
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit , OnDestroy {

    id: string = userToken.id;
    logoutSubs : Subscription;

    constructor(private adminDashboardService: AdminDashboardService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
    }

    onLogout(event: Event) {
        event.preventDefault();
        this.logoutSubs = this.adminDashboardService.logout().subscribe(
            (res) => {
                console.log("asas");
                this.toastr.success(res.message);
            },
            (error) => {
                this.toastr.error(error.error.message);
            }
        )
    }
    ngOnDestroy() {
        // if(this.adminDashboardService) this.logoutSubs.unsubscribe();
        // console.log("unsubing");
    }
}
