import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Job } from 'src/app/model/job';
import { ArtistApiService } from 'src/app/services/artist-api.service';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.page.html',
  styleUrls: ['./job-details.page.scss'],
})
export class JobDetailsPage implements OnInit {

  job : Job;

  constructor(private router : Router, 
              private artistService : ArtistApiService,
              private storage : Storage,
              private alertController : AlertController) { 
                
    if (this.router.getCurrentNavigation().extras.state) {
      this.job = this.router.getCurrentNavigation().extras.state.job;
    }
  }

  ngOnInit() {
  }

  claimJob(job : Job) {
    this.storage.get("ARTIST").then(artist => {
      this.artistService.claimJob(artist, job.jobId).then(result => {
        this.alertAction(result as boolean)
      })
    });
  }

  async alertAction(result : boolean) {

    var header = "Job Claim Failed"
    var message = "You were unable to claim this job, as another artist has taken it already."

    if (result) {
      header = "Job Claim Successful"
      message = "You have successfully claimed this job, good luck with your new assignment!"
    }

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let navTransition = alert.dismiss();
            navTransition.then(() => {
                this.router.navigate(["artist-landing"]);
            });
            return false;
          }
        }
      ]
    });
    await alert.present();
  }
}
