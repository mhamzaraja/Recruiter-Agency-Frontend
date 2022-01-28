import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  submitted: boolean = false;
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required,Validators.minLength(6),
      Validators.maxLength(40)]]
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  logInForm(){
    this.submitted = true;
    if (this.form.valid) {
        console.log('login submitted', this.form.value);
        this.submitted = false;
        this.form.reset();
    }
  }

}
