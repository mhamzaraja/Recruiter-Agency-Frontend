import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CandidatesService } from "./services/candidates.service";

@Component({
    selector: 'app-candidates',
    templateUrl: './candidates.component.html',
    styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

    candidatsInfo = []
    // public candidatsInfo: any;
    public candExperience: any;
    public candSkills: any;

    constructor(
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private candidatesService: CandidatesService
    ) { }

    ngOnInit(): void {
        this.getCandidates();
    }

    getCandidates() {
        this.candidatesService.getAllCandidates().subscribe(
            (res) => {
                this.candidatsInfo = res.data[0].profile;
                this.candExperience = res.data[2].experience;
                this.candSkills = res.data[4].skills;
                console.log("candExperience: ", this.candExperience);
            },
            (error) => {
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

}
