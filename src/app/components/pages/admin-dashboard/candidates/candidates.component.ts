import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CandidatesService } from "./services/candidates.service";

@Component({
    selector: 'app-candidates',
    templateUrl: './candidates.component.html',
    styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit, OnDestroy {

    candidatesInfo = []
    constructor(private toastr: ToastrService,
        private candidatesService: CandidatesService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getAllCandidatesData()
    }

    getAllCandidatesData() {
        let eId: number;
        this.candidatesService.findAllCandidatesData().subscribe(
            (res) => {
                console.log("cand data", res.data);
                // let datad = {
                //     ProfID: res.data[0].profile[0].id
                // }
                // localStorage.setItem('candID', JSON.stringify(datad));
                this.candidatesInfo = res.data;
                // for (let keys in this.employersInfo) {
                //     eId = this.employersInfo[keys].employerId;
                // }
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    async delCand(i: number) {
        let datad = {
            // ProfID: res.data[0].profile[0].id
            ProfID: this.candidatesInfo[i].id
        }
        localStorage.setItem('candID', JSON.stringify(datad));
        let candId = this.candidatesInfo[i].userId;
        (await this.candidatesService.deleteCandidate(candId)).subscribe(
            (res) => {
                if (res.success == true) {
                    this.toastr.success(res.message);
                    this.getAllCandidatesData();
                } else {
                    this.toastr.error(res.error.message);
                }
            });
    }
    ngOnDestroy() {
        // if(this.getAllCandidatesData) this.getAllCandidatesData.unsubscribe();
    }
}
