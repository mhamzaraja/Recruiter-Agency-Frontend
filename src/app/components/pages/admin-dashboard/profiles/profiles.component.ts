import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProfilesService } from "./services/profiles.service";

@Component({
    selector: 'app-profiles',
    templateUrl: './profiles.component.html',
    styleUrls: ['./profiles.component.scss', '../admin-dashboard.component.scss']
})
export class ProfilesComponent implements OnInit {

    userInfo = [];
    profile = [];
    education = [];
    experience = [];
    projects = [];
    skills = [];
    languages = [];



    constructor(private profilesService: ProfilesService,
        private toastr: ToastrService
    ) { }

    ngOnInit(): void {
        this.getAllProfilesData();
    }

    getAllProfilesData() {
        this.profilesService.findAllProfilesData().subscribe(
            (res) => {
                this.userInfo = res.data;
                this.profile = res.data[0].profile;
                this.education = res.data[1].education;
                this.experience = res.data[2].experience;
                this.projects = res.data[3].projects;
                this.skills = res.data[4].skills;
                this.languages = res.data[5].languages;
                console.log("userInfo: ", this.userInfo);
                // console.log("profile: ", this.profile);
                // console.log("education: ", this.education);
                // console.log("experience: ", this.experience);
                // console.log("projects: ", this.projects);
                // console.log("skills: ", this.skills);
                // console.log("languages: ", this.languages);
            },
            (error) => {
                this.toastr.error(error.error.message);
            });
    }
}
