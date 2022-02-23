import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { EmploerDashboardRoutes } from './dashboard.routing';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AutocompleteLibModule,
        RouterModule.forChild(EmploerDashboardRoutes)
    ],
    declarations: [
    ],
    providers:[
        FormBuilder,
    ]
})
export class EmploerDashboardModule { }
