import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl  } from '@angular/forms';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  form: FormGroup

  constructor(private formBuilder: FormBuilder, private registerService : RegisterService) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
      confirmPassword: ["", [Validators.required,]]
      },
      {
        validator: this.confirmPasswordValidator("password", "confirmPassword")
      });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  signUpForm(){
      this.submitted = true;
    if (this.form.valid) {
        this.registerService.signup(this.form.value);
        console.log('form submitted', this.form.value);
        this.submitted = false;
        this.form.reset();
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
