import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { DashboardService } from './services/dashboard.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class EmploerDashboardComponent implements OnInit, OnDestroy {

    public jobPostInfo = [];
    public empInformation: any;
    public companyInfo: any;
    public lastCompany: any;
    submitted: boolean = false;
    jobsPosted: number;
    empId: number;
    jobId: number;
    proejctForm: FormGroup;
    userId: number;
    response: any;
    public placeholder: string = '';
    jobCounts = [];
    p: number = 1;

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private dashboardService: DashboardService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getAllCompanysData();
        this.getAllJobsData();
        this.getEmployeData();
    }

    get fprj(): { [key: string]: AbstractControl } {
        return this.proejctForm.controls;
    }

    getAllJobsData() {
        this.dashboardService.findAllJobs(this.p).subscribe(
            (res) => {
                this.jobPostInfo = res.data.jobsList;
                this.jobCounts = res.data.jobsCount;
                console.log(this.jobPostInfo);
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
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
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    getEmployeData() {
        this.dashboardService.findEmployerData().subscribe(
            (res) => {
                this.empInformation = res.data;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    getpage(page: number) {
        this.p = page
        this.dashboardService.findAllJobs(this.p).subscribe((res) => {
            this.jobPostInfo = res.data.jobsList;
            this.jobCounts = res.data.jobsCount;
        })
    }

    ngOnDestroy(): void {

    }
}
