import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { RegisterService } from './services/register.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy{
    submitted: boolean = false;
    form: FormGroup

    constructor(private formBuilder: FormBuilder,
        private registerService: RegisterService,
        private toastr: ToastrService,
        private router: Router
    ) {

    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            username: [null, Validators.required],
            email: [null, [Validators.required, Validators.email]],
            password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
            confirmPassword: ["", [Validators.required,]],
            role_id: 1
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
            this.registerService.signup(this.form.value).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
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

    ngOnDestroy(): void {

    }

}
