import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProfessionalsService } from "./services/professionals.service";

@Component({
    selector: 'app-professionals',
    templateUrl: './professionals.component.html',
    styleUrls: ['./professionals.component.scss']
})
export class ProfessionalsComponent implements OnInit {

    employersInfo = []

    constructor(private professionalsService: ProfessionalsService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.getAllEmployersData();
    }

    getAllEmployersData() {
        let eId: number;
        this.professionalsService.findAllEmployersData().subscribe(
            (res) => {
                this.employersInfo = res.data;
                console.log(this.employersInfo);
                // for (let keys in this.employersInfo) {
                //     eId = this.employersInfo[keys].employerId;
                // }
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    delEmp(i: number) {
        // let empId = this.employersInfo[i].id;
        console.log("delete isnt active");
        // this.professionalsService.deleteEmployer(empId).subscribe(
        //     (res) => {
        //         if (res.success == true) {
        //             this.toastr.success(res.message);
        //             this.getAllEmployersData();
        //         } else {
        //             this.toastr.error(res.error.message);
        //         }
        //     });
    }

}
