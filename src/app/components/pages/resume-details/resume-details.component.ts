import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResumeService } from './services/resume.service';

@Component({
    selector: 'app-resume-details',
    templateUrl: './resume-details.component.html',
    styleUrls: ['./resume-details.component.scss'],
})
export class ResumeDetailsComponent implements OnInit {
    public educationInfo = [];
    public experienceInfo = [];
    public basicInfo: [];
    summary: any;
    public projectsInfo: [];
    public skillInfo: [];
    designation: string;
    public languageInfo: [];

    constructor(
        private resumeService: ResumeService,
        private toastr: ToastrService
    ) {}

    ngOnInit(): void {
        this.getAllEducations();
        this.getAllExperience();
        this.getUser();
        this.getAllProjects();
        this.getAllSkills();
        this.getAllLanguages();
    }
    //Education
    getAllEducations() {
        this.resumeService.findAllEducations().subscribe(
            (res) => {
                this.educationInfo = res.data;
                console.log('Results', this.educationInfo);
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            }
        );
    }

    //Experience
    getAllExperience() {
        this.resumeService.findAllExperiences().subscribe(
            (res) => {
                this.experienceInfo = res.data;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            }
        );
    }
    //Basic Info
    getUser() {
        this.resumeService.findUsers().subscribe(
            (res) => {
                this.basicInfo = res.data[0].profile;

                // if (this.basicInfo.length > 0) {
                //     this.summary = this.basicInfo[0].summary;
                // } else {
                //     this.summary = 'Hi i have not updated my information yet!';
                // }
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            }
        );
    }

    //Projects
    getAllProjects() {
        this.resumeService.findAllProjects().subscribe(
            (res) => {
                this.projectsInfo = res.data;
                // console.log('project data: ', this.projectsInfo);
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            }
        );
    }

    //Skills

    getAllSkills() {
        this.resumeService.findAllSkill().subscribe(
            (res) => {
                this.skillInfo = res.data;
                // console.log(this.skillInfo);
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            }
        );
    }

    //languages
    getAllLanguages() {
      this.resumeService.findAllLanguages().subscribe(
          (res) => {
              this.languageInfo = res.data;
          },
          (error) => {
              //if (error.status == 401) this.router.navigate(['/login']);
              this.toastr.error(error.error.message);
          });
  }
}