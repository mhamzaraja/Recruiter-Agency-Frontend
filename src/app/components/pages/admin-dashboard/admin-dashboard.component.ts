import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from './services/admin-dashboard.service';
import userToken from "../../config/userToken";

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

    id: string = userToken.id;

    constructor(private adminDashboardService: AdminDashboardService) { }

    ngOnInit(): void {
    }

    onLogout(event: Event) {
        event.preventDefault();
        this.adminDashboardService.logout();
    }
}
