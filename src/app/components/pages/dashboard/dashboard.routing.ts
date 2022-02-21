import { Routes } from '@angular/router';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { DashboardComponent } from './dashboard.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { SkillsLanguagesComponent } from './skills-languages/skills-languages.component';

export const DashboardRoutes: Routes = [

    {
        path: '',
        component: BasicInfoComponent,
        data: {
            title: 'Basic Info'
        }
    },
    {
        path: 'education',
        component: EducationComponent,
        data: {
            title: 'Education'
        }
    },
    {
        path: 'experience',
        component: ExperienceComponent,
        data: {
            title: 'Experience'
        }
    }
    ,
    {
        path: 'skillsLanguages',
        component: SkillsLanguagesComponent,
        data: {
            title: 'Skills and Languages'
        }
    }

];
