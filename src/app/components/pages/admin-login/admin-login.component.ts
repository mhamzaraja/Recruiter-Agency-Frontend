import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminLoginService } from './services/admin-login.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

    submitted: boolean = false;
    form: FormGroup;
    constructor(private formBuilder: FormBuilder,
        private adminLoginService: AdminLoginService,
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
            this.adminLoginService.login(this.form.value).subscribe((res) => {
                const now = new Date();

                if (res.success == true) {
                    localStorage.setItem('userToken', JSON.stringify(res.data))
                    this.router.navigate(['/admin']);
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
