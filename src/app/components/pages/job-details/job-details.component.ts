import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobDetailsService } from "./services/job-details.service";

@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
    id: number = this.route.snapshot.params.id;

    public jobPostsInfo: any;
    public candidateInfo: any;      // from user application
    public objLength: number;
    public applied: boolean;

    counter = 0;

    data: string = "Under Review";

    constructor(
        private jobDetailsService: JobDetailsService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getApplicationById();
        this.getJobById();

    }

    getJobById() {
        this.jobDetailsService.findJobById(this.id).subscribe(
            (res) => {
                this.jobPostsInfo = res.data;
                if (this.jobPostsInfo != null && this.jobPostsInfo != undefined) {
                    this.objLength = Object.keys(this.jobPostsInfo).length;
                } else {
                    this.objLength = 0;
                }
            },
            (error) => {
                if(error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    jobApplication() {
        console.log("component: ", this.data, this.id);
        this.jobDetailsService.applicationForm(this.data, this.id).subscribe(
            (res) => {
                this.toastr.success(res.message);
            },
            (error) => {
                if(!error.error.created){
                    this.toastr.warning(error.error.message);
                    console.log(error.error.created);
                } else {
                    if(error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
                }
            });
    }

    getApplicationById() {
        this.jobDetailsService.findApplicationById(this.id).subscribe(
            (res) => {
                this.candidateInfo = res.data;
                if (!this.candidateInfo) {
                    console.log(this.candidateInfo);
                }else {
                    console.log(this.candidateInfo);
                }
            },
            (error) => {
                if(error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }
}
