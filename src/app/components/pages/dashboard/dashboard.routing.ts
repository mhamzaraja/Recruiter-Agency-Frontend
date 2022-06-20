import { Routes } from '@angular/router';
import { ResumeDetailsComponent } from '../resume-details/resume-details.component';
import { BasicInfoComponent } from './basic-info/basic-info.component';
import { EducationComponent } from './education/education.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectComponent } from './project/project.component';
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
    },
    {
        path: 'projects',
        component: ProjectComponent,
        data: {
            title: 'Projects'
        }
    },
    {
        path: 'skillsLanguages',
        component: SkillsLanguagesComponent,
        data: {
            title: 'Skills and Languages'
        }
    },
    {
        path: 'single-resume',
        component: ResumeDetailsComponent,
        data: {
            title: 'My Resume'
        }
    }

];
