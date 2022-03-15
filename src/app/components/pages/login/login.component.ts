import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from './services/login.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    submitted: boolean = false;
    form: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private loginServices: LoginService,
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
            this.loginServices.login(this.form.value).subscribe((res) => {
                const now = new Date();

                if(res.success == true){
                    localStorage.setItem('userToken', JSON.stringify(res.data))
                    this.router.navigate(['/dashboard/:id']);
                } else {
                    this.toastr.error(res.message);
                }
            },
                (error) => {
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

}
