import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobsService } from "./services/jobs.service";

@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss', '../admin-dashboard.component.scss']
})
export class JobsComponent implements OnInit {
    jobsInfo = [];
    employersInfo = [];
    employer_name = [];


    constructor(private jobsService: JobsService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getAllJobsData();
    }

    getAllJobsData() {
        let eId: number;
        this.jobsService.findAllJobsData().subscribe(
            (res) => {
                this.jobsInfo = res.data;

                for (let keys in this.jobsInfo) {
                    eId = this.jobsInfo[keys].employerId;
                    this.getAllEmployersData(eId);
                }
            },
            (error) => {
                if(error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    getAllEmployersData(eId: number) {
        this.jobsService.findAllEmployersData().subscribe(
            (res) => {
                this.employersInfo = res.data;

                for (let keys in this.employersInfo) {
                    if (this.employersInfo[keys].employerId == eId) {
                        this.employer_name = this.employersInfo[keys].full_name;
                    } else {
                        this.employer_name = ["Job Is not associated with any employer"];
                    }
                }
            },
            (error) => {
                if(error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    delJob(i: number) {
        let jobId = this.jobsInfo[i].id;
        this.jobsService.deleteJob(jobId).subscribe(
            (res) => {
                this.toastr.success(res.message);
                this.getAllJobsData();
            },
            (error) => {
                if(error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

}
