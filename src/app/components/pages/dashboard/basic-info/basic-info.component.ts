import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasicInfoService } from './services/basic-info.service';
import { Router } from "@angular/router";


@Component({
    selector: 'app-basic-info',
    templateUrl: './basic-info.component.html',
    styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
    submitted: boolean = false;
    basicInfoForm: FormGroup;

    response: any;

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private basicInfoService: BasicInfoService
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

    baiscInfoForm() {
        this.submitted = true;
        if (this.basicInfoForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {
            this.basicInfoService.basicInfoForm(this.basicInfoForm.value).subscribe((res) => {
                this.toastr.success(res.message);
            },
                (error) => {
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }
    // getUser(){
    //     this.submitted = true;
    //     if (this.basicInfoForm.invalid) {
    //         this.toastr.error(this.response.message);
    //     }
    //     else {
    //         this.basicInfoService.findUser().subscribe((res) => {
    //             this.toastr.success(res.message);
    //         },
    //             (error) => {
    //                 this.toastr.error(error.error.message);
    //             });
    //         this.submitted = false;
    //     }
    // }


}
