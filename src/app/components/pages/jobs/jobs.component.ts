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
    favjobs=[];
    p: number = 1;
    collection: any[];
    toggle = true;
    firstName: any;
    searchForm: FormGroup;
    jobCounts = [];


    constructor(
        private jobsService: JobsService,
        private toastr: ToastrService,
        private router: Router,
        private formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this.getAllJobs();
        this.searchForm = this.formBuilder.group({
            search: [""],
            page:this.p
        })
    }

    //get all jobs
    getAllJobs() {
        this.jobsService.findAllJobs(this.p).subscribe(
            (res) => {
                this.jobPostsInfo = res.data.jobsList;
                this.jobCounts= res.data.jobsCount;
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
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    get user() {
        return this.searchForm.get('search')
    }

    //favourite jobs
    addFav(event){
        console.log("hhgyggyf",event.target.id)
        console.log("check aray", this.jobPostsInfo)
       // let data=this.jobPostsInfo.push(id)
        //console.log("check data", data);
        //this.toggle = !this.toggle;
        // this.jobsService.favouriteJobs(data).subscribe((res)=>{
        //     this.toastr.success(res.message);
        // })

    }

    ngOnDestroy(): void {

    }

    getpage(page:number){
        this.p= page
        this.jobsService.findAllJobs(this.p).subscribe((res)=>{
            
            this.jobPostsInfo = res.data.jobsList;
            this.jobCounts= res.data.jobsCount;
        })
        this.jobsService.searchJobs(this.p).subscribe((res)=>{
            this.jobPostsInfo = res.data.jobsList;
            this.jobCounts= res.data.jobsCount;
        })
    }

}
