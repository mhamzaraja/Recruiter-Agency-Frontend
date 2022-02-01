import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  submitted: boolean = false;
  submittedEdu: boolean = false;
  submittedExp: boolean = false;
  submittedPrj: boolean = false;
  basicInfoForm: FormGroup;
  educationForm: FormGroup;
  experienceForm: FormGroup;
  proejctForm: FormGroup;


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

    });

    this.educationForm = this.formBuilder.group({
     degreeTitle: [""],
     fieldOfStudy: [null, [Validators.required]],
     location: [""],
     institute: [null, [Validators.required]],
     completionYear: [""],
     gpa: [""],
    });

    this.experienceForm = this.formBuilder.group({
      jobTitle: [null, [Validators.required]],
      company: [null, [Validators.required]],
      industry: [""],
      manageTeam: [""],
      salary: [""],
      locationExp: [""],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      summaryExp: [null, [Validators.required]],
      checkbox: false
    })


    this.experienceForm.get('checkbox').valueChanges.subscribe(value => {
           value ? this.experienceForm.get('endDate').disable() :  this.experienceForm.get('endDate').enable();
         })

    this.proejctForm = this.formBuilder.group({
      projectName: [null, [Validators.required]],
      projectUrl: [null, [Validators.required]],
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      checkbox: false,
      associated: [""],
      descPrj: [null, [Validators.required]],
    })  
    
    this.proejctForm.get('checkbox').valueChanges.subscribe(value => {
      value ? this.proejctForm.get('endDate').disable() :  this.proejctForm.get('endDate').enable();
    })
  }

  get f(): { [key: string]: AbstractControl } {
    return this.basicInfoForm.controls;
  }

  get fedu(): { [key: string]: AbstractControl } {
    return this.educationForm.controls;
  }

  get fexp(): { [key: string]: AbstractControl } {
    return this.experienceForm.controls;
  }

  get fprj(): { [key: string]: AbstractControl } {
    return this.proejctForm.controls;
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

  educationInfoForm(){
    this.submittedEdu = true;
    if (this.educationForm.invalid) {
      return;
    }
    else {
        console.log('educationForm submitted', this.educationForm.value);
        this.submittedEdu = false;
        this.educationForm.reset();
    }

  }

  experienceInfoForm(){
    this.submittedExp = true;
    if (this.experienceForm.invalid) {
      return;
    }
    else {
        console.log('experienceForm submitted', this.experienceForm.value);
        this.submittedExp = false;
        this.experienceForm.reset();
    }
  }

  projectInfoForm(){
    this.submittedPrj = true;
    if (this.proejctForm.invalid) {
      return;
    }
    else {
        console.log('projectForm submitted', this.proejctForm.value);
        this.submittedPrj = false;
        this.proejctForm.reset();
    }
  }

}
