import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Job } from 'src/app/model/job';
import { ArtistApiService } from 'src/app/services/artist-api.service';

@Component({
  selector: 'app-unclaimed-jobs',
  templateUrl: './unclaimed-jobs.page.html',
  styleUrls: ['./unclaimed-jobs.page.scss'],
})
export class UnclaimedJobsPage implements OnInit {

  unclaimedJobs : Job[] = [];
  tempJob : Job;

  constructor(private artistService : ArtistApiService, private storage : Storage) { }

  ngOnInit() {
    this.getUnclaimedJobs();
    this.storage.get("ARTIST").then(artist =>
      this.artistService.getArtistJobs(artist)
    )
  }

  getUnclaimedJobs() {
    this.unclaimedJobs = [];

    this.artistService.getUnclaimedJobs().then(
      data => {
        let jobs = data as Array<Object>;
        jobs.forEach(j => {
          this.tempJob = {
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
          this.unclaimedJobs.push(this.tempJob);
        });
      }
    ).catch(
      err => {
        console.log(err)
      }
    );  
  }
}
