import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CandidatesService } from "./services/candidates.service";

@Component({
    selector: 'app-candidates',
    templateUrl: './candidates.component.html',
    styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit, OnDestroy {

    candidatsInfo = [];
    response: any;
    // public candidatsInfo: any;
    public candExperience: any;
    public candSkills: any;

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        private candidatesService: CandidatesService
    ) { }

    ngOnInit(): void {
        this.getCandidates();
        console.log(this.candExperience)
    }

    getCandidates() {
        this.candidatesService.getAllCandidates().subscribe(
            (res) => {
                this.response = res.data;
                this.candidatsInfo = res.data[0].profile;
                this.candExperience = res.data[2].experience;
                this.candSkills = res.data[4].skills;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    currentWork(currentWork: boolean, i: number) {
        let currentWorkValue = "Unemployed";
        if (currentWork) {
            console.log(this.candExperience[i].jobTitle);
            return currentWorkValue = this.candExperience[i].jobTitle;
        }
        else {
            return currentWorkValue;
        }
    }

    ngOnDestroy(): void {

    }

}
