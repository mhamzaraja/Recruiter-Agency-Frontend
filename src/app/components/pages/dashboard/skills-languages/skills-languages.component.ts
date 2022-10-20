import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SkillsLanguagesService } from './services/skills-languages.service';
import { Router } from '@angular/router';
import data from '../../../data/data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
    currentDelSkill: any;
    currentDelLang: any;


    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private skillsLanguagesService: SkillsLanguagesService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {

        this.skillsForm = this.formBuilder.group({
            skill_title: [{ value: '', disabled: false }, Validators.required],
            skill_proficiency: ['', Validators.required]
        })
        this.getAllSkills();

        this.languageForm = this.formBuilder.group({
            language_title: [{ value: '', disabled: false }, Validators.required],
            language_proficiency: ['', Validators.required]

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
    async skillsInfoForm() {
        this.submittedSkill = true;
        if (this.skillsForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {

            (await this.skillsLanguagesService.skillsForm(this.skillsForm.value)).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getAllSkills();
                    this.modalService.dismissAll();
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    async skillsUpdateForm() {
        this.submittedSkill = true;
        let data = this.skillsForm.value;

        if (this.skillsForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {

            (await this.skillsLanguagesService.updateSkill(data, this.skillId)).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getAllSkills();
                    this.modalService.dismissAll();
                    this.saveSkillBtn = true;
                    this.updateSkillBtn = false;
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    async getAllSkills() {
        (await this.skillsLanguagesService.findAllSkill()).subscribe(
            (res) => {
                this.skillInfo = res.data;
                console.log(this.skillInfo);
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    editSkill(content, i: number) {
        this.modalService.open(content, { size: 'lg' });
        this.saveSkillBtn = false;
        this.updateSkillBtn = true;
        this.skillId = this.skillInfo[i].id;

        this.skillsForm.controls.skill_title.setValue(this.skillInfo[i].skill_title);
        this.skillsForm.controls.skill_proficiency.setValue(this.skillInfo[i].skill_proficiency);
    }

    openVerticallyCentered(content: any, i: number) {
        this.currentDelSkill = i;
        this.modalService.open(content, { centered: true });
    }
    async delSkill(i: number) {
        this.skillId = this.skillInfo[this.currentDelSkill].id;
        (await this.skillsLanguagesService.deleteSkill(this.skillId)).subscribe(
            (res) => {
                this.toastr.success(res.message);
                this.modalService.dismissAll();
                this.getAllSkills();
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    //Languages
    async languageInfoForm() {
        this.submittedLanguage = true;
        if (this.languageForm.invalid) {
            this.toastr.error(this.response.message);
            this.getAllLanguages();
        }
        else {
            (await this.skillsLanguagesService.languagesForm(this.languageForm.value)).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.modalService.dismissAll();
                    this.getAllLanguages();
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    async languageUpdateForm() {
        this.submittedLanguage = true;
        let data = this.languageForm.value;

        if (this.languageForm.invalid) {
            this.toastr.error(this.response.message);
            this.getAllLanguages();
        }
        else {
            (await this.skillsLanguagesService.updateLanguage(data, this.langId)).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getAllLanguages();
                    this.modalService.dismissAll();
                    this.saveLangBtn = true;
                    this.updateLangBtn = false;
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }
    async getAllLanguages() {
        (await this.skillsLanguagesService.findAllLanguages()).subscribe(
            (res) => {
                this.languageInfo = res.data;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    editLang(content2, i: number) {
        this.modalService.open(content2, { size: 'lg' });
        this.saveLangBtn = false;
        this.updateLangBtn = true;
        this.langId = this.languageInfo[i].id;

        this.languageForm.controls.language_title.setValue(this.languageInfo[i].language_title);
        this.languageForm.controls.language_proficiency.setValue(this.languageInfo[i].language_proficiency);
    }

    openModalService(content: any, i: number) {
        this.currentDelLang = i;
        this.modalService.open(content, { centered: true });
    }
    async delLang(i: number) {
        this.langId = this.languageInfo[this.currentDelLang].id;
        (await this.skillsLanguagesService.deleteLanguage(this.langId)).subscribe(
            (res) => {
                this.toastr.success(res.message);
                this.modalService.dismissAll();
                this.getAllLanguages();
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    resetSkill(content) {
        this.modalService.open(content, { size: 'lg' });
        this.saveSkillBtn = true;
        this.updateSkillBtn = false;
        this.skillsForm.reset();
    }
    resetLang(content2) {
        this.modalService.open(content2, { size: 'lg' });
        this.saveLangBtn = true;
        this.updateLangBtn = false;
        this.languageForm.reset();
    }

    ngOnDestroy(): void {

    }
}
