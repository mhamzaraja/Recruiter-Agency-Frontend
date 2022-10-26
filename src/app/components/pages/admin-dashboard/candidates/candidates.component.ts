import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { CandidatesService } from "./services/candidates.service";

@Component({
    selector: 'app-candidates',
    templateUrl: './candidates.component.html',
    styleUrls: ['./candidates.component.scss']
})
export class CandidatesComponent implements OnInit, OnDestroy {

    candidatesInfo: any = [];
    filterArray = [];
    candidatesEducation = [];
    candidatesExperience = [];
    candidatesProjects = [];
    candidatesSkills = [];
    candidatesLanguages = [];
    candId: number;

    constructor(private toastr: ToastrService,
        private candidatesService: CandidatesService,
        private router: Router,
        private modalService: NgbModal
    ) { }

    ngOnInit(): void {
        this.getAllCandidatesData()
    }

    getAllCandidatesData() {
        let eId = this.candId;
        this.candidatesService.findAllCandidatesData().subscribe(
            (res) => {
                // console.log("cand data", res.data[eId].candidate_educations);
                this.candidatesInfo = res.data;
                console.log(eId,"eid now")
                const newarray = res.data.filter((el)=>eId === el.id);
                this.filterArray = newarray;
                console.log("newarray", newarray);
                console.log("filtered", this.filterArray);
                
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
                    this.getAllCandidatesData();
                } else {
                    this.toastr.error(res.error.message);
                }
            });
    }

    openXl(content: any, i: number) {
        this.candId = i;
        console.log(this.candId);
        
        this.modalService.open(content, { size: 'xl'});
        this.getAllCandidatesData();
    }

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

    ngOnDestroy() {
        // if(this.getAllCandidatesData) this.getAllCandidatesData.unsubscribe();
    }
}
