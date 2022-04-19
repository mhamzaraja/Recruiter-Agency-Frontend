import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobDetailsService } from "./services/job-details.service";
import userToken from "../../config/userToken";

@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
    jobId: number = this.route.snapshot.params.id;
    role: string = userToken.role;

    public jobPostsInfo: any;
    public applicationInfo: any;      // from user application
    public objLength: number;

    public applied: number;
    isEmp: boolean = false;

    counter = 0;

    data: string = "Under Review";

    constructor(
        private jobDetailsService: JobDetailsService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.verify();
        if(this.isEmp === true) this.getApplicationById();
        this.getJobById();
    }

    getJobById() {
        this.jobDetailsService.findJobById(this.jobId).subscribe(
            (res) => {
                this.jobPostsInfo = res.data;
                if (this.jobPostsInfo != null && this.jobPostsInfo != undefined) {
                    this.objLength = Object.keys(this.jobPostsInfo).length;
                } else {
                    this.objLength = 0;
                }
            },
            (error) => {
                if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    jobApplication() {
        this.jobDetailsService.applicationForm(this.data, this.jobId).subscribe(
            (res) => {
                this.toastr.success(res.message);
            },
            (error) => {
                if (!error.error.created) {
                    this.toastr.warning(error.error.message);
                    console.log(error.error.created);
                } else {
                    if (error.status == 401) this.router.navigate(['/login']);
                    this.toastr.error(error.error.message);
                }
            });
    }

    getApplicationById() {
        let applicationData = [];
        this.jobDetailsService.findApplicationById(this.jobId).subscribe(
            (res) => {
                this.applicationInfo = res.data.filter((x)=> x.application_status === "Approved");

                console.log("Application info: ", this.applicationInfo);
                // this.applied = applicationData.length;
                // for(var i in applicationData){
                //     if (applicationData[i].application_status == "Approved") {
                //         this.applicationInfo = applicationData[i];
                //     }
                //     // console.log("Application data: ", applicationData[i]);
                // }
            },
            (error) => {
                if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
                if (error.status == 403) this.toastr.info("403!");
                if (error.status == 500){
                    this.toastr.info("No candidate has applied on this job yet!");
                    this.applied = 0;
                }
            });
    }

    // approve(i: number) {
    //     let data = this.applicationInfo[i];
    //     let id = this.applicationInfo[i].id;

    //     this.jobDetailsService.updateStatus(id, data).subscribe(
    //         (res) => {
    //             if (res.success == true) {
    //                 this.toastr.success(res.message);
    //                 this.getApplicationById()

    //             } else {
    //                 this.toastr.error(res.error.message);
    //             }
    //         });
    // }

    schedule(i: number){

    }

    reject(i: number) {
        let data = this.applicationInfo[i];
        let id = this.applicationInfo[i].id;

        this.jobDetailsService.rejectStatus(id, data).subscribe(
            (res) => {
                if (res.success == true) {
                    this.toastr.success(res.message);
                    this.getApplicationById()

                } else {
                    this.toastr.error(res.error.message);
                }
            });
    }

    verify(){
        if(this.role === "ROLE_EMPLOYER") this.isEmp = true;
    }
}
