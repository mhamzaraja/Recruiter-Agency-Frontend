import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { DashboardService } from './services/dashboard.service';
import { Router } from "@angular/router";
import userToken from "../../config/userToken";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    candidateInfo = [];
    userId: number = userToken.id;
    name: string;
    designation: string;

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
                this.candidateInfo = res.data;

                if (this.candidateInfo[0].profile.length > 0) {
                    this.name = this.candidateInfo[0].profile[0].name;
                } else{
                    this.name = "User";
                }

                if (this.candidateInfo[2].experience.length > 0) {
                    this.designation = this.candidateInfo[2].experience.reverse()[0].jobTitle;
                } else{
                    this.designation = "Job Designation";
                }
            },
            (error) => {
                if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    onLogout(event: Event) {
        event.preventDefault();
        this.dashboardService.logout().subscribe(
            (res) => {
                this.toastr.success(res.message);
            },
            (error) => {
                this.toastr.error(error.error.message);
            }
        )
    }
}
