import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CandidatesService } from "./services/candidates.service";
import userToken from '../../config/userToken';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-candidates',
    templateUrl: './candidates.component.html',
    styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit, OnDestroy {
    userRole: any = userToken.role;
    candidatesInfo: any = [];
    filterArray = [];
    candidatesEducation = [];
    candidatesExperience = [];
    candidatesProjects = [];
    candidatesSkills = [];
    candidatesLanguages = [];
    summary: any;
    closeResult = '';
    candId: number;




    constructor(
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute,
        private candidatesService: CandidatesService,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.getCandidates();
    }

    getCandidates() {
        let eId = this.candId;
        this.candidatesService.getAllCandidates().subscribe(
            (res) => {
                this.candidatesInfo = res.data;

                const newarray = res.data.filter((el) => eId === el.id);
                this.filterArray = newarray;

                this.candidatesEducation = this.filterArray[0].candidate_educations;
                this.candidatesExperience = this.filterArray[0].candidate_experiences;
                this.candidatesProjects = this.filterArray[0].candidate_projects;
                this.candidatesLanguages = this.filterArray[0].candidate_languages;
                this.candidatesSkills = this.filterArray[0].candidate_skills;
            },
            (error) => {
                //if (error.status == 401) this.router.navigate(['/login']);
                this.toastr.error(error.error.message);
            });
    }

    // currentWork(currentWork: boolean, i: number) {
    //     let currentWorkValue = "Unemployed";
    //     if (currentWork) {
    //         console.log(this.candExperience[i].jobTitle);
    //         return currentWorkValue = this.candExperience[i].jobTitle;
    //     }
    //     else {
    //         return currentWorkValue;
    //     }
    // }


    //Delete Candidate
    async delCand(i: number) {
        let datad = {
            // ProfID: res.data[0].profile[0].id
            ProfID: this.candidatesInfo[i].id
        }
        localStorage.setItem('candID', JSON.stringify(datad));
        let candId = this.candidatesInfo[i].userId;
        (await this.candidatesService.deleteCandidate(candId)).subscribe(
            (res) => {
                if (res.success == true) {
                    this.toastr.success(res.message);
                    this.getCandidates();
                } else {
                    this.toastr.error(res.error.message);
                }
            });
    }
    //Download CV
    public openPDF(): void {
        // window.print()
        let DATA: any = document.getElementById('htmlData');
        // document.getElementById('noScreen').style.opacity = '1';
        html2canvas(DATA).then((canvas) => {
            let fileWidth = 80;
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
    openXl(content: any, i: number) {
        this.candId = i
        this.modalService.open(content, { size: 'xl' });
        this.getCandidates();


    }
    ngOnDestroy(): void {

    }

}
