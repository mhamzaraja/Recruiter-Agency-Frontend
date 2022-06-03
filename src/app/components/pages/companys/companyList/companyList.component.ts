import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyListService } from "./services/company-list.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-companyList',
    templateUrl: './companyList.component.html',
    styleUrls: ['./companyList.component.scss'],
})
export class CompanyListComponent implements OnInit {

    submittedComp: boolean = false;
    companyForm: FormGroup;
    public companyInfo = [];
    compId: number = null;

    compActive: boolean = false;
    compDeactive: boolean = !this.compActive;

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private companyListService: CompanyListService,
        private router: Router
    ) { }

    ngOnInit(): void {
        // this.companyForm = this.formBuilder.group({
        //     company_name: [],
        //     ceo_name: [],
        //     hr_head_department: [],
        //     job_designation: [],
        //     industry: [],
        //     ownership_type: [],
        //     company_address: [],
        //     company_description: [],
        //     origin_of_company: [],
        //     number_of_offices: [],
        //     contact_email: [],
        //     contact_person: [],
        //     company_url: [],
        //     number_of_employees: [],
        //     operating_since: [],
        //     company_logo: [],
        //     office_number: [],
        //     mobile_number: [],
        //     is_default: [],
        //     is_active: true
        // });
        this.getAllCompanysData();
    }

    getAllCompanysData() {
        this.companyListService.findAllCompanys().subscribe(
            (res) => {
                this.companyInfo = res.data;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }


    activate(i: number) {
        this.compActive = false;
        this.compDeactive = !this.compActive;
        this.compId = i;
        console.log("compname:", this.companyInfo[this.compId].company_name);

        // this.companyListService.activation(this.companyForm.value, i).subscribe(
        //     (res) => {
        //         this.toastr.success(res.message);
        //         this.getAllCompanysData();
        //     },
        //     (error) => {
        //         //if (error.status == 401) this.router.navigate(['/login']);
                // this.toastr.error(error.error.message);
        //     });
    }

    deactivate(i: number) {
        this.compActive = true;
        this.compDeactive = !this.compActive;
        this.compId = i;
        console.log("compname:", this.companyInfo[this.compId].company_name);


        // this.companyListService.activation(this.companyForm.value, i).subscribe(
        //     (res) => {
        //         this.toastr.success(res.message);
        //         this.getAllCompanysData();
        //     },
        //     (error) => {
        //         //if (error.status == 401) this.router.navigate(['/login']);
                // this.toastr.error(error.error.message);
        //     });
    }
}
