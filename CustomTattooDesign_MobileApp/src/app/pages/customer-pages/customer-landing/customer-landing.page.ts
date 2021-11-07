import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Job } from 'src/app/model/job';

@Component({
  selector: 'app-customer-landing',
  templateUrl: './customer-landing.page.html',
  styleUrls: ['./customer-landing.page.scss'],
})
export class CustomerLandingPage implements OnInit {

  @ViewChild('img_test') img_test: ElementRef;
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

  constructor(private storage : Storage,
              private router : Router) { }

  ngOnInit() {
    this.storage.get("JOB").then(job => {
      this.job = job;
    });

    /*
    var img = new Image();
    img.src = "src/app/assets/download.jpeg";
    this.img_test.nativeElement.innerHTML = img;
    */
  }

  goConversation() {
    this.router.navigateByUrl("/customer-message");
  }

  goDesignDetails() {
    this.router.navigateByUrl("/customer-design-details");
  }

  goDesigns() {
    this.router.navigateByUrl("/customer-design-images");
  }

}
