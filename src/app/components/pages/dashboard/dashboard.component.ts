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
  submittedSkill: boolean = false;
  submittedLanguage: boolean = false;

  basicInfoForm: FormGroup;
  educationForm: FormGroup;
  experienceForm: FormGroup;
  proejctForm: FormGroup;
  skillsForm: FormGroup;
  languageForm: FormGroup;

  public placeholder: string = '';
  public keyword = 'skill';
  public historyHeading: string = 'Recently selected';

  public educationInfo = [];
  public experienceInfo = [];
  public projectsInfo = [];
  public skillInfo = [];
  public languageInfo = [];



  public skillsData = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus',
    'Belgium', 'Bosnia & Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus',
    'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia',
    'Germany', 'Greece', 'Hungary', 'Iceland', 'India', 'Ireland', 'Italy', 'Kosovo',
    'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta',
    'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'Norway', 'Poland',
    'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia',
    'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'];


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
      career: ["",[Validators.required]],
      experience: ["",[Validators.required]],
      city: [null, [Validators.required,]],
      area: [null, [Validators.required,]],
      expectedSalary: [null, [Validators.required,]]

    });

    this.educationForm = this.formBuilder.group({
     degreeTitle: ["",[Validators.required]],
     fieldOfStudy: [null, [Validators.required]],
     location: ["",[Validators.required]],
     institute: [null, [Validators.required]],
     completionYear: ["",[Validators.required]],
     gpa: ["",[Validators.required]],
    });

    this.experienceForm = this.formBuilder.group({
      jobTitle: [null, [Validators.required]],
      company: [null, [Validators.required]],
      industry: ["",[Validators.required]],
      manageTeam: ["",[Validators.required]],
      salary: ["",[Validators.required]],
      locationExp: ["",[Validators.required]],
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
      associated: ["",[Validators.required]],
      descPrj: [null, [Validators.required]],
    })  
    
    this.proejctForm.get('checkbox').valueChanges.subscribe(value => {
      value ? this.proejctForm.get('endDate').disable() :  this.proejctForm.get('endDate').enable();
    })

    this.skillsForm = this.formBuilder.group({
      skill: [{value: '', disabled: false}, Validators.required],
      experienceSkill: ['']
    })

    this.languageForm = this.formBuilder.group({
      language:[''],
      proficiencyLang:['']

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

  get fskill(): { [key: string]: AbstractControl } {
    return this.skillsForm.controls;
  }

  get flang(): { [key: string]: AbstractControl } {
    return this.languageForm.controls;
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
        this.educationInfo.push( this.educationForm.value);
        console.log('educationForm submitted', this.educationInfo);
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
        this.experienceInfo.push(this.experienceForm.value);
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
        this.projectsInfo.push(this.proejctForm.value);
        console.log('projectForm submitted', this.proejctForm.value);
        this.submittedPrj = false;
        this.proejctForm.reset();
    }
  }

  skillsInfoForm(){
    this.submittedSkill = true;
    if (this.skillsForm.invalid) {
      return;
    }
    else {
        this.skillInfo.push(this.skillsForm.value);
        console.log('skillsForm submitted', this.skillsForm.value);
        this.submittedSkill = false;
        this.skillsForm.reset();
    }
  }

  languageInfoForm(){
    this.submittedLanguage = true;
    if (this.languageForm.invalid) {
      return;
    }
    else {
        this.languageInfo.push(this.languageForm.value);
        console.log('languageForm submitted', this.languageForm.value);
        this.submittedLanguage = false;
        this.languageForm.reset();
    }
  }

  toggleEdit(edu){
    // this.educationInfo[edu];
    // console.log("this.educationInfo[i]",edu);


    this.educationForm.controls.fieldOfStudy.setValue(edu.fieldOfStudy);
    this.educationForm.controls.institute.setValue(edu.institute);
    this.educationForm.controls.degreeTitle.setValue(edu.degreeTitle);
    this.educationForm;
  }

}
