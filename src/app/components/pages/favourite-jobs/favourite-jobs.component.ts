import { Component, OnInit } from '@angular/core';
import { FavouriteService } from './services/favourite.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-favourite-jobs',
  templateUrl: './favourite-jobs.component.html',
  styleUrls: ['./favourite-jobs.component.scss']
})
export class FavouriteJobsComponent implements OnInit {

  favJobs = [];
  p: number = 1;
  userId: number;

  constructor(
    private favouriteService: FavouriteService,
    private toaster: ToastrService,
    private router: Router,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getAllFavJobs();

  }
  getAllFavJobs() {
    this.favouriteService.findAllFavJobs(this.userId).subscribe(
      (res) => {
        console.log("resssss", res)
        this.favJobs = res.data;
        console.log("data122 ", this.favJobs)
      },
      (error) => {
        this.toaster.error(error.error.message)
      }
    )
  }

  deletFav(i: number) {
    this.userId = this.favJobs[i].candidate_favourite_jobs[0].id;
    this.favouriteService.deleteFavJobs(this.userId).subscribe((res) => {
      this.toaster.success("Deleted Successfully")
    })
  }
}


