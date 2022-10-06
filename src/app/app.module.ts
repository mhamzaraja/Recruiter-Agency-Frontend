import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeOneComponent } from './components/pages/home-one/home-one.component';
import { HomeTwoComponent } from './components/pages/home-two/home-two.component';
import { HomeThreeComponent } from './components/pages/home-three/home-three.component';
import { PreloaderComponent } from './components/common/preloader/preloader.component';
import { NavbarStyleOneComponent } from './components/common/navbar-style-one/navbar-style-one.component';
import { FooterStyleOneComponent } from './components/common/footer-style-one/footer-style-one.component';
import { NavbarStyleTwoComponent } from './components/common/navbar-style-two/navbar-style-two.component';
import { NavbarStyleThreeComponent } from './components/common/navbar-style-three/navbar-style-three.component';
import { FooterStyleTwoComponent } from './components/common/footer-style-two/footer-style-two.component';
import { LoginComponent } from './components/pages/login/login.component';
import { RegisterComponent } from './components/pages/register/register.component';
import { EmployersComponent } from './components/pages/employers/employers.component';
import { EmployersDetailsComponent } from './components/pages/employers-details/employers-details.component';
import { DashboardComponent } from './components/pages/dashboard/dashboard.component';
import { ResumeDetailsComponent } from './components/pages/resume-details/resume-details.component';
import { TestimonialsComponent } from './components/pages/testimonials/testimonials.component';
import { PricingComponent } from './components/pages/pricing/pricing.component';
import { FaqComponent } from './components/pages/faq/faq.component';
import { ComingSoonComponent } from './components/pages/coming-soon/coming-soon.component';
import { ErrorComponent } from './components/pages/error/error.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { AboutComponent } from './components/pages/about/about.component';
import { JobsComponent } from './components/pages/jobs/jobs.component';
import { FavouriteJobsComponent } from './components/pages/favourite-jobs/favourite-jobs.component';
import { JobDetailsComponent } from './components/pages/job-details/job-details.component';
import { PostAJobComponent } from './components/pages/post-a-job/post-a-job.component';
import { CandidatesComponent } from './components/pages/candidates/candidates.component';
import { CandidatesDetailsComponent } from './components/pages/candidates-details/candidates-details.component';
import { BlogDetailsComponent } from './components/pages/blog-details/blog-details.component';
import { BlogComponent } from './components/pages/blog/blog.component';
import { ContactComponent } from './components/pages/contact/contact.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';


import {AutocompleteLibModule} from 'angular-ng-autocomplete';

import { EmploerDashboardComponent } from './components/pages/employer-dashboard/dashboard.component';
import { EmployersLoginComponent } from './components/pages/employers-login/employers-login.component';
import { EmployersRegisterComponent } from './components/pages/employers-register/employers-register.component';
import { CompanyListComponent } from './components/pages/companys/companyList/companyList.component';
import { CompanyCreateComponent } from './components/pages/companys/company-create/company-create.component';
import { CompanyEditComponent } from './components/pages/companys/company-edit/company-edit.component';
import { EmployerBasicInfoComponent } from './components/pages/employer-basic-info/employer-basic-info.component';
import { AdminDashboardComponent } from './components/pages/admin-dashboard/admin-dashboard.component';
import { CompaniesComponent } from './components/pages/companies/companies.component';
import { AdminRegisterComponent } from './components/pages/admin-register/admin-register.component';
import { AdminLoginComponent } from './components/pages/admin-login/admin-login.component';
import { NgbDatepickerModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { LoggedinGuard } from './components/guards/loggedin.guard';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    HomeOneComponent,
    HomeTwoComponent,
    HomeThreeComponent,
    PreloaderComponent,
    NavbarStyleOneComponent,
    FooterStyleOneComponent,
    NavbarStyleTwoComponent,
    NavbarStyleThreeComponent,
    FooterStyleTwoComponent,
    LoginComponent,
    RegisterComponent,
    EmployersComponent,
    EmployersDetailsComponent,
    DashboardComponent,
    ResumeDetailsComponent,
    TestimonialsComponent,
    PricingComponent,
    FaqComponent,
    ComingSoonComponent,
    ErrorComponent,
    PrivacyPolicyComponent,
    TermsConditionsComponent,
    AboutComponent,
    JobsComponent,
    FavouriteJobsComponent,
    JobDetailsComponent,
    PostAJobComponent,
    CandidatesComponent,
    CandidatesDetailsComponent,
    BlogDetailsComponent,
    BlogComponent,
    ContactComponent,
    EmploerDashboardComponent,
    CompanyListComponent,
    EmployersLoginComponent,
    EmployersRegisterComponent,
    CompanyCreateComponent,
    CompanyEditComponent,
    EmployerBasicInfoComponent,
    AdminDashboardComponent,
    CompaniesComponent,
    AdminRegisterComponent,
    AdminLoginComponent
  ],
  imports: [
    NgxPaginationModule,
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AutocompleteLibModule,
    BrowserAnimationsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    NgbModule,
    NgbDatepickerModule
  ],
  providers: [LoggedinGuard, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
