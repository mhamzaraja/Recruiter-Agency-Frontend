import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { EmployerBasicInfoService } from './services/employer-basic-info.service'
import { Router } from "@angular/router";

@Component({
    selector: 'app-employer-basic-info',
    templateUrl: './employer-basic-info.component.html',
    styleUrls: ['./employer-basic-info.component.scss']
})
export class EmployerBasicInfoComponent implements OnInit {
    submitted: boolean = false;
    employerForm: FormGroup;
    public employerInfo: any;

    compId: number = null;

    constructor(private formBuilder: FormBuilder,
        private employerBasicInfoService: EmployerBasicInfoService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.employerForm = this.formBuilder.group({
            full_name: [null, [Validators.required]],
            job_designation: [null, [Validators.required]],
            gender: ["", [Validators.required]],
            dob: ["", [Validators.required]],
            office_number: ["", [Validators.required]],
            mobile_number: [null, [Validators.required]],
            avatar: [""]
        });

        this.getEmployerData();
    }

    get femp(): { [key: string]: AbstractControl } {
        return this.employerForm.controls;
    }

    employerInfoForm() {
        this.submitted = true;
        if (this.employerForm.invalid) {
            this.toastr.error("this.response.message");
        }
        else {
            this.employerBasicInfoService.employerForm(this.employerForm.value).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                },
                (error) => {
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    getEmployerData() {
        this.employerBasicInfoService.findEmployerData().subscribe(
            (res) => {
                this.employerInfo = res.data;
            },
            (error) => {
                this.toastr.error(error.error.message);
            });
    }


    // editEmp() {
    //     this.employerForm.controls.full_name.setValue(this.employerInfo.full_name);
    //     this.employerForm.controls.job_designation.setValue(this.employerInfo.job_designation);
    //     this.employerForm.controls.gender.setValue(this.employerInfo.gender);
    //     this.employerForm.controls.dob.setValue(this.employerInfo.dob);
    //     this.employerForm.controls.office_number.setValue(this.employerInfo.office_number);
    //     this.employerForm.controls.mobile_number.setValue(this.employerInfo.mobile_number);
    // }

}
