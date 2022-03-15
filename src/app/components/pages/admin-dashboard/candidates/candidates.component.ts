import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CandidatesService } from "./services/candidates.service";

@Component({
    selector: 'app-candidates',
    templateUrl: './candidates.component.html',
    styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit {

    candidatesInfo = []

    constructor(private toastr: ToastrService,
        private candidatesService: CandidatesService
        ) { }

    ngOnInit(): void {
        this.getAllCandidatesData()
    }

    getAllCandidatesData() {
        let eId: number;
        this.candidatesService.findAllCandidatesData().subscribe(
            (res) => {
                this.candidatesInfo = res.data[0].profile;
                console.log(this.candidatesInfo);
                // for (let keys in this.employersInfo) {
                //     eId = this.employersInfo[keys].employerId;
                // }
            },
            (error) => {
                this.toastr.error(error.error.message);
            });
    }

    delCand(i: number) {
        let candId = this.candidatesInfo[i].id;
        console.log(candId);
        this.candidatesService.deleteCandidate(candId).subscribe(
            (res) => {
                if (res.success == true) {
                    this.toastr.success(res.message);
                    this.getAllCandidatesData();
                } else {
                    this.toastr.error(res.error.message);
                }
            });
    }
}
