import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/guards/auth.guard';
import { LoggedinGuard } from './components/guards/loggedin.guard';
import { RoleGuardGuard } from './components/guards/role-guard.guard';
import { AboutComponent } from './components/pages/about/about.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/pages/admin-login/admin-login.component';
import { AdminRegisterComponent } from './components/pages/admin-register/admin-register.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { CandidatesDetailsComponent } from './components/pages/candidates-details/candidates-details.component';
import { CandidatesComponent } from './components/pages/candidates/candidates.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { CompaniesComponent } from './components/pages/companies/companies.component';
import { CompanyCreateComponent } from './components/pages/companys/company-create/company-create.component';
import { CompanyListComponent } from './components/pages/companys/companyList/companyList.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { EmployerBasicInfoComponent } from './components/pages/employer-basic-info/employer-basic-info.component';
import { EmploerDashboardComponent } from './components/pages/employer-dashboard/dashboard.component';
import { EmployersDetailsComponent } from './components/pages/employers-details/employers-details.component';
import { EmployersLoginComponent } from './components/pages/employers-login/employers-login.component';
import { EmployersRegisterComponent } from './components/pages/employers-register/employers-register.component';
import { EmployersComponent } from './components/pages/employers/employers.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { FavouriteJobsComponent } from './components/pages/favourite-jobs/favourite-jobs.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { JobDetailsComponent } from './components/pages/job-details/job-details.component';
import { JobsComponent } from './components/pages/jobs/jobs.component';
import { LoginComponent } from './components/pages/login/login.component';
import { PostAJobComponent } from './components/pages/post-a-job/post-a-job.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { ResumeDetailsComponent } from './components/pages/resume-details/resume-details.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';

const routes: Routes = [
    
    // {    path: 'home-two',
    //     canActivate: [AuthGuard, RoleGuardGuard],
    //     data: {
    //         expectedRoles: ['ROLE_EMPLOYER']
    //     },
    //     component: HomeTwoComponent
    // },

    // {    path: 'home-three',
    //     canActivate: [AuthGuard, RoleGuardGuard],
    //     data: {
    //         expectedRoles: ['ROLE_SUPER_USER']
    //     },
    //     component: HomeThreeComponent
    // },

    // { 
    //     path: 'employers-login',
    //     component: EmployersLoginComponent 
    // },

    // { 
    //     path: 'admin/login', 
    //     component: AdminLoginComponent 
    // },
    
    // { 
    //     path: 'admin/register', 
    //     component: AdminRegisterComponent 
    // },

    {    path: '',
        component: HomeOneComponent
    },

    { 
        path: 'login',
        canActivate: [LoggedinGuard],
        component: LoginComponent
    },

    {
        path:'single-resume',
        canActivate: [AuthGuard],
        component: ResumeDetailsComponent
    },

    { 
        path: 'register',
        canActivate: [LoggedinGuard],
        component: RegisterComponent
    },

    {
        path: 'employers-register', 
        canActivate: [LoggedinGuard],
        component: EmployersRegisterComponent 
    },

    {    path: 'jobs',
        component: JobsComponent
    },

    {
        path: 'privacy-policy',
        component: PrivacyPolicyComponent
    },

    { 
        path: 'about',
        component: AboutComponent 
    },

    { 
        path: 'contact',
        component: ContactComponent 
    },

    {
        path:'terms-conditions',
        component: TermsConditionsComponent
    },

    {
        path: 'employers',
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['ROLE_SUPER_USER']
        },
        component: EmployersComponent
    },
    {
        path: 'testimonials',
        component: TestimonialsComponent
    },
    {
        path: 'faq',
        component: FaqComponent
    },
    {
        path: 'blog',
        component: BlogComponent
    },
    {
        path: 'blog-details',
        component: BlogDetailsComponent
    },
    {
        path: 'coming-soon',
        component: ComingSoonComponent
    },
    {
        path: 'error',
        component: ErrorComponent
    },
    
    
    {
        path: 'employers-details/:id',
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['ROLE_SUPER_USER']
        },
        component: EmployersDetailsComponent
    },
   
    {
        path: 'post-a-job',
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['ROLE_EMPLOYER']
        },
        component: PostAJobComponent
    },
    {
        path: 'pricing',
        component: PricingComponent
    },

    {
        path: 'favourite-jobs',
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['ROLE_CANDIDATE']
        },
        component: FavouriteJobsComponent
    },

    {
        path: 'admin/dashboard/:id',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['ROLE_SUPER_USER']
        },
        children: [
            {
                path: '',
                loadChildren: () => import('./components/pages/admin-dashboard/admin.module')
                    .then(m => m.AdminModule)
            }
        ]
    },

    {
        path: 'candidate/dashboard/:id',
        component: DashboardComponent,
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['ROLE_CANDIDATE']
        },
        children: [
            {
                path: '',
                loadChildren: () => import('./components/pages/dashboard/dashboard.module')
                    .then(m => m.DashboardModule)
            }
        ]
    },

    {
        path: 'companies',
        component: CompaniesComponent,
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['']
        },
        children: [
            {
                path: '',
                loadChildren: () => import('./components/pages/companies/company.module')
                    .then(m => m.CompanyModule)
            }
        ]
    },

    {
        path: 'employer/dashboard/:id',
        component: EmploerDashboardComponent,
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['ROLE_EMPLOYER']
        },
        children: [
            {
                path: '',
                loadChildren: () => import('./components/pages/employer-dashboard/dashboard.module')
                    .then(m => m.EmploerDashboardModule)
            }
        ]
    },

    {
        path: 'employer/dashboard/:id/profile/create',
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['ROLE_EMPLOYER']
        },
        component: EmployerBasicInfoComponent
    },

    {
        path: 'candidates',
        component: CandidatesComponent,
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ["ROLE_SUPER_USER", "ROLE_EMPLOYER"]
        },
    },
    {
        path: 'candidate-details/:id',
        component: CandidatesDetailsComponent,
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ["ROLE_SUPER_USER", "ROLE_EMPLOYER"]
        },
    },

    {
        path: 'job-details/:id',
        component: JobDetailsComponent
    },


    { 
        path: 'companies/create',
        component: CompanyCreateComponent,
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['ROLE_EMPLOYER']
        }
    },
    
    {
        path: 'companylist',
        component: CompanyListComponent,
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['ROLE_EMPLOYER']
        }
    },
    
    { 
        path: '**', 
        component: ErrorComponent 
    },

];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
