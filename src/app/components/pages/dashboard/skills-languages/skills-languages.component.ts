import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { SkillsLanguagesService } from './services/skills-languages.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-skills-languages',
    templateUrl: './skills-languages.component.html',
    styleUrls: ['./skills-languages.component.scss']
})
export class SkillsLanguagesComponent implements OnInit {

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

    public skillsData = ['Acceptance testing', 'Animation development', 'Application support', 'Asset management', 'Audit', 'Availability management',
    'Benefits management', 'Business administration', 'Business intelligence', 'Business modelling',
    'Business process improvement', 'Business situation analysis', 'Capacity management',
    'Certification scheme operation', 'Change control', 'Competency assessment',
    'Configuration management', 'Consultancy', 'Content authoring','Content publishing',
    'Continuity management', 'Contract management', 'Customer service support', 'Data engineering',
    'Data management', 'Data modelling and design', 'Data science', 'Data visualisation',
    'Database administration', 'Database design', 'Demand management', 'Digital forensics',
    'Emerging technology monitoring', 'Employee experience', 'Enterprise and business architecture',
    'Facilities management', 'Feasibility assessment', 'Financial management', 'Governance',
    'Hardware design', 'High-performance computing', 'Incident management', 'Information assurance',
    'Information management', 'Information security', 'Information systems coordination', 'Innovation',
    'Investment appraisal', 'IT infrastructure', 'Knowledge management',
    'Learning and development management', 'Learning delivery', 'Learning design and development',
    'Machine learning', 'Marketing', 'Measurement', 'Methods and tools', 'Network design',
    'Network support', 'Numerical analysis', 'Organisation design and implementation',
    'Organisational capability development', 'Organisational change management',
    'Organisational facilitation', 'Penetration testing', 'Performance management',
    'Personal data protection', 'Portfolio management', 'Portfolio, programme and project support',
    'Problem management', 'Product management', 'Professional development', 'Programme management',
    'Programming/software development', 'Project management', 'Quality assurance',
    'Quality management', 'Radio frequency engineering', 'Real-time/embedded systems development',
    'Release and deployment', 'Requirements definition and management', 'Research', 'Resourcing',
    'Risk management', 'Safety assessment', 'Safety engineering', 'Sales support',
    'Scientific modelling', 'Security operations', 'Selling', 'Service acceptance',
    'Service catalogue management', 'Service level management', 'Software configuration',
    'Software design', 'Solution architecture', 'Sourcing', 'Specialist advice',
    'Stakeholder relationship management', 'Storage management', 'Strategic planning',
    'Subject formation', 'Supplier management', 'Sustainability', 'System software',
    'Systems and software life cycle engineering', 'Systems design', 'Systems development management',
    'Systems installation and removal', 'Systems integration and build', 'Teaching',
    'Technology service management', 'Testing', 'Threat intelligence', 'User experience analysis',
    'User experience design', 'User experience evaluation', 'User research', 'Vulnerability assessment',
    'Vulnerability research', 'Workforce planning'];
    public langData = ['Abkhaz','Afar','Afrikaans','Akan','Albanian','Amharic','Arabic','Aragonese','Armenian','Assamese','Avaric','Avestan','Aymara','Azerbaijani','Bambara','Bashkir','Basque','Belarusian','Bengali','Bihari','Bislama','Bosnian','Breton','Bulgarian','Burmese','Catalan; Valencian','Chamorro','Chechen','Chichewa; Chewa; Nyanja','Chinese','Chuvash','Cornish','Corsican','Cree','Croatian','Czech','Danish','Divehi; Dhivehi; Maldivian;','Dutch','English','Esperanto','Estonian','Ewe','Faroese','Fijian','Finnish','French','Fula; Fulah; Pulaar; Pular','Galician','Georgian','German','Greek, Modern','Guaraní','Gujarati','Haitian; Haitian Creole','Hausa','Hebrew','Hebrew','Herero','Hindi','Hiri Motu','Hungarian','Interlingua','Indonesian','Interlingue','Irish','Igbo','Inupiaq','Ido','Icelandic','Italian','Inuktitut','Japanese','Javanese','Kalaallisut, Greenlandic','Kannada','Kanuri','Kashmiri','Kazakh','Khmer','Kikuyu, Gikuyu','Kinyarwanda','Kirghiz, Kyrgyz','Komi','Kongo','Korean','Kurdish','Kwanyama, Kuanyama','Latin','Luxembourgish, Letzeburgesch','Luganda','Limburgish, Limburgan, Limburger','Lingala','Lao','Lithuanian','Luba-Katanga','Latvian','Manx','Macedonian','Malagasy','Malay','Malayalam','Maltese','Māori','Marathi (Marāṭhī)','Marshallese','Mongolian','Nauru','Navajo, Navaho','Norwegian Bokmål','North Ndebele','Nepali','Ndonga','Norwegian Nynorsk','Norwegian','Nuosu','South Ndebele','Occitan','Ojibwe, Ojibwa','Old Church Slavonic, Church Slavic, Church Slavonic, Ol','Oromo','Oriya','Ossetian, Ossetic','Panjabi, Punjabi','Pāli','Persian','Polish','Pashto, Pushto','Portuguese','Quechua','Romansh','Kirundi','Romanian, Moldavian, Moldovan','Russian','Sanskrit (Saṁskṛta)','Sardinian','Sindhi','Northern Sami','Samoan','Sango','Serbian','Scottish Gaelic; Gaelic','Shona','Sinhala, Sinhalese','Slovak','Slovene','Somali','Southern Sotho','Spanish; Castilian','Sundanese','Swahili','Swati','Swedish','Tamil','Telugu','Tajik','Thai','Tigrinya','Tibetan Standard, Tibetan, Central','Turkmen','Tagalog','Tswana','Tonga (Tonga Islands)','Turkish','Tsonga','Tatar','Twi','Tahitian','Uighur, Uyghur','Ukrainian','Urdu','Uzbek','Venda','Vietnamese','Volapük','Walloon','Welsh','Wolof','Western Frisian','Xhosa','Yiddish','Yoruba','Zhuang, Chuang'];
    public proficiency = ['Beginner', 'Intermediate', 'Expert',];

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
                    if(error.status == 401) this.router.navigate(['/login']);
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
                    if(error.status == 401) this.router.navigate(['/login']);
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
                if(error.status == 401) this.router.navigate(['/login']);
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
        console.log(this.skillId);
        this.skillsLanguagesService.deleteSkill(this.skillId).subscribe(
            (res) => {
                this.toastr.success(res.message);
                this.getAllSkills();
            },
            (error) => {
                if(error.status == 401) this.router.navigate(['/login']);
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
                    if(error.status == 401) this.router.navigate(['/login']);
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
                    if(error.status == 401) this.router.navigate(['/login']);
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
                if(error.status == 401) this.router.navigate(['/login']);
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
                if(error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }
}
