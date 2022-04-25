import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BasicInfoService } from './services/basic-info.service';

@Component({
    selector: 'app-basic-info',
    templateUrl: './basic-info.component.html',
    styleUrls: ['./basic-info.component.scss']
})
export class BasicInfoComponent implements OnInit {
    submitted: boolean = false;
    basicInfoForm: FormGroup;

    public basicInfo = [];
    summary: string;

    response: any;

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
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
        this.getUser();
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
            this.basicInfoService.basicInfoForm(this.basicInfoForm.value).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getUser();
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    getUser() {
        this.basicInfoService.findUsers().subscribe(
            (res) => {
                this.basicInfo = res.data[0].profile;

                if (this.basicInfo.length > 0) {
                    this.summary = this.basicInfo[0].summary;
                } else {
                    this.summary = "Hi i have not updated my information yet!"
                }
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    isEmpty(obj: any) {
        console.log(obj);
        return Object.keys(obj).length != 0;
    }

    editInfo(){
        let i = 0;
        this.basicInfoForm.controls.name.setValue(this.basicInfo[i].name);
        this.basicInfoForm.controls.email.setValue(this.basicInfo[i].email);
        this.basicInfoForm.controls.mobile_number.setValue(this.basicInfo[i].mobile_number);
        this.basicInfoForm.controls.summary.setValue(this.basicInfo[i].summary);
        this.basicInfoForm.controls.dob.setValue(this.basicInfo[i].dob);
        this.basicInfoForm.controls.gender.setValue(this.basicInfo[i].gender);
        this.basicInfoForm.controls.marital_status.setValue(this.basicInfo[i].marital_status);
        this.basicInfoForm.controls.nationality.setValue(this.basicInfo[i].nationality);
        this.basicInfoForm.controls.cnic.setValue(this.basicInfo[i].cnic);
        this.basicInfoForm.controls.career_level.setValue(this.basicInfo[i].career_level);
        this.basicInfoForm.controls.experience.setValue(this.basicInfo[i].experience);
        this.basicInfoForm.controls.city.setValue(this.basicInfo[i].city);
        this.basicInfoForm.controls.area.setValue(this.basicInfo[i].area);
        this.basicInfoForm.controls.expected_salary.setValue(this.basicInfo[i].expected_salary);

        this.getUser();
    }
}
