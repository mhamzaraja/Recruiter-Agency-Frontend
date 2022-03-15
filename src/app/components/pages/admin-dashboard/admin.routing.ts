import { Routes } from '@angular/router';
import { JobsComponent } from './jobs/jobs.component';
import { ResumeComponent } from './resume/resume.component';
import { ProfessionalsComponent } from './professionals/professionals.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { JobsApplicationsComponent } from './jobs-applications/jobs-applications.component';

export const AdminRoutes: Routes = [

    {
        path: '',
        component: ProfessionalsComponent,
        data: {
            title: 'Professionals Controls'
        }
    },
    {
        path: 'jobs',
        component: JobsComponent,
        data: {
            title: 'Jobs Controls'
        }
    },
    {
        path: 'candidates',
        component: CandidatesComponent,
        data: {
            title: 'Candidates Controls'
        }
    }
    ,
    {
        path: 'resumes',
        component: ResumeComponent,
        data: {
            title: 'Resume Controls'
        }
    },
    {
        path: 'jobs/job-applications/:id',
        component: JobsApplicationsComponent,
        data: {
            title: 'Applications Controls'
        }
    }

];
