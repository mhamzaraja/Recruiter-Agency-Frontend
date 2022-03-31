import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { DashboardService } from './services/dashboard.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    candidateInfo = [];
    userId: number;
    name: string;

    public placeholder: string = '';

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private dashboardService: DashboardService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getUser();
    }

    getUser() {
        this.dashboardService.findUsers().subscribe(
            (res) => {
                this.candidateInfo = res.data[0].profile;
                this.userId = this.candidateInfo[0].userId;
                this.name = this.candidateInfo[0].name;
            },
            (error) => {
                if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    onLogout(event: Event){
        event.preventDefault();
        this.dashboardService.logout();
    }
}
