import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ExperienceService } from './services/experience.service';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit {

    submitted: boolean = false;
    submittedExp: boolean = false;

    experienceForm: FormGroup;
    public experienceInfo = [];

    response: any;

    expId: number = null;
    saveExpBtn: boolean = true;
    updateExpBtn: boolean = false;


    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private experienceService: ExperienceService
    ) { }

    ngOnInit(): void {
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

    }

    get fexp(): { [key: string]: AbstractControl } {
        return this.experienceForm.controls;
    }

    //Experience
    experienceInfoForm() {
        this.submittedExp = true;
        if (this.experienceForm.invalid) {
            this.toastr.error("this.response.message");
        }
        else {
            this.experienceService.experienceForm(this.experienceForm.value).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getAllExperience();
                },
                (error) => {
                    this.toastr.error(error.error.message);
                });
            this.submittedExp = false;
        }
    }

    experienceUpdateForm() {
        this.submittedExp = true;
        let data = this.experienceForm.value;

        if (this.experienceForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {
            this.experienceService.updateExperience(data, this.expId).subscribe(
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

    getAllExperience() {
        this.experienceService.findAllExperiences().subscribe(
            (res) => {
                this.experienceInfo = res.data;
            },
            (error) => {
                this.toastr.error(error.error.message);
            });
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

    delExp(i: number) {
        this.expId = this.experienceInfo[i].id;
        this.experienceService.deleteExperience(this.expId).subscribe(
            (res) => {
                if (res.success == true) {
                    this.toastr.success(res.message);
                    this.getAllExperience()
                } else {
                    this.toastr.error(res.error.message);
                }
            });
    }

}
