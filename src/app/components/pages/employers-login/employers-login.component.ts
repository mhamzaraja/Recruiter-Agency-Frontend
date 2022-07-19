import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmployersLoginService } from './services/employers-login.service';
import { Router } from "@angular/router";
import userToken from "../../config/userToken";

@Component({
    selector: 'app-employers-login',
    templateUrl: './employers-login.component.html',
    styleUrls: ['./employers-login.component.scss']
})
export class EmployersLoginComponent implements OnInit, OnDestroy {
    userId: number = userToken.id;

    submitted: boolean = false;
    form: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private employersLoginServices: EmployersLoginService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(6),
            Validators.maxLength(40)]]
        })
    }

    get f(): { [key: string]: AbstractControl } {
        return this.form.controls;
    }

    logInForm() {
        this.submitted = true;
        if (this.form.valid) {
            this.employersLoginServices.login(this.form.value).subscribe((res) => {
                const now = new Date();

                if (res.success == true) {
                    localStorage.setItem('userToken', JSON.stringify(res.data))
                    this.router.navigate(['/employer/dashboard', this.userId]);
                } else {
                    this.toastr.error(res.message);
                }
            },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
                }
            );
            this.submitted = false;
        }
    }

    getAuthData() {
        let userToken = JSON.parse(localStorage.getItem('userToken'));

        if (!userToken) {
            return 0;
        } else {
            return userToken.token;
        }
    }

    ngOnDestroy(): void {

    }

}
