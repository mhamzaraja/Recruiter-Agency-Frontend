import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminRegisterService } from './services/admin-register.service';

@Component({
  selector: 'app-admin-register',
  templateUrl: './admin-register.component.html',
  styleUrls: ['./admin-register.component.scss']
})
export class AdminRegisterComponent implements OnInit {

    submitted: boolean = false;
    form: FormGroup

    constructor(private formBuilder: FormBuilder,
        private adminRegisterService: AdminRegisterService,
        private toastr: ToastrService
    ) {

    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
            confirmPassword: ["", [Validators.required,]],
            role_id: 3
        },
            {
                validator: this.confirmPasswordValidator("password", "confirmPassword")
            });
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    signUpForm() {
        this.submitted = true;
        if (this.form.valid) {
            this.adminRegisterService.signup(this.form.value).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                },
                (error) => {
                    this.toastr.error(error.error.message);
                }
            )
            this.submitted = false;
        }
    }

    confirmPasswordValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            let control = formGroup.controls[controlName];
            let matchingControl = formGroup.controls[matchingControlName]
            if (
                matchingControl.errors &&
                !matchingControl.errors.confirmPasswordValidator
            ) {
                return;
            }
            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ confirmPasswordValidator: true });
            } else {
                matchingControl.setErrors(null);
            }
        };
    }

}
