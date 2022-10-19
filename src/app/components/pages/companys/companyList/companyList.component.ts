import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CompanyListService } from "./services/company-list.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import userToken from 'src/app/components/config/userToken';

@Component({
    selector: 'app-companyList',
    templateUrl: './companyList.component.html',
    styleUrls: ['./companyList.component.scss'],
})
export class CompanyListComponent implements OnInit, OnDestroy {
    companyId: number = null;
    submittedComp: boolean = false;
    userId: number = userToken.id;
    companyForm: FormGroup;
    public companyInfo = [];
    currentDelComp: any;

    compActive: boolean = false;
    compDeactive: boolean = !this.compActive;

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private companyListService: CompanyListService,
        private router: Router,
        private route: ActivatedRoute,
        private modalService: NgbModal
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
        this.companyId = i;
        console.log("compname:", this.companyInfo[this.companyId].company_name);

        // this.companyListService.activation(this.companyForm.value, this.companyId).subscribe(
        //     (res) => {
        //         this.toastr.success(res.message);
        //         this.getAllCompanysData();
        //     },
        //     (error) => {
        //         //if (error.status == 401) this.router.navigate(['/login']);
        //         this.toastr.error(error.error.message);
        //     });
    }

    deactivate(i: number) {
        this.compActive = true;
        this.compDeactive = !this.compActive;
        this.companyId = i;
        console.log("compname:", this.companyInfo[this.companyId].company_name);


        // this.companyListService.activation(this.companyForm.value, this.companyId).subscribe(
        //     (res) => {
        //         this.toastr.success(res.message);
        //         this.getAllCompanysData();
        //     },
        //     (error) => {
        //         //if (error.status == 401) this.router.navigate(['/login']);
        //         this.toastr.error(error.error.message);
        //     });
    }

    companyUpdateForm() {
        let id = this.companyId;
        this.submittedComp = true;
        if (this.companyForm.invalid) {
            this.toastr.error("this.response.message");
        }
        else {
            this.companyListService.companyUpdateForm(this.companyForm.value, id).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getAllCompanysData();
                    this.modalService.dismissAll();
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
                });
            this.submittedComp = false;
        }
    }

    editComp(content, i: number) {
        this.modalService.open(content, { size: 'lg' });
        this.companyId = this.companyInfo[i].id;

        this.companyForm.controls.company_name.setValue(this.companyInfo[i].company_name);
        this.companyForm.controls.ceo_name.setValue(this.companyInfo[i].ceo_name);
        this.companyForm.controls.hr_head_department.setValue(this.companyInfo[i].hr_head_department);
        this.companyForm.controls.job_designation.setValue(this.companyInfo[i].job_designation);
        this.companyForm.controls.industry.setValue(this.companyInfo[i].industry);
        this.companyForm.controls.ownership_type.setValue(this.companyInfo[i].ownership_type);
        this.companyForm.controls.company_address.setValue(this.companyInfo[i].company_address);
        this.companyForm.controls.company_description.setValue(this.companyInfo[i].company_description);
        this.companyForm.controls.origin_of_company.setValue(this.companyInfo[i].origin_of_company);
        this.companyForm.controls.number_of_offices.setValue(this.companyInfo[i].number_of_offices);
        this.companyForm.controls.contact_email.setValue(this.companyInfo[i].contact_email);
        this.companyForm.controls.contact_person.setValue(this.companyInfo[i].contact_person);
        this.companyForm.controls.company_url.setValue(this.companyInfo[i].company_url);
        this.companyForm.controls.number_of_employees.setValue(this.companyInfo[i].number_of_employees);
        this.companyForm.controls.operating_since.setValue(this.companyInfo[i].operating_since);
        this.companyForm.controls.company_logo.setValue(this.companyInfo[i].company_logo);
        this.companyForm.controls.office_number.setValue(this.companyInfo[i].office_number);
        this.companyForm.controls.mobile_number.setValue(this.companyInfo[i].mobile_number);
        this.companyForm.controls.is_default.setValue(this.companyInfo[i].is_default);

    }

    openVerticallyCentered(content: any, i: number) {
        this.currentDelComp = i;
        this.modalService.open(content, { centered: true });
    }

    delComp(i: number) {
        this.companyId = this.companyInfo[this.currentDelComp].id;
        this.companyListService.deleteCompany(this.companyId).subscribe(
            (res) => {
                if (res.success == true) {
                    this.toastr.success(res.message);
                    this.modalService.dismissAll();
                    this.getAllCompanysData();
                } else {
                    this.toastr.error(res.error.message);
                }
            });
    }

    ngOnDestroy(): void {

    }
}
