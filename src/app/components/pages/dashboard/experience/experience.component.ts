import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ExperienceService } from './services/experience.service';
import { Router } from '@angular/router';
import data from '../../../data/data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-experience',
    templateUrl: './experience.component.html',
    styleUrls: ['./experience.component.scss']
})
export class ExperienceComponent implements OnInit, OnDestroy {

    submitted: boolean = false;
    submittedExp: boolean = false;
    experienceForm: FormGroup;
    public experienceInfo = [];
    response: any;
    expId: number = null;
    saveExpBtn: boolean = true;
    updateExpBtn: boolean = false;
    city = data.cities;

    p: number = 1;
    collection: any[] ;



    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private experienceService: ExperienceService,
        private modalService: NgbModal
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
                    this.modalService.dismissAll();
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
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
                    this.modalService.dismissAll();
                    this.saveExpBtn = true;
                    this.updateExpBtn = false;
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    async getAllExperience() {
        (await this.experienceService.findAllExperiences()).subscribe(
            (res) => {
                this.experienceInfo = res.data;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    editExp(content, i: number) {
        this.modalService.open(content, { size: 'lg' });
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

    resetExp(content){
        this.modalService.open(content, { size: 'lg' });
        this.saveExpBtn = true;
        this.updateExpBtn = false;
        this.experienceForm.reset();
    }

    ngOnDestroy(): void {

    }

}
