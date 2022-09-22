import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { PostAJobService } from './services/post-a-job.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-post-a-job',
    templateUrl: './post-a-job.component.html',
    styleUrls: ['./post-a-job.component.scss']
})
export class PostAJobComponent implements OnInit, OnDestroy {

    submittedJob: boolean = false;
    jobPostForm: FormGroup;
    public jobPostInfo = [];
    response: any;
    jobId: number = null;
    saveJobBtn: boolean = true;
    updateJobBtn: boolean = false;

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private postAJobService: PostAJobService
    ) { }

    ngOnInit(): void {
        this.jobPostForm = this.formBuilder.group({
            job_title: [null, [Validators.required]],
            job_description: [null, [Validators.required]],
            enter_skills: [null, [Validators.required]],
            company: [null, [Validators.required]],
            job_location: [null, [Validators.required]],
            required_career_level: [null, [Validators.required]],
            salary_range: [null, [Validators.required]],
            job_shift: ["", [Validators.required]],
            positions_available: ["", [Validators.required]],
            gender_requirement: ["", [Validators.required]],
            minimum_qualification: ["", [Validators.required]],
            years_of_experience: ["", [Validators.required]],
            workplace_type: ["", [Validators.required]],
            is_active: false,
            is_sponsor: false
        })
    }

    get fjob(): { [key: string]: AbstractControl } {
        return this.jobPostForm.controls;
    }

    jobPostInfoForm() {
        this.submittedJob = true;
        if (this.jobPostForm.invalid) {
            this.toastr.error("this.response.message");
        }
        else {
            this.postAJobService.jobPostForm(this.jobPostForm.value).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                    this.toastr.error(error.error.message);
                });
            this.submittedJob = false;
        }
    }

    jobUpdateInfoForm() {
        this.submittedJob = true;
        let data = this.jobPostForm.value;

        if (this.jobPostForm.invalid) {
            this.toastr.error("this.response.message");
        }
        else {
            this.postAJobService.updateJobPost(this.jobId, data).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                    this.toastr.error(error.error.message);
                });
            this.submittedJob = false;
        }
    }

    editJob(i: number) {
        // this.saveJobBtn = false;
        // this.updateJobBtn = true;
        this.jobId = this.jobPostInfo[i].id;

        this.jobPostForm.controls.job_title.setValue(this.jobPostInfo[i].job_title);
        this.jobPostForm.controls.job_description.setValue(this.jobPostInfo[i].job_description);
        this.jobPostForm.controls.enter_skills.setValue(this.jobPostInfo[i].enter_skills);
        this.jobPostForm.controls.company.setValue(this.jobPostInfo[i].company);
        this.jobPostForm.controls.job_location.setValue(this.jobPostInfo[i].job_location);
        this.jobPostForm.controls.required_career_level.setValue(this.jobPostInfo[i].required_career_level);
        this.jobPostForm.controls.salary_range.setValue(this.jobPostInfo[i].salary_range);
        this.jobPostForm.controls.job_shift.setValue(this.jobPostInfo[i].job_shift);
        this.jobPostForm.controls.positions_available.setValue(this.jobPostInfo[i].positions_available);
        this.jobPostForm.controls.gender_requirement.setValue(this.jobPostInfo[i].gender_requirement);
        this.jobPostForm.controls.minimum_qualification.setValue(this.jobPostInfo[i].minimum_qualification);
        this.jobPostForm.controls.years_of_experience.setValue(this.jobPostInfo[i].years_of_experience);
        this.jobPostForm.controls.workplace_type.setValue(this.jobPostInfo[i].workplace_type);
        this.jobPostForm.controls.is_active.setValue(this.jobPostInfo[i].is_active);
        this.jobPostForm.controls.is_sponsor.setValue(this.jobPostInfo[i].is_sponsor);

    }

    // delJob(i: number) {
    //     this.jobId = this.jobPostInfo[i].id;
    //     this.postAJobService.deleteJobPost(this.jobId).subscribe(
    //         (res) => {
    //             if (res.success == true) {
    //                 this.toastr.success(res.message);
    //             } else {
    //                 this.toastr.error(res.error.message);
    //             }
    //         });
    // }

    ngOnDestroy(): void {

    }

}
