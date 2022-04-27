import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { InterviewsService } from './services/interviews.service';

@Component({
    selector: 'app-interiews',
    templateUrl: './interiews.component.html',
    styleUrls: ['./interiews.component.scss']
})
export class InteriewsComponent implements OnInit {

    scheduleInterview: FormGroup;
    submittedSch: boolean = false;
    interviewInfo = [];

    time = { hour: 13, minute: 30 };
    meridian = true;
    timeString: string;

    constructor(private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
        private interviewsService: InterviewsService
    ) { }

    ngOnInit(): void {
        this.scheduleInterview = this.formBuilder.group({

            date: [null, [Validators.required]],
            timeField: [null, [Validators.required]],
            // address: [null, [Validators.required]],
            // city: [null, [Validators.required]],
            // comments: [null, [Validators.required]],
            // status: ["Approved"],
            // comments: ["", [Validators.required]],
        });

        this.getScheduleData();
    }

    get fsch(): { [key: string]: AbstractControl } {
        return this.scheduleInterview.controls;
    }

    adminSchedule(content) {
        this.modalService.open(content);
    }

    openTime(content) {
        this.modalService.open(content);
    }

    ontimeChange(value: { hour: string, minute: string }) {
        this.timeString = `${value.hour}:${value.minute}`;
        this.scheduleInterview.controls.timeField.setValue(this.timeString + " (PST)");
    }

    getScheduleData(){
        this.interviewsService.findAllInterviewsData().subscribe(
            (res) => {
                this.interviewInfo = res.data;

                console.log("interview data: ", this.interviewInfo );

                // for (let keys in this.employersInfo) {
                //     if (this.employersInfo[keys].employerId == eId) {
                //         this.employer_name = this.employersInfo[keys].full_name;
                //     } else {
                //         this.employer_name = ["Job Is not associated with any employer"];
                //     }
                // }
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

}
