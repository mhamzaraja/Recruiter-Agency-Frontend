import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

    className: string = "span-two two";

    constructor(private route: ActivatedRoute,
        private jobsApplicationsService: JobsApplicationsService,
        private toastr: ToastrService,
        private router: Router
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
    //             //if (error.status == 401) this.router.navigate(['/login']);
    // this.toastr.error(error.error.message);
    //         });
    // }

    getCandidatesOfJob() {
        this.jobsApplicationsService.findCandidatesData(this.jobId).subscribe(
            (res) => {
                this.applicationInfo = res.data;

                // job title
                this.jobTitle = this.applicationInfo[0].post_a_job.job_title;

                // candidate profile
                this.candidateProfile = this.applicationInfo[0].candidate_profile;
                this.candCount = this.candidateProfile.length;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                if (error.status == 500){
                    this.toastr.info("No candidate has applied on this job yet!");
                }
            });
    }

    approve(i: number) {
        let data = this.applicationInfo[i];
        let id = this.applicationInfo[i].id;

        this.jobsApplicationsService.updateStatus(id, data).subscribe(
            (res) => {
                if (res.success == true) {
                    this.toastr.success(res.message);
                    this.getCandidatesOfJob()

                } else {
                    this.toastr.error(res.error.message);
                }
            });
    }

    reject(i: number) {
        let data = this.applicationInfo[i];
        let id = this.applicationInfo[i].id;

        this.jobsApplicationsService.rejectStatus(id, data).subscribe(
            (res) => {
                if (res.success == true) {
                    this.toastr.success(res.message);
                    this.getCandidatesOfJob()

                } else {
                    this.toastr.error(res.error.message);
                }
            });
    }

    // get appliStatus(): Status {
    //     if (this.status === "approved") {
    //       return Status.Approve
    //     }
    //     if (this.status === "Under Review") {
    //         return Status.Review
    //       }
    //     return null
    //   }

}

// export enum Status {
//     Approve,
//     Review
//   }
