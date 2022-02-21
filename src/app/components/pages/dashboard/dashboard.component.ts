import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { DashboardService } from './services/dashboard.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    submitted: boolean = false;
    submittedPrj: boolean = false;

    proejctForm: FormGroup;

    public projectsInfo = [];

    response: any;
    public placeholder: string = '';

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private dashboardService: DashboardService,
        private router: Router
    ) { }

    ngOnInit(): void {

        this.proejctForm = this.formBuilder.group({
            projectName: [null, [Validators.required]],
            projectUrl: [null, [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
            checkbox: false,
            associated: ["", [Validators.required]],
            descPrj: [null, [Validators.required]],
        })

        this.proejctForm.get('checkbox').valueChanges.subscribe(value => {
            value ? this.proejctForm.get('endDate').disable() : this.proejctForm.get('endDate').enable();
        })
    }

    get fprj(): { [key: string]: AbstractControl } {
        return this.proejctForm.controls;
    }

    projectInfoForm() {
        this.submittedPrj = true;
        if (this.proejctForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {

            this.submitted = false;
        }
    }
}
