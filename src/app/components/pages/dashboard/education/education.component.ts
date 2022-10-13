import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EducationService } from './services/education.service';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from "@angular/router";
import data from '../../../data/data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-education',
    templateUrl: './education.component.html',
    styleUrls: ['./education.component.scss']
})
export class EducationComponent implements OnInit, OnDestroy {
    submitted: boolean = false;
    submittedEdu: boolean = false;
    educationForm: FormGroup;
    public educationInfo = [];
    city = data.cities;
    response: any;
    eduId: number = null;
    saveEduBtn: boolean = true;
    updateEduBtn: boolean = false;

    p: number = 1;
    collection: any[] ;

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private educationService: EducationService,
        private router: Router,
        private modalService: NgbModal

    ) { }

    ngOnInit(): void {

        this.educationForm = this.formBuilder.group({
            degree_title: ["", [Validators.required]],
            field_of_study: [null, [Validators.required]],
            location: ["", [Validators.required]],
            institution: [null, [Validators.required]],
            completion_year: ["", [Validators.required]],
            obtained_gpa: ["", [Validators.required]]
        });
        this.getAllEducations();

    }


    get fedu(): { [key: string]: AbstractControl } {
        return this.educationForm.controls;
    }

    //Education
    educationInfoForm() {
        this.submittedEdu = true;
        if (this.educationForm.invalid) {
            this.toastr.error("Please fill all required fields","Education", { timeOut: 60000 });
        }
        else {
            this.educationService.educationForm(this.educationForm.value).subscribe(
                (res) => {
                    this.getAllEducations();
                    if (res.success == true) {            
                        this.toastr.success("Created Successfully");
                        this.modalService.dismissAll();
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
            this.educationService.updateEducation(data, this.eduId).subscribe(
                (res) => {
                    if (res.success == true) {
                        this.toastr.success(res.message);
                        this.getAllEducations();
                        this.modalService.dismissAll();
                        this.saveEduBtn = true;
                        this.updateEduBtn = false;
                    } else {
                        this.toastr.error(res.error.message);
                    }
                });
            this.submitted = false;

        }

    }

    async getAllEducations() {
        (await this.educationService.findAllEducations()).subscribe(
            (res) => {
                this.educationInfo = res.data;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    editEdu(content, i: number,) {
        this.modalService.open(content, { size: 'lg' });
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

    delEdu(i: number) {
        this.eduId = this.educationInfo[i].id;
        this.educationService.deleteEducation(this.eduId).subscribe(
            (res) => {
                if (res.success == true) {
                    this.toastr.success(res.message);
                    this.getAllEducations()
                } else {
                    this.toastr.error(res.error.message);
                }
            });
    }

    clearEdu(content){
        this.modalService.open(content, { size: 'lg' });
        this.saveEduBtn = true;
        this.updateEduBtn = false;
        this.educationForm.reset();
    }

    ngOnDestroy(): void {

    }

}
