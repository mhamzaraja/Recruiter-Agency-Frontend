import { Component, OnInit } from '@angular/core';
import { JobsService } from "./services/jobs.service";
import { ToastrService } from 'ngx-toastr';


@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

    public jobPostsInfo: any;

    constructor(
        private jobsService: JobsService,
        private toastr: ToastrService
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
                this.toastr.error(error.error.message);
            });
    }

}
