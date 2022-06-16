import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SkillsLanguagesService } from './services/skills-languages.service';
import { Router } from '@angular/router';
import data from '../../../data/data';

@Component({
    selector: 'app-skills-languages',
    templateUrl: './skills-languages.component.html',
    styleUrls: ['./skills-languages.component.scss']
})
export class SkillsLanguagesComponent implements OnInit, OnDestroy {

    submitted: boolean = false;
    submittedSkill: boolean = false;
    submittedLanguage: boolean = false;

    skillsForm: FormGroup;
    languageForm: FormGroup;
    public skillInfo = [];
    public languageInfo = [];

    skillId: number = null;
    langId: number = null;

    saveSkillBtn: boolean = true;
    updateSkillBtn: boolean = false;
    saveLangBtn: boolean = true;
    updateLangBtn: boolean = false;

    response: any;
    public placeholder: string = '';

    public keyword = 'skill';
    public historyHeading: string = 'Recently selected';

    public skillsData = data.skillsData;
    public langData = data.langData;
    public proficiency = data.proficiency;

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private skillsLanguagesService: SkillsLanguagesService
    ) { }

    ngOnInit(): void {

        this.skillsForm = this.formBuilder.group({
            skill_title: [{ value: '', disabled: false }, Validators.required],
            skill_proficiency: ['']
        })
        this.getAllSkills();

        this.languageForm = this.formBuilder.group({
            language_title: [{ value: '', disabled: false }, Validators.required],
            language_proficiency: ['']

        })
        this.getAllLanguages();
    }

    get fskill(): { [key: string]: AbstractControl } {
        return this.skillsForm.controls;
    }

    get flang(): { [key: string]: AbstractControl } {
        return this.languageForm.controls;
    }

    //Skills
    skillsInfoForm() {
        this.submittedSkill = true;
        if (this.skillsForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {

            this.skillsLanguagesService.skillsForm(this.skillsForm.value).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getAllSkills();
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
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

            this.skillsLanguagesService.updateSkill(data, this.skillId).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getAllSkills();
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    getAllSkills() {
        this.skillsLanguagesService.findAllSkill().subscribe(
            (res) => {
                this.skillInfo = res.data;
                console.log(this.skillInfo);
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    editSkill(i: number) {
        this.saveSkillBtn = false;
        this.updateSkillBtn = true;
        this.skillId = this.skillInfo[i].id;

        this.skillsForm.controls.skill_title.setValue(this.skillInfo[i].skill_title);
        this.skillsForm.controls.skill_proficiency.setValue(this.skillInfo[i].skill_proficiency);
    }

    delSkill(i: number) {
        this.skillId = this.skillInfo[i].id;
        this.skillsLanguagesService.deleteSkill(this.skillId).subscribe(
            (res) => {
                this.toastr.success(res.message);
                this.getAllSkills();
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
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
            this.skillsLanguagesService.languagesForm(this.languageForm.value).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getAllLanguages();
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
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
            this.skillsLanguagesService.updateLanguage(data, this.langId).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }
    getAllLanguages() {
        this.skillsLanguagesService.findAllLanguages().subscribe(
            (res) => {
                this.languageInfo = res.data;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    editLang(i: number) {
        this.saveLangBtn = false;
        this.updateLangBtn = true;
        this.langId = this.languageInfo[i].id;

        this.languageForm.controls.language_title.setValue(this.languageInfo[i].language_title);
        this.languageForm.controls.language_proficiency.setValue(this.languageInfo[i].language_proficiency);
    }

    delLang(i: number) {
        this.langId = this.languageInfo[i].id;
        this.skillsLanguagesService.deleteLanguage(this.langId).subscribe(
            (res) => {
                this.toastr.success(res.message);
                this.getAllLanguages();
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    resetSkill(){
        this.saveSkillBtn = true;
        this.updateSkillBtn = false;
        this.skillsForm.reset();
    }
    resetLang(){
        this.saveLangBtn = true;
        this.updateLangBtn = false;
        this.languageForm.reset();
    }

    ngOnDestroy(): void {

    }
}
