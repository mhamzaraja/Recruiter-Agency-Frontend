import { Component, OnInit } from '@angular/core';
import { JobsService } from "./services/jobs.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

    jobPostsInfo = [];

    constructor(
        private jobsService: JobsService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getAllJobs();
    }

    getAllJobs() {
        this.jobsService.findAllJobs().subscribe(
            (res) => {
                this.jobPostsInfo = res.data;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

}
