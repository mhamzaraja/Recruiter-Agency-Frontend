import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './components/guards/auth.guard';
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
    { path: '', component: HomeOneComponent },
    { path: 'home-two', component: HomeTwoComponent },
    { path: 'home-three', component: HomeThreeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'jobs', component: JobsComponent },
    // {path:'favourite-jobs', component: FavouriteJobsComponent},
    { path: 'privacy-policy', component: PrivacyPolicyComponent },
    { path: 'about', component: AboutComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'terms-conditions', component: TermsConditionsComponent },
    { path: 'employers-login', component: EmployersLoginComponent },
    { path: 'employers-register', component: EmployersRegisterComponent },


    {
        path: 'employers',
        canActivate: [AuthGuard],
        component: EmployersComponent
    },
    {
        path: 'testimonials',
        canActivate: [AuthGuard],
        component: TestimonialsComponent
    },
    {
        path: 'faq',
        component: FaqComponent
    },
    {
        path: 'blog',
        canActivate: [AuthGuard],
        component: BlogComponent
    },
    {
        path: 'blog-details',
        canActivate: [AuthGuard],
        component: BlogDetailsComponent
    },
    {
        path: 'coming-soon',
        canActivate: [AuthGuard],
        component: ComingSoonComponent
    },
    {
        path: 'error',
        canActivate: [AuthGuard],
        component: ErrorComponent
    },


    {
        path: 'employer-details',
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['']
        },
        component: EmployersDetailsComponent
    },
    {
        path: 'single-resume',
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['']
        },
        component: ResumeDetailsComponent
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
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['ROLE_EMPLOYER']
        },
        component: PricingComponent
    },
    {
        path: 'favourite-jobs',
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ['ROLE_EMPLOYER']
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
        canActivate: [AuthGuard, RoleGuardGuard],
        data: {
            expectedRoles: ["ROLE_SUPER_USER", "ROLE_CANDIDATE", "ROLE_EMPLOYER"]
        },
        component: JobDetailsComponent
    },


    { path: 'companies/create', component: CompanyCreateComponent },

    { path: 'employer/login', component: EmployersLoginComponent },
    { path: 'employer/register', component: EmployersRegisterComponent },

    // ADMIN
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'admin/register', component: AdminRegisterComponent },

    { path: '**', component: ErrorComponent } // This line will remain down from the whole component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
