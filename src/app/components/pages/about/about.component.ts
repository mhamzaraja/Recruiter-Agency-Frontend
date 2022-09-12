import { Component, OnInit } from '@angular/core';
import { AboutService } from './about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  company: any;
  constructor(private AboutService: AboutService) { }

  ngOnInit(): void {
    this.getAnalytics();
  }

  getAnalytics(){
    this.AboutService.analyticDataApi().subscribe((res)=>{
      this.company = res.data;    
    })
  }

}
