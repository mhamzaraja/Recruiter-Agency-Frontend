import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  submitted: boolean = false;
  basicInfoForm: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.basicInfoForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, [Validators.required]],
      summary: [null, [Validators.required,]],
      dob: [null, [Validators.required,]],
      gender: ["",[Validators.required]],
      maritalStatus: [null, [Validators.required,]],
      nationality: [null, [Validators.required,]],
      cnic: [null, [Validators.required,]],
      career: [""],
      experience: [""],
      city: [null, [Validators.required,]],
      area: [null, [Validators.required,]],
      expectedSalary: [null, [Validators.required,]]

    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.basicInfoForm.controls;
  }

  baiscInfoForm(){
    this.submitted = true;
    if (this.basicInfoForm.invalid) {
      return;
    }
    else {
        console.log('baiscInfoForm submitted', this.basicInfoForm.value);
        this.submitted = false;
        this.basicInfoForm.reset();
    }
  }

}
