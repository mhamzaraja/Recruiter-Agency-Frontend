import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { AdminRoutes } from './admin.routing';

// components
import { JobsComponent } from './jobs/jobs.component';
import { ResumeComponent } from './resume/resume.component';
import { JobsService } from './jobs/services/jobs.service';
import { ResumeService } from './resume/services/resume.service';
import { JobsApplicationsComponent } from './jobs-applications/jobs-applications.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { ProfessionalsComponent } from './professionals/professionals.component';
import { ProfessionalsService } from './professionals/services/professionals.service';
import { JobsApplicationsService } from './jobs-applications/services/jobs-applications.service';

// paginaton ngx
import { NgxPaginationModule } from 'ngx-pagination';
import { InteriewsComponent } from './interiews/interiews.component';
import { InterviewsService } from './interiews/services/interviews.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AutocompleteLibModule,
        NgxPaginationModule,
        RouterModule.forChild(AdminRoutes)
    ],
    declarations: [
        JobsComponent,
        ResumeComponent,
        JobsApplicationsComponent,
        CandidatesComponent,
        ProfessionalsComponent,
        InteriewsComponent,
    ],
    providers: [
        FormBuilder,
        JobsService,
        ResumeService,
        ProfessionalsService,
        JobsApplicationsService,
        InterviewsService
    ]
})
export class AdminModule { }
