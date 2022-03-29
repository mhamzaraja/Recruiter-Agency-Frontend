import { Component, OnInit} from '@angular/core';
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

    public basicInfo: any;


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
            this.basicInfoService.basicInfoForm(this.basicInfoForm.value).subscribe((res) => {
                this.toastr.success(res.message);
                this.getUser();
            },
                (error) => {
                    if(error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    getUser() {
        this.basicInfoService.findUsers().subscribe(
            (res) => {

                this.basicInfo = res.data[0].profile[0];
            },
            (error) => {
                if(error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    isEmpty(obj : any){
        console.log(obj);
        return Object.keys(obj).length != 0;
    }
}
