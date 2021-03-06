import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl  } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  submitted: boolean = false;
  form: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required,]],
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
