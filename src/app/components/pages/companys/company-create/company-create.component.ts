import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { CompanyCreateService } from './services/company-create.service'
import { Router } from "@angular/router";

@Component({
    selector: 'app-company-create',
    templateUrl: './company-create.component.html',
    styleUrls: ['./company-create.component.scss']
})
export class CompanyCreateComponent implements OnInit, OnDestroy {

    submittedComp: boolean = false;
    companyForm: FormGroup;
    public companyInfo = [];

    compId: number = null;

    constructor(private formBuilder: FormBuilder,
        private companyCreateService: CompanyCreateService,
        private toastr: ToastrService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.companyForm = this.formBuilder.group({
            company_name: [null, Validators.required],
            ceo_name: ["", Validators.required],
            hr_head_department: ["", Validators.required],
            job_designation: ["", Validators.required],
            industry: ["", Validators.required],
            ownership_type: ["", Validators.required],
            company_address: ["", Validators.required],
            company_description: [null, Validators.required],
            origin_of_company: ["", Validators.required],
            number_of_offices: ["", Validators.required],
            contact_email: ["", Validators.required],
            contact_person: [null, Validators.required],
            company_url: ["", Validators.required],
            number_of_employees: ["", Validators.required],
            operating_since: ["", Validators.required],
            company_logo: [""],
            office_number: [null, Validators.required],
            mobile_number: ["", Validators.required],
            is_default: false,
            is_active: true
        });

        this.getAllCompanysData();
    }

    get fcomp(): { [key: string]: AbstractControl } {
        return this.companyForm.controls;
    }

    companyInfoForm() {
        this.submittedComp = true;
        if (this.companyForm.invalid) {
            this.toastr.error("this.response.message");
        }
        else {
            this.companyCreateService.companyForm(this.companyForm.value).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getAllCompanysData();
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
                });
            this.submittedComp = false;
        }
    }

    getAllCompanysData() {
        this.companyCreateService.findAllCompanys().subscribe(
            (res) => {
                this.companyInfo = res.data;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    delComp(i: number) {
        this.compId = this.companyInfo[i].id;
        this.companyCreateService.companyDeleteForm(this.compId).subscribe(
            (res) => {
                if (res.success == true) {
                    this.toastr.success(res.message);
                    this.getAllCompanysData()
                } else {
                    this.toastr.error(res.error.message);
                }
            });
    }

    ngOnDestroy(): void {

    }

    // createButton(){
    //     this.saveCompBtn = true;
    //     this.updateCompBtn = false;
    //     this.compId = null;
    //     this.companyForm.reset();
    // }
}
