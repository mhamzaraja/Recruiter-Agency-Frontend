import { Component, OnInit } from '@angular/core';
import { AdminDashboardService } from './services/admin-dashboard.service';

@Component({
    selector: 'app-admin-dashboard',
    templateUrl: './admin-dashboard.component.html',
    styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit {

    constructor(private adminDashboardService: AdminDashboardService) { }

    ngOnInit(): void { }

    onLogout(event: Event) {
        event.preventDefault();
        this.adminDashboardService.logout();
    }
}
