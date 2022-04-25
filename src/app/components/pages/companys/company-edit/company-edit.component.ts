import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { CompanyEditService } from './services/company-edit.service'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-company-edit',
    templateUrl: './company-edit.component.html',
    styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {
    companyId: number = this.route.snapshot.params.id;
    submittedComp: boolean = false;
    companyForm: FormGroup;
    public companyInfo: any;

    constructor(private route: ActivatedRoute,
        private formBuilder: FormBuilder,
        private companyEditService: CompanyEditService,
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

        this.getCompanysDataById(this.companyId);
    }

    get fcomp(): { [key: string]: AbstractControl } {
        return this.companyForm.controls;
    }

    getCompanysDataById(id: number) {
        this.companyEditService.findOneCompany(id).subscribe(
            (res) => {
                this.companyInfo = res.data;
                this.editComp(this.companyId);
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    companyUpdateForm() {
        let id = this.companyId;
        this.submittedComp = true;
        if (this.companyForm.invalid) {
            this.toastr.error("this.response.message");
        }
        else {
            this.companyEditService.companyUpdateForm(this.companyForm.value, id).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getCompanysDataById(id);
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
                });
            this.submittedComp = false;
        }
    }

    editComp(i: number) {
        // this.compId = this.companyInfo[i].id;

        this.companyForm.controls.company_name.setValue(this.companyInfo.company_name);
        this.companyForm.controls.ceo_name.setValue(this.companyInfo.ceo_name);
        this.companyForm.controls.hr_head_department.setValue(this.companyInfo.hr_head_department);
        this.companyForm.controls.job_designation.setValue(this.companyInfo.job_designation);
        this.companyForm.controls.industry.setValue(this.companyInfo.industry);
        this.companyForm.controls.ownership_type.setValue(this.companyInfo.ownership_type);
        this.companyForm.controls.company_address.setValue(this.companyInfo.company_address);
        this.companyForm.controls.company_description.setValue(this.companyInfo.company_description);
        this.companyForm.controls.origin_of_company.setValue(this.companyInfo.origin_of_company);
        this.companyForm.controls.number_of_offices.setValue(this.companyInfo.number_of_offices);
        this.companyForm.controls.contact_email.setValue(this.companyInfo.contact_email);
        this.companyForm.controls.contact_person.setValue(this.companyInfo.contact_person);
        this.companyForm.controls.company_url.setValue(this.companyInfo.company_url);
        this.companyForm.controls.number_of_employees.setValue(this.companyInfo.number_of_employees);
        this.companyForm.controls.operating_since.setValue(this.companyInfo.operating_since);
        this.companyForm.controls.company_logo.setValue(this.companyInfo.company_logo);
        this.companyForm.controls.office_number.setValue(this.companyInfo.office_number);
        this.companyForm.controls.mobile_number.setValue(this.companyInfo.mobile_number);
        this.companyForm.controls.is_default.setValue(this.companyInfo.is_default);

    }

}
