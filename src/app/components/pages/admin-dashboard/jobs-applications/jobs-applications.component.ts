import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobsApplicationsService } from "./services/jobs-applications.service";
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-jobs-applications',
    templateUrl: './jobs-applications.component.html',
    styleUrls: ['./jobs-applications.component.scss']
})
export class JobsApplicationsComponent implements OnInit {

    jobId: number = this.route.snapshot.params.id;
    applicationInfo = [];
    jobTitle = [];
    candidateProfile = [];
    candCount: number;

    constructor(private route: ActivatedRoute,
        private jobsApplicationsService: JobsApplicationsService,
        private toastr: ToastrService
        ) { }

    ngOnInit(): void {
        this.getCandidatesOfJob();
    }

    // getJobDataById(){
    //     this.jobsApplicationsService.findJobDataById(this.jobId).subscribe(
    //         (res) => {
    //             this.jobTitle = res.data.job_title;
    //         },
    //         (error) => {
    //             this.toastr.error(error.error.message);
    //         });
    // }

    getCandidatesOfJob(){
        this.jobsApplicationsService.findCandidatesOfJob(this.jobId).subscribe(
            (res) => {
                this.applicationInfo = res.data;
                // job title
                this.jobTitle = this.applicationInfo[0].post_a_job.job_title;

                // candidate profile
                this.candidateProfile = this.applicationInfo[0].candidate_profile;
                this.candCount = this.candidateProfile.length;

                console.log("profile: ", this.applicationInfo.length);

            },
            (error) => {
                this.toastr.error(error.error.message);
            });
    }

}
