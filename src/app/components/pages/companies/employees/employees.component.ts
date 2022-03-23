import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { EmployeesService } from './services/employees.service';

@Component({
    selector: 'app-employees',
    templateUrl: './employees.component.html',
    styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

    employersInfo = [];
    constructor(private employeesService: EmployeesService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getAllEmployersData();
    }

    getAllEmployersData() {
        let eId: number;
        this.employeesService.findAllEmployersData().subscribe(
            (res) => {
                this.employersInfo = res.data;
                console.log(this.employersInfo);
                // for (let keys in this.employersInfo) {
                //     eId = this.employersInfo[keys].employerId;
                // }
            },
            (error) => {
                this.toastr.error(error.error.message);
            });
    }


}
