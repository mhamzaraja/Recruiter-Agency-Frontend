import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CamdidatesDetailsService } from "./services/camdidates-details.service";

@Component({
    selector: 'app-candidates-details',
    templateUrl: './candidates-details.component.html',
    styleUrls: ['./candidates-details.component.scss']
})
export class CandidatesDetailsComponent implements OnInit {

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
                this.candBasicInfo = res.data[0].profile;
                this.candEducation = res.data[1].education;
                this.candExperience = res.data[2].experience;
                this.candSkills = res.data[4].skills;
                this.candLanguages = res.data[5].languages;
            },
            (error) => {
                if(error.status == 401) this.router.navigate(['/login']);
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

}
