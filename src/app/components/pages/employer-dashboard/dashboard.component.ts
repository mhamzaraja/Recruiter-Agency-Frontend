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
export class EmploerDashboardComponent implements OnInit {

    public jobPostInfo = [];
    public companyInfo: any;
    public UserInfo: any;
    public lastCompany: any;
    submitted: boolean = false;
    jobsPosted: number;

    proejctForm: FormGroup;

    response: any;
    public placeholder: string = '';

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private dashboardService: DashboardService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getAllCompanysData();
        this.getAllJobsData();
        this.getUserData();
    }

    get fprj(): { [key: string]: AbstractControl } {
        return this.proejctForm.controls;
    }

    getAllJobsData() {
        this.dashboardService.findAllJobs().subscribe(
            (res) => {
                this.jobPostInfo = res.data;
                this.jobsPosted = this.jobPostInfo.length;
            },
            (error) => {
                this.toastr.error(error.error.message);
            });
    }

    getAllCompanysData() {
        this.dashboardService.findAllCompanys().subscribe(
            (res) => {
                this.companyInfo = res.data;
                this.lastCompany = res.data.reverse()[0];
            },
            (error) => {
                this.toastr.error(error.error.message);
            });
    }

    getUserData() {
        this.dashboardService.findEmployerData().subscribe(
            (res) => {
                this.UserInfo = res.data[0];
            },
            (error) => {
                this.toastr.error(error.error.message);
            });
    }
}
