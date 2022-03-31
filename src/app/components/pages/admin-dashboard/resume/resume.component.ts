import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ResumeService } from './services/resume.service';

@Component({
    selector: 'app-resume',
    templateUrl: './resume.component.html',
    styleUrls: ['./resume.component.scss', '../admin-dashboard.component.scss']
})
export class ResumeComponent implements OnInit {

    resumeInfo = [];
    profile = [];
    profileCount: number;

    constructor(private resumeService: ResumeService,
        private toastr: ToastrService,
        private router: Router
        ) { }

    ngOnInit(): void {
        this.getAllCandidatesData();
    }

    getAllCandidatesData() {
        let eId: number;
        this.resumeService.findAllCandidatesData().subscribe(
            (res) => {
                this.resumeInfo = res.data;
                this.profileCount = this.resumeInfo[0].profile.length

                // profile
                this.profile = this.resumeInfo[0].profile;
                // for (let keys in this.employersInfo) {
                //     eId = this.employersInfo[keys].employerId;
                // }
            },
            (error) => {
                if(error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    delCand(i: number) {
        // let candId = this.candidatesInfo[i].id;
        console.log("delete isnt active");
        // this.resumeService.deleteCandidate(candId).subscribe(
        //     (res) => {
        //         if (res.success == true) {
        //             this.toastr.success(res.message);
        //             this.getAllCandidatesData();
        //         } else {
        //             this.toastr.error(res.error.message);
        //         }
        //     });
    }

}
