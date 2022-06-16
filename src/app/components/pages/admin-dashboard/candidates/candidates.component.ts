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
                this.candidatesInfo = res.data[0].profile;
                // for (let keys in this.employersInfo) {
                //     eId = this.employersInfo[keys].employerId;
                // }
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    delCand(i: number) {
        // let candId = this.candidatesInfo[i].id;
        console.log("delete isnt active");
        // this.candidatesService.deleteCandidate(candId).subscribe(
        //     (res) => {
        //         if (res.success == true) {
        //             this.toastr.success(res.message);
        //             this.getAllCandidatesData();
        //         } else {
        //             this.toastr.error(res.error.message);
        //         }
        //     });
    }

    ngOnDestroy() {
        // if(this.getAllCandidatesData) this.getAllCandidatesData.unsubscribe();
    }
}
