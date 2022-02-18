import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { DashboardService } from './services/dashboard.service';
import { BasicInfoService } from './services/basic-info.service';
import { EducationInfoService } from './services/education-info.service';
import { ExperienceInfoService } from './services/experience-info.service';
import { SkillsInfoService } from './services/skills-info.service';
import { LanguageInfoService } from './services/language-info.service';
import { Router } from "@angular/router";

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

    response: any;

    eduId: number = null;
    expId: number = null;
    skillId: number = null;
    langId: number = null;

    saveEduBtn: boolean = true;
    updateEduBtn: boolean = false;
    saveExpBtn: boolean = true;
    updateExpBtn: boolean = false;
    saveSkillBtn: boolean = true;
    updateSkillBtn: boolean = false;
    saveLangBtn: boolean = true;
    updateLangBtn: boolean = false;

    public skillsData = ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus',
        'Belgium', 'Bosnia & Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus',
        'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia',
        'Germany', 'Greece', 'Hungary', 'Iceland', 'India', 'Ireland', 'Italy', 'Kosovo',
        'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta',
        'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'Norway', 'Poland',
        'Portugal', 'Romania', 'Russia', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia',
        'Spain', 'Sweden', 'Switzerland', 'Turkey', 'Ukraine', 'United Kingdom', 'Vatican City'];


    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private dashboardService: DashboardService,
        private basicInfoService: BasicInfoService,
        private educationInfoService: EducationInfoService,
        private experienceInfoService: ExperienceInfoService,
        private skillsInfoService: SkillsInfoService,
        private languageInfoService: LanguageInfoService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.basicInfoForm = this.formBuilder.group({
            name: [null, [Validators.required]],
            email: [null, [Validators.required, Validators.email]],
            mobile_number: [null, [Validators.required]],
            summary: [null, [Validators.required,]],
            dob: [null, [Validators.required,]],
            gender: ["", [Validators.required]],
            marital_status: [null, [Validators.required,]],
            nationality: [null, [Validators.required,]],
            cnic: [null, [Validators.required,]],
            career_level: ["", [Validators.required]],
            experience: ["", [Validators.required]],
            city: [null, [Validators.required,]],
            area: [null, [Validators.required,]],
            expected_salary: [null, [Validators.required,]]

        });

        this.educationForm = this.formBuilder.group({
            degree_title: ["", [Validators.required]],
            field_of_study: [null, [Validators.required]],
            location: ["", [Validators.required]],
            institution: [null, [Validators.required]],
            completion_year: ["", [Validators.required]],
            obtained_gpa: ["", [Validators.required]]
        });
        this.getAllEducations();

        this.experienceForm = this.formBuilder.group({

            jobTitle: [null, [Validators.required]],
            company: [null, [Validators.required]],
            industry: ["", [Validators.required]],
            manageTeam: ["", [Validators.required]],
            salary: ["", [Validators.required]],
            location: ["", [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
            description: [null, [Validators.required]],
            currentlyWorking: false
        })
        this.getAllExperience();

        this.experienceForm.get('currentlyWorking').valueChanges.subscribe(value => {
            value ? this.experienceForm.get('endDate').disable() : this.experienceForm.get('endDate').enable();
        })

        this.proejctForm = this.formBuilder.group({
            projectName: [null, [Validators.required]],
            projectUrl: [null, [Validators.required]],
            startDate: [null, [Validators.required]],
            endDate: [null, [Validators.required]],
            checkbox: false,
            associated: ["", [Validators.required]],
            descPrj: [null, [Validators.required]],
        })

        this.proejctForm.get('checkbox').valueChanges.subscribe(value => {
            value ? this.proejctForm.get('endDate').disable() : this.proejctForm.get('endDate').enable();
        })

        this.skillsForm = this.formBuilder.group({
            skill_title: [{ value: '', disabled: false }, Validators.required],
            skill_proficiency: ['']
        })
        this.getAllSkills();

        this.languageForm = this.formBuilder.group({
            language_title: [''],
            language_proficiency: ['']

        })
        this.getAllLanguages();
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



    baiscInfoForm() {
        this.submitted = true;
        if (this.basicInfoForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {
            this.basicInfoService.basicInfoForm(this.basicInfoForm.value).subscribe((res) => {
                this.toastr.success(res.message);
            },
                (error) => {
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }
    // getUser(){
    //     this.submitted = true;
    //     if (this.basicInfoForm.invalid) {
    //         this.toastr.error(this.response.message);
    //     }
    //     else {
    //         this.basicInfoService.findUser().subscribe((res) => {
    //             this.toastr.success(res.message);
    //         },
    //             (error) => {
    //                 this.toastr.error(error.error.message);
    //             });
    //         this.submitted = false;
    //     }
    // }

    //Education

    educationInfoForm() {
        this.submittedEdu = true;
        if (this.educationForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {
            this.educationInfoService.educationForm(this.educationForm.value).subscribe(
                (res) => {
                    this.getAllEducations();
                    if (res.success == true) {
                        this.toastr.success(res.message);
                    } else {
                        this.toastr.error(res.message);
                    }
                });
            this.submitted = false;
        }

    }

    educationUpdateForm() {
        this.submittedEdu = true;
        let data = this.educationForm.value;

        if (this.educationForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {
            console.log(data, this.eduId);
            this.educationInfoService.updateEducation(data, this.eduId).subscribe(
                (res) => {
                    if (res.success == true) {
                        this.toastr.success(res.message);
                        this.getAllEducations()
                    } else {
                        this.toastr.error(res.error.message);
                    }
                });
            this.submitted = false;
        }

    }

    getAllEducations(){
        this.educationInfoService.findAllEducations().subscribe((res) => {
            this.educationInfo = res.data;
        },
            (error) => {

            });
    }

    //Experience
    experienceInfoForm() {
        this.submittedExp = true;
        if (this.experienceForm.invalid) {
            this.toastr.error("this.response.message");
        }
        else {
            this.experienceInfoService.experienceForm(this.experienceForm.value).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getAllExperience();
                },
                (error) => {
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    experienceUpdateForm() {
        this.submittedExp = true;
        let data = this.experienceForm.value;

        if (this.experienceForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {
            this.experienceInfoService.updateExperience(data, this.expId).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                },
                (error) => {
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    getAllExperience(){
        this.experienceInfoService.findAllExperiences().subscribe((res) => {
            this.experienceInfo = res.data;
        },
            (error) => {

            });
    }

    projectInfoForm() {
        this.submittedPrj = true;
        if (this.proejctForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {

            this.submitted = false;
        }
    }

    //Skills
    skillsInfoForm() {
        this.submittedSkill = true;
        if (this.skillsForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {

            this.skillsInfoService.skillsForm(this.skillsForm.value).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getAllSkills();
                },
                (error) => {
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    skillsUpdateForm() {
        this.submittedSkill = true;
        let data = this.skillsForm.value;

        if (this.skillsForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {

            this.skillsInfoService.updateSkill(data, this.skillId).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getAllSkills();
                },
                (error) => {
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    getAllSkills() {
        this.skillsInfoService.findAllSkill().subscribe((res) => {
            this.skillInfo = res.data;
        },
            (error) => {

            });
    }

    //Languages
    languageInfoForm() {
        this.submittedLanguage = true;
        if (this.languageForm.invalid) {
            this.toastr.error(this.response.message);
            this.getAllLanguages();
        }
        else {
            this.languageInfoService.languagesForm(this.languageForm.value).subscribe(
                (res) => {
                    this.languageInfo.push(this.languageForm.value);
                    this.toastr.success(res.message);
                },
                (error) => {
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    languageUpdateForm() {
        this.submittedLanguage = true;
        let data = this.languageForm.value;

        if (this.languageForm.invalid) {
            this.toastr.error(this.response.message);
            this.getAllLanguages();
        }
        else {
            this.languageInfoService.updateLanguage(data, this.langId).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                },
                (error) => {
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }
    getAllLanguages(){
        this.languageInfoService.findAllLanguages().subscribe((res) => {
            this.languageInfo = res.data;
        },
            (error) => {

            });
    }

    editEdu(i: number) {
        this.saveEduBtn = false;
        this.updateEduBtn = true;
        this.eduId = this.educationInfo[i].id;

        this.educationForm.controls.degree_title.setValue(this.educationInfo[i].degree_title);
        this.educationForm.controls.field_of_study.setValue(this.educationInfo[i].field_of_study);
        this.educationForm.controls.location.setValue(this.educationInfo[i].location);
        this.educationForm.controls.institution.setValue(this.educationInfo[i].institution);
        this.educationForm.controls.completion_year.setValue(this.educationInfo[i].completion_year);
        this.educationForm.controls.obtained_gpa.setValue(this.educationInfo[i].obtained_gpa);

    }

    editExp(i: number) {
        this.saveExpBtn = false;
        this.updateExpBtn = true;
        this.expId = this.experienceInfo[i].id;

        this.experienceForm.controls.jobTitle.setValue(this.experienceInfo[i].jobTitle);
        this.experienceForm.controls.company.setValue(this.experienceInfo[i].company);
        this.experienceForm.controls.industry.setValue(this.experienceInfo[i].industry);
        this.experienceForm.controls.manageTeam.setValue(this.experienceInfo[i].manageTeam);
        this.experienceForm.controls.salary.setValue(this.experienceInfo[i].salary);
        this.experienceForm.controls.location.setValue(this.experienceInfo[i].location);
        this.experienceForm.controls.startDate.setValue(this.experienceInfo[i].startDate);
        this.experienceForm.controls.endDate.setValue(this.experienceInfo[i].endDate);
        this.experienceForm.controls.currentlyWorking.setValue(this.experienceInfo[i].currentlyWorking);
        this.experienceForm.controls.description.setValue(this.experienceInfo[i].description);
    }

    editSkill(i: number) {
        this.saveSkillBtn = false;
        this.updateSkillBtn = true;
        this.skillId = this.skillInfo[i].id;

        this.skillsForm.controls.skill_title.setValue(this.skillInfo[i].skill_title);
        this.skillsForm.controls.skill_proficiency.setValue(this.skillInfo[i].skill_proficiency);
    }

    editLang(i: number) {
        this.saveLangBtn = false;
        this.updateLangBtn = true;
        this.langId = this.languageInfo[i].id;

        this.languageForm.controls.language_title.setValue(this.languageInfo[i].language_title);
        this.languageForm.controls.language_proficiency.setValue(this.languageInfo[i].language_proficiency);
    }
}
