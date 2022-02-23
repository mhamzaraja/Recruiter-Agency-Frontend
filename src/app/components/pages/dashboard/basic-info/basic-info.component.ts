import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
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

    summary: string = null;
    name: string = null;

    response: any;

    //parent methods
    @Output() dataFromChild: EventEmitter<any> = new EventEmitter();

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
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    getUser() {
        this.basicInfoService.findUsers().subscribe(
            (res) => {
                this.dataFromChild.emit(res.data);
                this.summary = res.data[0].profile[0].summary;
                this.name = res.data[0].profile[0].name;
                console.log(res.data);
            },
            (error) => {
                this.toastr.error(error.error.message);
            });
    }


}