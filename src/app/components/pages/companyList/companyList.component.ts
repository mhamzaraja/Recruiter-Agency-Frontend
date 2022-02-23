import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from "@angular/router";


@Component({
    selector: 'app-companyList',
    templateUrl: './companyList.component.html',
    styleUrls: ['./companyList.component.scss']
})
export class CompanyListComponent implements OnInit {
    submitted: boolean = false;
    basicInfoForm: FormGroup;

    response: any;

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
    ) { }

    ngOnInit(): void {
        this.basicInfoForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            mobile_number: [null, [Validators.required]],
            summary: [null, [Validators.required,]],
            dob: [null, [Validators.required,]],
            gender: ["", [Validators.required]],
            marital_status: [null, [Validators.required,]],
            nationality: [null, [Validators.required,]],
            cnic: [null, [Validators.required,]],
            career_level: ["", [Validators.required]],
            experience: ["", [Validators.required]],
            city: [null, [Validators.required,]],
            area: [null, [Validators.required,]],
            expected_salary: [null, [Validators.required,]]

        });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.basicInfoForm.controls;
    }




}
