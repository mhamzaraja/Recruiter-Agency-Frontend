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
    //             if(error.status == 401) this.router.navigate(['/login']);
    // this.toastr.error(error.error.message);
    //         });
    // }

    getCandidatesOfJob() {
        this.jobsApplicationsService.findCandidatesOfJob(this.jobId).subscribe(
            (res) => {
                this.applicationInfo = res.data;
                // job title
                this.jobTitle = this.applicationInfo[0].post_a_job.job_title;

                // candidate profile
                this.candidateProfile = this.applicationInfo[0].candidate_profile;
                this.candCount = this.candidateProfile.length;
            },
            (error) => {
                if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    deleteAppl(i: number) {
        // this.eduId = this.educationInfo[i].id;
        // this.educationService.deleteEducation(this.eduId).subscribe(
        //     (res) => {
        //         if (res.success == true) {
        //             this.toastr.success(res.message);
        //             this.getAllEducations()
        //         } else {
        //             this.toastr.error(res.error.message);
        //         }
        //     });
    }
    approveAppl(i: number) {
        // this.jobsApplicationsService.updateEducation(data, this.eduId).subscribe(
        //     (res) => {
        //         if (res.success == true) {
        //             this.toastr.success(res.message);
        //             this.getCandidatesOfJob()
        //         } else {
        //             this.toastr.error(res.error.message);
        //         }
        //     });
    }

}
