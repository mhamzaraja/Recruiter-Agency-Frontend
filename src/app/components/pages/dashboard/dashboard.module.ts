import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule} from "@angular/forms";
import { ReactiveFormsModule } from '@angular/forms';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { BasicInfoService } from './basic-info/services/basic-info.service';
import { EducationService } from './education/services/education.service';
import { ExperienceService } from './experience/services/experience.service';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { SkillsLanguagesComponent } from './skills-languages/skills-languages.component';
import { DashboardRoutes } from './dashboard.routing';
import { SkillsLanguagesService } from './skills-languages/services/skills-languages.service';
import { ProjectComponent } from './project/project.component';
import { ProjectService } from './project/services/project.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AutocompleteLibModule,
        RouterModule.forChild(DashboardRoutes)
    ],
    declarations: [
        BasicInfoComponent,
        EducationComponent,
        ExperienceComponent,
        SkillsLanguagesComponent,
        ProjectComponent
    ],
    providers:[
        FormBuilder,
        BasicInfoService,
        EducationService,
        ExperienceService,
        ProjectService,
        SkillsLanguagesService
    ]
})
export class DashboardModule { }
