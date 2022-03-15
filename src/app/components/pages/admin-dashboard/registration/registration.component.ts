import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from './services/registration.service'

@Component({
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss', '../admin-dashboard.component.scss']
})
export class RegistrationComponent implements OnInit {
    candidateInfo = [];

    constructor(private registrationService: RegistrationService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getAllCandidatesData();
    }

    getAllCandidatesData() {
        this.registrationService.findAllCandidates().subscribe(
            (res) => {
                this.candidateInfo = res.data[0].profile;
                console.log(this.candidateInfo);
            },
            (error) => {
                this.toastr.error(error.error.message);
            });
    }

}
