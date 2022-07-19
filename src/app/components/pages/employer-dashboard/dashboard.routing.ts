import { Routes } from '@angular/router';

export const EmploerDashboardRoutes: Routes = [

    {
        path: '',
        // component: BasicInfoComponent,
        data: {
            title: 'Basic Info'
        }
    },
    {
        path: 'experience',
        // component: ExperienceComponent,
        data: {
            title: 'Experience'
        }
    }
    ,
    {
        path: 'skillsLanguages',
        // component: SkillsLanguagesComponent,
        data: {
            title: 'Skills and Languages'
        }
    },
];
