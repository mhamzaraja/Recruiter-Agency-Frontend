import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EmployerService } from './services/employer.service';
@Component({
  selector: 'app-employers',
  templateUrl: './employers.component.html',
  styleUrls: ['./employers.component.scss']
})
export class EmployersComponent implements OnInit {

  employerInfo = []

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private employerService: EmployerService
  ) { }

  ngOnInit(): void {
    this.getEmployers();
  }


  getEmployers() {
    this.employerService.getAllEmployers().subscribe(
      (res) => {
        this.employerInfo = res.data;
      },
      (error) => {
        //if (error.status == 401) this.router.navigate(['/login']);
        this.toastr.error(error.error.message);
      });
  }
}
