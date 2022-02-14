import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import config from '../../../config/config';
import { ToastrService } from 'ngx-toastr';


@Injectable({
    providedIn: 'root'
})
export class RegisterService {
    host: string = config.host;

    constructor(private http: HttpClient, private toastr: ToastrService) {

    }

    signup(data: any) {
        var signupData = data;
        delete signupData.confirmPassword;

        this.http.post<any>(`${this.host}/api/auth/signup`, signupData).subscribe({
            next: res => {
                this.toastr.success('Signed up successfully!');
                return {
                    status: 200,
                    success: true,
                    data: res
                };
            },
            error: error => {
                // this.errorMessage = error.message;
                this.toastr.error('Sign up unsuccessful!');
                console.error('There was an error!', error);
                return {
                    status: 500,
                    success: true,
                    message: "There was an error",
                    data: error
                };
            }
        })
    }

}
