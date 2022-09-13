import { Component, OnInit } from '@angular/core';
import { HomeOneService } from './home-one.service';

@Component({
  selector: 'app-home-one',
  templateUrl: './home-one.component.html',
  styleUrls: ['./home-one.component.scss']
})
export class HomeOneComponent implements OnInit {

  analytics = [];
  company: any;

  constructor(private HomeOneService: HomeOneService) { }

  ngOnInit(): void {
    this.getAnalytics();
  }

  getAnalytics(){
    this.HomeOneService.analyticDataApi().subscribe((res)=>{
      // this.analytics = res.data;
      // console.log("dataaaa", this.analytics);

            this.company = res.data;
            console.log("Datata",this.company);
      
    })
  }

}
