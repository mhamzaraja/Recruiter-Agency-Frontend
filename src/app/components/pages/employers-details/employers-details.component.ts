import { Component, OnInit } from '@angular/core';
import { EmployersDetailsService } from './service/employers-details.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employers-details',
  templateUrl: './employers-details.component.html',
  styleUrls: ['./employers-details.component.scss']
})
export class EmployersDetailsComponent implements OnInit {

  id: number = this.route.snapshot.params.id;;
  public empBasicInfo: any;

  constructor(private employerDetailsService: EmployersDetailsService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService ) { }

  ngOnInit(): void {
    this.getAllCandidateData();
  }

  getAllCandidateData() {
        
    this.employerDetailsService.getemployerdata(this.id).subscribe(
        (res) => {
          console.log("dgsdgfss", res.data);
           this.empBasicInfo = res.data;
           
        },
        (error) => {
            this.toastr.error(error.error.message);
        });
  }

}
