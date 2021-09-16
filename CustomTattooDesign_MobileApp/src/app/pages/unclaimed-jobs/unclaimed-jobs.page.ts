import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Job } from 'src/app/model/job';
import { ArtistApiService } from 'src/app/services/artist-api.service';

@Component({
  selector: 'app-unclaimed-jobs',
  templateUrl: './unclaimed-jobs.page.html',
  styleUrls: ['./unclaimed-jobs.page.scss'],
})
export class UnclaimedJobsPage implements OnInit {

  unclaimedJobs : Job[] = [];
  sendData : NavigationExtras;

  constructor(private artistService : ArtistApiService, 
              private router : Router ) { }

  ngOnInit() {
    this.getUnclaimedJobs();
  }

  getUnclaimedJobs() {
    this.unclaimedJobs = [];
    var tempJob : Job;

    this.artistService.getUnclaimedJobs().then(
      data => {
        let jobs = data as Array<Object>;
        jobs.forEach(j => {
          tempJob = {
            jobId: j["jobId"],
            status: "Needs Designer",
            title: j["title"],
            customerName: j["customerName"],
            tattooLocation: j["tattooLocation"],
            tattooType: j["tattooType"],
            tattooStyle: j["tattooStyle"],
            color: j["color"],
            commission: Math.round(j["commission"] * 100) / 100,
            description: j["description"]
          }
          this.unclaimedJobs.push(tempJob);
        });
      }
    ).catch(
      err => {
        console.log(err)
      }
    );  
  }

  viewJobDetails(job) {
    this.sendData = { state: { job : job } };

    this.router.navigate(['job-details'], this.sendData).catch(err => 
      console.log(err)
    );
  }
}
