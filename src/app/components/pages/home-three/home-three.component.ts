import { Component, OnInit } from '@angular/core';
import { HomeThreeService } from './home-three.service';

@Component({
  selector: 'app-home-three',
  templateUrl: './home-three.component.html',
  styleUrls: ['./home-three.component.scss']
})
export class HomeThreeComponent implements OnInit {
  company: any;

  constructor(private HomeThreeService:HomeThreeService) { }

  ngOnInit(): void {
    this.getAnalytics();
  }

  getAnalytics(){
    this.HomeThreeService.analyticDataApi().subscribe((res)=>{
      // this.analytics = res.data;
      // console.log("dataaaa", this.analytics);

            this.company = res.data;
            console.log("Datata",this.company);
      
    })
  }

}
