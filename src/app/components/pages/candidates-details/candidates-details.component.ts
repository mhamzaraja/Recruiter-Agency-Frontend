import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CamdidatesDetailsService } from "./services/camdidates-details.service";

@Component({
    selector: 'app-candidates-details',
    templateUrl: './candidates-details.component.html',
    styleUrls: ['./candidates-details.component.scss']
})
export class CandidatesDetailsComponent implements OnInit , OnDestroy{

    id: number = this.route.snapshot.params.id;;
    public candBasicInfo: any;
    public candEducation: any;
    public candExperience: any;
    public candSkills: any;
    public candLanguages: any;

    currentWorkValue: string = "Unemployed";


    constructor(
        private camdidatesDetailsService: CamdidatesDetailsService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getAllCandidateData();
    }

    getAllCandidateData() {
        
        this.camdidatesDetailsService.getCandidateData(this.id).subscribe(
            (res) => {
                // console.log(" res data",res.data[this.id]);

                this.candBasicInfo = res.data.profile;
                this.candEducation = res.data.profile.candidate_educations;                 
                this.candExperience = res.data.profile.candidate_experiences;
                this.candSkills = res.data.profile.candidate_skills;
                this.candLanguages = res.data.profile.candidate_languages;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    currentWork(currentlyWorking: boolean, i: number) {
        if (currentlyWorking) {
            this.currentWorkValue = this.candExperience[i].jobTitle;
        }
        else {
            return this.currentWorkValue;
        }
    }

    ngOnDestroy(): void {

    }

}
