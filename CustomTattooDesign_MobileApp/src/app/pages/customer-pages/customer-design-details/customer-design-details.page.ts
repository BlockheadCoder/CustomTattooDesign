import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Job } from 'src/app/model/job';

@Component({
  selector: 'app-customer-design-details',
  templateUrl: './customer-design-details.page.html',
  styleUrls: ['./customer-design-details.page.scss'],
})
export class CustomerDesignDetailsPage implements OnInit {
  job : Job = {
    jobId: 0,
    status: "",
    title: "",
    customerName: "",
    tattooLocation: "",
    tattooStyle: "",
    tattooType: "",
    color: false,
    commission: 0,
    description: "",
    conversation: [],
    designImages: []
  };

  constructor(private router : Router, 
    private storage : Storage) { }

  ngOnInit() {
    this.storage.get("JOB").then(job => {
      this.job = job;
      if (this.job.status == 'queued') {
        this.job.status = 'Needs Designer';
      }
    });
  }

  goViewDesignImages() {
    this.router.navigate(['customer-design-images']);
  }

  goConversation() {
    this.router.navigateByUrl("/customer-message");
  }
}
