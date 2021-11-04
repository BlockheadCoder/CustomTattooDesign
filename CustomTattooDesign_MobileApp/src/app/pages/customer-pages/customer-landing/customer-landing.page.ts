import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Job } from 'src/app/model/job';

@Component({
  selector: 'app-customer-landing',
  templateUrl: './customer-landing.page.html',
  styleUrls: ['./customer-landing.page.scss'],
})
export class CustomerLandingPage implements OnInit {

  job : Job = {
    "jobId" : 0,
    "status" : "",
    "title" : "",
    "customerName" : "",
    "tattooLocation" : "",
    "tattooType" : "",
    "tattooStyle" : "",
    "color" : false,
    "commission" : 0.0,
    "description" : "",
    "conversation" : []
  };

  constructor(private storage : Storage) { }

  ngOnInit() {
    this.storage.get("JOB").then(job => {
      this.job = job;
    });
  }

}
