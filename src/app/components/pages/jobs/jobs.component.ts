import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobsService } from './services/jobs.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { FormGroup, FormBuilder, FormControl, AbstractControl } from '@angular/forms';


@Component({
    selector: 'app-jobs',
    templateUrl: './jobs.component.html',
    styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit, OnDestroy {

    jobPostsInfo = [];
    p: number = 1;
    collection: any[];
    toggle = true;
    firstName: any;
    searchForm: FormGroup;


    constructor(
        private jobsService: JobsService,
        private toastr: ToastrService,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.getAllJobs();
        this.searchForm = this.formBuilder.group({
            search: [""]
        })
    }

    //favorite jobs
    enableDisableRule() {
        this.toggle = !this.toggle;
    }

    //get all jobs
    getAllJobs() {
        this.jobsService.findAllJobs().subscribe(
            (res) => {
                this.jobPostsInfo = res.data.jobsList;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    //search jobs
    search() {
        this.jobsService.searchJobs(this.searchForm.value).subscribe(
            (res) => {
                this.jobPostsInfo = res.data.jobsList;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    get user() {
        return this.searchForm.get('search')
    }

    ngOnDestroy(): void {

    }

}
