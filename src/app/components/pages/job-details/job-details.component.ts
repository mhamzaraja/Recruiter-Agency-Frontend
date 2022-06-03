import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobDetailsService } from "./services/job-details.service";
import userToken from "../../config/userToken";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleInterviewService } from './services/schedule-interview.service';
import cities from '../../data/data';


@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit {
    jobId: number = this.route.snapshot.params.id;
    userId: string = userToken.id;
    role: string = userToken.role;

    public jobPostsInfo: any;
    public applicationInfo = [];      // from user application
    public objLength: number;

    public applied: number;
    isEmp: boolean = false;
    isCand: boolean = false;

    counter = 0;

    closeResult = 'Pending';

    data: string = "Under Review";

    scheduleInterview: FormGroup;
    submittedSch: boolean = false;
    city = cities.cities;

    time = { hour: 13, minute: 30 };
    meridian = true;
    timeString: string;

    constructor(
        private jobDetailsService: JobDetailsService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private scheduleInterviewService: ScheduleInterviewService
    ) { }

    ngOnInit(): void {
        this.scheduleInterview = this.formBuilder.group({

            date: [null, [Validators.required]],
            timeField: [null, [Validators.required]],
            address: [null, [Validators.required]],
            city: [null, [Validators.required]],
            comments: [null, [Validators.required]],
            status: ["Requested"],
            // comments: ["", [Validators.required]],
        });

        this.isEmployer();
        this.isCandidate();
        if (this.isEmp === true) this.getApplicationById();
        this.getJobById();
    }

    get fsch(): { [key: string]: AbstractControl } {
        return this.scheduleInterview.controls;
    }

    toggleMeridian() {
        this.meridian = !this.meridian;
    }

    ontimeChange(value: { hour: string, minute: string }) {
        this.timeString = `${value.hour}:${value.minute}`;
        this.scheduleInterview.controls.timeField.setValue(this.timeString + " (PST)");
    }

    openTime(content) {
        this.modalService.open(content);
    }

    openSchedule(content) {
        this.modalService.open(content);
    }

    // private getDismissReason(reason: any): string {
    //     if (reason === ModalDismissReasons.ESC) {
    //         return 'by pressing ESC';
    //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //         return 'by clicking on a backdrop';
    //     } else {
    //         return `with: ${reason}`;
    //     }
    // }

    scheduleInterForm() {
        this.submittedSch = true;
        if (this.scheduleInterview.invalid) {
            this.toastr.error("Please fill form correctly!");
        }
        else {
            this.modalService.dismissAll();
            this.closeResult = "Scheduled";

            this.scheduleInterviewService.scheduleInterview(this.scheduleInterview.value, this.jobId).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                },
                (error) => {
                    this.toastr.error(error.error.message);
                });
            this.submittedSch = false;
        }
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
                //if (error.status == 401) this.router.navigate(['/login']);
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
                    // console.log(error.error.created);
                } else {
                    //if (error.status == 401) this.router.navigate(['/login']);
                    this.toastr.error(error.error.message);
                }
            });
    }

    getApplicationById() {
        let applicationData = [];
        this.jobDetailsService.findApplicationById(this.jobId).subscribe(
            (res) => {
                this.applicationInfo = res.data.filter(
                    (x) => x.application_status === "Approved" &&
                    x.post_a_job.employerId === this.userId);
                    this.applied = this.applicationInfo.length;

                    console.log("inter: ", this.applicationInfo)
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
                if (error.status == 403) this.toastr.info("403!");
                if (error.status == 500) {
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

    schedule(i: number) {

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

    isEmployer() {
        if (this.role === "ROLE_EMPLOYER") this.isEmp = true;
    }

    isCandidate() {
        if (this.role === "ROLE_CANDIDATE") this.isCand = true;
    }
}
