import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-interiews',
    templateUrl: './interiews.component.html',
    styleUrls: ['./interiews.component.scss']
})
export class InteriewsComponent implements OnInit {

    scheduleInterview: FormGroup;
    submittedSch: boolean = false;

    time = { hour: 13, minute: 30 };
    meridian = true;
    timeString: string;

    constructor(private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private modalService: NgbModal,
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

}
