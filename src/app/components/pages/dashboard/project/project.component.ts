import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProjectService } from './services/project.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit, OnDestroy {
    submitted: boolean = false;
    submittedPrj: boolean = false;
    savePrjBtn: boolean = true;
    updatePrjBtn: boolean = false;
    prjId: number;
    proejctForm: FormGroup;
    public projectsInfo = [];
    response: any;

    p: number = 1;
    collection: any[];

    constructor(private formBuilder: FormBuilder,
        private toastr: ToastrService,
        private router: Router,
        private projectService: ProjectService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.proejctForm = this.formBuilder.group({
            project_name: [null, [Validators.required]],
            project_url: [null, [Validators.required]],
            start_date: [null, [Validators.required]],
            end_date: [null, [Validators.required]],
            currently_ongoing: false,
            associated_with: ["", [Validators.required]],
            description: [null, [Validators.required]],
        })

        this.proejctForm.get('currently_ongoing').valueChanges.subscribe(value => {
            value ? this.proejctForm.get('end_date').disable() : this.proejctForm.get('end_date').enable();
        })

        this.getAllProjects();
    }

    get fprj(): { [key: string]: AbstractControl } {
        return this.proejctForm.controls;
    }

    async projectInfoForm() {
        this.submittedPrj = true;
        if (this.proejctForm.invalid) {
            this.toastr.error("Error submitting form!");
        }
        else {
            (await this.projectService.projectForm(this.proejctForm.value)).subscribe(
                (res) => {
                    if (res.success == true) {
                        this.toastr.success(res.message);
                        this.getAllProjects();
                        this.modalService.dismissAll();
                    } else {
                        this.toastr.error(res.error.message);
                    }
                });
            this.submitted = false;
        }
    }

    async getAllProjects() {
        (await (this.projectService.findAllProjects())).subscribe(
            (res) => {
                this.projectsInfo = res.data;
                console.log("project data: ", this.projectsInfo);
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    async projectUpdateForm() {
        this.submittedPrj = true;
        let data = this.proejctForm.value;

        if (this.proejctForm.invalid) {
            this.toastr.error(this.response.message);
        }
        else {
            (await this.projectService.updateProject(data, this.prjId)).subscribe(
                (res) => {
                    this.toastr.success(res.message);
                    this.getAllProjects();
                    this.modalService.dismissAll();
                    this.savePrjBtn = true;
                    this.updatePrjBtn = false;
                },
                (error) => {
                    //if (error.status == 401) this.router.navigate(['/login']);
                    this.toastr.error(error.error.message);
                });
            this.submitted = false;
        }
    }

    async delPrj(i: number) {
        this.prjId = this.projectsInfo[i].id;
        (await this.projectService.deleteProject(this.prjId)).subscribe(
            (res) => {
                this.toastr.success(res.message);
                this.getAllProjects()
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    editPrj(content, i: number) {
        this.modalService.open(content, { size: 'lg' });
        this.savePrjBtn = false;
        this.updatePrjBtn = true;
        this.prjId = this.projectsInfo[i].id;
        this.proejctForm.controls.project_name.setValue(this.projectsInfo[i].project_name);
        this.proejctForm.controls.project_url.setValue(this.projectsInfo[i].project_url);
        this.proejctForm.controls.start_date.setValue(this.projectsInfo[i].start_date);
        this.proejctForm.controls.end_date.setValue(this.projectsInfo[i].end_date);
        this.proejctForm.controls.currently_ongoing.setValue(this.projectsInfo[i].currently_ongoing);
        this.proejctForm.controls.associated_with.setValue(this.projectsInfo[i].associated_with);
        this.proejctForm.controls.description.setValue(this.projectsInfo[i].description);
    }

    clearPrj(content) {
        this.modalService.open(content, { size: 'lg' });
        this.savePrjBtn = true;
        this.updatePrjBtn = false;
        this.proejctForm.reset();
    }

    ngOnDestroy(): void {

    }

}
