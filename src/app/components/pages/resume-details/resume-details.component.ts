import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ResumeService } from './services/resume.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-resume-details',
    templateUrl: './resume-details.component.html',
    styleUrls: ['./resume-details.component.scss'],
})
export class ResumeDetailsComponent implements OnInit {
    @ViewChild('htmlData') htmlData!: ElementRef; //CV download
    public educationInfo = [];
    public experienceInfo = [];
    public basicInfo: [];
    summary: any;
    public projectsInfo: [];
    public skillInfo: [];
    designation: string;
    public languageInfo: [];
    hidden=false;
    closeResult = '';

    constructor(
        private resumeService: ResumeService,
        private toastr: ToastrService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.getAllEducations();
        this.getAllExperience();
        this.getUser();
        this.getAllProjects();
        this.getAllSkills();
        this.getAllLanguages();
    }
    //Education
    async getAllEducations() {
        (await this.resumeService.findAllEducations()).subscribe(
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
    async getAllExperience() {
        (await this.resumeService.findAllExperiences()).subscribe(
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
    async getAllProjects() {
        (await this.resumeService.findAllProjects()).subscribe(
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

    async getAllSkills() {
        (await this.resumeService.findAllSkill()).subscribe(
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
    async getAllLanguages() {
        (await this.resumeService.findAllLanguages()).subscribe(
            (res) => {
                this.languageInfo = res.data;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    //Download CV
    public openPDF(): void {
        // window.print()
        let DATA: any = document.getElementById('htmlData');
        // document.getElementById('noScreen').style.opacity = '1';
        html2canvas(DATA).then((canvas) => {
            let fileWidth = 100;
            let fileHeight = (canvas.height * fileWidth) / canvas.width;
            const FILEURI = canvas.toDataURL('image/png');
            let PDF = new jsPDF('p', 'mm', 'a4');
            let position = 0;
            PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
            // document.getElementById('noScreen').style.opacity = '0';
            PDF.save('Resume.pdf');
        });
    }

    //Resume Dialog Box
    openXl(content) {
        this.modalService.open(content, { size: 'xl'});
      }
}