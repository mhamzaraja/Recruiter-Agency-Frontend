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
            workplace_type: ["", [Validators.required]],
            years_of_experience: ["", [Validators.required]],
            job_category: ["", [Validators.required]],
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
            console.log("thisis job", this.jobPostForm.value);
                        
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

    ngOnDestroy(): void {

    }

}
