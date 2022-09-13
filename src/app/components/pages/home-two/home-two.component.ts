import { Component, OnInit } from '@angular/core';
import { HomeTwoService } from './home-two.service';

@Component({
  selector: 'app-home-two',
  templateUrl: './home-two.component.html',
  styleUrls: ['./home-two.component.scss']
})
export class HomeTwoComponent implements OnInit {
  company: any;

  constructor(private HomeTwoService:HomeTwoService) { }

  ngOnInit(): void {
    this.getAnalytics();
  }

  getAnalytics(){
    this.HomeTwoService.analyticDataApi().subscribe((res)=>{
      // this.analytics = res.data;
      // console.log("dataaaa", this.analytics);

            this.company = res.data;
            console.log("Datata",this.company);
      
    })
  }

}
