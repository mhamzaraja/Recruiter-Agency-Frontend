import { Component, OnDestroy, OnInit } from '@angular/core';
import { JobsService } from './services/jobs.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';

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
    jobCounts = [];
    userId: number;
    favJobs = [];
    length: any;
    findAlljob = [];

    constructor(
        private jobsService: JobsService,
        private toastr: ToastrService,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }


    ngOnInit(): void {
        this.getAllJobs();
        this.getAllFavJobs();
        this.searchForm = this.formBuilder.group({
            search: [""],
            page: this.p
        })


        setTimeout(function () {
            if (this.jobPostsInfo) {
                let finalJobs = this.favJobs.map(item => {
                    var result = this.jobPostsInfo.find(x => x.id == item.id);
                    if (result)
                        return { ...item, liked: true }
                    else {
                        return { ...item }
                    }
                })

                console.log("same uid", finalJobs);
            }
        }, 200);

    }

    //get all jobs
    getAllJobs() {

        this.jobsService.findAllJobs(this.p).subscribe(
            (res) => {
                this.jobPostsInfo = res.data.jobsList;
                this.jobCounts = res.data.jobsCount;
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
                this.jobCounts = res.data.jobsCount;
            },
            (error) => {
                this.toastr.error(error.error.message);
            });
    }

    get user() {
        return this.searchForm.get('search')
    }

    //favourite jobs
    getAllFavJobs() {
        this.jobsService.findAllFavJobs(this.userId).subscribe(
            (res) => {
                this.favJobs = res.data;
            },
            (error) => {
                this.toastr.error(error.error.message)
            }
        )
    }

    //add favourite jobs
    addFavourite(job: any) {
        job.toggle = !job.toggle;
        if (job.candidate_favourite_jobs.length <= 0) {

            this.jobsService.favouriteJobs(job.id).subscribe(
                (res) => {
                    this.toastr.success("Added To Favourites")
                    this.getAllJobs();
                },
                (error) => {
                    this.toastr.error(error.message)
                })
        }
        else if (job.candidate_favourite_jobs.length > 0) {

            let candidateFavjobId = job.candidate_favourite_jobs[0].id;
            this.jobsService.deleteFavJobs(candidateFavjobId).subscribe((res) => {
                this.toastr.error("Removed From Favourites")
                this.getAllJobs();
            })
        }

    }
    ngOnDestroy(): void {

    }
    /////////////////////////
    getpage(page: number) {
        this.p = page
        this.jobsService.findAllJobs(this.p).subscribe((res) => {
            this.jobPostsInfo = res.data.jobsList;
            this.jobCounts = res.data.jobsCount;
        })
        this.jobsService.searchJobs(this.p).subscribe((res) => {
            this.jobPostsInfo = res.data.jobsList;
            this.jobCounts = res.data.jobsCount;
        })
    }
}