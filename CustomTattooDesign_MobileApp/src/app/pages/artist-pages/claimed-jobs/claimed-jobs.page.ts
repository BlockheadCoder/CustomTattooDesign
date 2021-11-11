import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Job } from 'src/app/model/job';
import { ArtistApiService } from 'src/app/services/artist-api.service';

@Component({
  selector: 'app-claimed-jobs',
  templateUrl: './claimed-jobs.page.html',
  styleUrls: ['./claimed-jobs.page.scss'],
})
export class ClaimedJobsPage implements OnInit {

  segmentValue = "inProgress";

  inProgressJobs : Job[] = [];
  approvedJobs : Job[] = [];
  completedJobs : Job[] = [];

  sendData : NavigationExtras;

  constructor(private artistService : ArtistApiService, 
              private storage : Storage,
              private router : Router) { }

  ngOnInit() {
    this.getClaimedJobs();
  }

  async getClaimedJobs() {
    this.storage.get("ARTIST").then(artist =>
      this.artistService.getClaimedJobs(artist).then(data => {
        let jobs = data as Array<Object>;
        var tempJob : Job;

        jobs.forEach(j => {
          tempJob = {
            jobId: j["jobId"],
            status: j["state"],
            title: j["title"],
            customerName: j["customerName"],
            tattooLocation: j["tattooLocation"],
            tattooType: j["tattooType"],
            tattooStyle: j["tattooStyle"],
            color: j["color"],
            commission: Math.round(j["commission"] * 100) / 100,
            description: j["description"],
            conversation: [],
            designImages: []
          }
          
          if (["draft", "claimed", "phase_one", "phase_two"].includes(tempJob.status)) {
            this.inProgressJobs.push(tempJob);
          } else if (tempJob.status == "paid") {
            this.approvedJobs.push(tempJob);
          } else if (tempJob.status == "complete") {
            this.completedJobs.push(tempJob);
          }
        })
      }).catch(err => console.log(err))
    );
  }

  viewJobDetails(job) {
    this.sendData = { state: { job : job } };

    this.router.navigate(['job-details'], this.sendData).catch(err => 
      console.log(err)
    );
  }
}
