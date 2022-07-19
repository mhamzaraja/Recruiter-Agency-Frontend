import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { JobDetailsService } from "./services/job-details.service";
import userToken from "../../config/userToken";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ScheduleInterviewService } from './services/schedule-interview.service';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import cities from '../../data/data';
import { formatDate } from '@angular/common';


@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss']
})
export class JobDetailsComponent implements OnInit, OnDestroy {
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

    sTime = { hour: 13, minute: 30 };
    eTime = { hour: 13, minute: 30 };
    meridian = true;
    timeString: string;

    hoveredDate: NgbDate | null = null;

    fromDate: NgbDate | null;
    toDate: NgbDate | null;

    convStrDatetime;
    convEndDatetime;

    constructor(
        private jobDetailsService: JobDetailsService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private scheduleInterviewService: ScheduleInterviewService,

        private calendar: NgbCalendar, public formatter: NgbDateParserFormatter) {
        this.fromDate = calendar.getToday();
        this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    }

    ngOnInit(): void {
        this.scheduleInterview = this.formBuilder.group({

            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
            startTime: [null, [Validators.required]],
            endTime: [null, [Validators.required]],
            location: [null, [Validators.required]],
            city: [null, [Validators.required]],
            comments: [null, [Validators.required]],
            status: ["Requested"],
            userTimezone: [null, [Validators.required]],
            utcTimezone: [null, [Validators.required]]

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

    onSTimeChange(value: { hour: string, minute: string }) {
        let stringDate = this.dateTimeConverter(value.hour, value.minute);

        this.convStrDatetime = this.caliTimeCnv(stringDate);

        console.log( "str... ",this.convStrDatetime);

        let timeStr = moment(stringDate).format("hh:mm a");
        this.scheduleInterview.controls.startTime.setValue(timeStr);
    }

    onETimeChange(value: { hour: string, minute: string }) {
        let stringDate = this.dateTimeConverter(value.hour, value.minute);

        this.convEndDatetime = this.caliTimeCnv(stringDate);
        console.log("end: ", this.convEndDatetime );

        let timeStr = moment(stringDate).format("hh:mm a");
        this.scheduleInterview.controls.endTime.setValue(timeStr);
    }

    caliTimeCnv(dateStr){
        let convertor = dateStr.toLocaleString(
            "en-US",
            {
                timeZone: "America/Los_Angeles",
                timeZoneName: "long",
                hour12: true,
                weekday: 'short', year: 'numeric', month: 'short', day: '2-digit',
                hour: '2-digit', minute: '2-digit'
            });
        return convertor;
    }

    dateTimeConverter(hour: string, minute: string) {
        let mm = String(this.fromDate.month);
        let dd = String(this.fromDate.day);
        let hh = String(hour);
        let min = String(minute);

        if (this.fromDate.month.toString().length == 1) mm = "0" + this.fromDate.month;

        if (this.fromDate.day.toString().length == 1) dd = "0" + this.fromDate.day;

        if (hour.toString().length == 1) hh = "0" + hour;
        if (minute.toString().length == 1) min = "0" + hour;

        let stringDate = new Date(`${this.fromDate.year}-${mm}-${dd}T${hh}:${min}:00`);

        return stringDate;

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

    //date picker

    onDateSelection(date: NgbDate) {
        if (!this.fromDate && !this.toDate) {
            this.fromDate = date;
        } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
            this.toDate = date;
        } else {
            this.toDate = null;
            this.fromDate = date;
        }
    }

    isHovered(date: NgbDate) {
        return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) &&
            date.before(this.hoveredDate);
    }

    isInside(date: NgbDate) { return this.toDate && date.after(this.fromDate) && date.before(this.toDate); }

    isRange(date: NgbDate) {
        return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) ||
            this.isHovered(date);
    }

    validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
        const parsed = this.formatter.parse(input);
        return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
    }

    ngOnDestroy(): void {

    }
}
