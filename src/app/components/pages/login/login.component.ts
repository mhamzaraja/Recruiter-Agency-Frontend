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
            this.loginServices.login(this.form.value).subscribe((response: any) => {
                let userData = response.data;
                console.log("test");

                const now= new Date();
                localStorage.setItem('userToken', JSON.stringify(userData) )

                if(response.success == true){
                    this.router.navigate(['/dashboard']);
                } else {
                    this.toastr.error(response.message);
                }
            });
            this.submitted = false;
        } else {
            this.toastr.error("response.message");
        }
    }

    getAuthData(){
        let userToken = JSON.parse(localStorage.getItem('userToken'));

        if(!userToken){
            return 0;
        } else {
            return userToken.token;
        }
    }

}
