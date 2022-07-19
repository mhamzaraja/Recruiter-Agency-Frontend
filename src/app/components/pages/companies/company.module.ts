import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule } from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';
import { CompanyRoutes } from './company.routing';

// components
import { EmployeesComponent } from './employees/employees.component';
import { DailyTasksComponent } from './daily-tasks/daily-tasks.component';
import { FacilitiesComponent } from './facilities/facilities.component';
import { DailyTasksService } from './daily-tasks/services/daily-tasks.service';
import { EmployeesService } from './employees/services/employees.service';
import { FaciitiesService } from './facilities/services/faciities.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AutocompleteLibModule,
        RouterModule.forChild(CompanyRoutes)
    ],
    declarations: [
        EmployeesComponent,
        DailyTasksComponent,
        FacilitiesComponent
    ],
    providers: [
        FormBuilder,
        DailyTasksService,
        EmployeesService,
        FaciitiesService
    ]
})
export class CompanyModule { }
