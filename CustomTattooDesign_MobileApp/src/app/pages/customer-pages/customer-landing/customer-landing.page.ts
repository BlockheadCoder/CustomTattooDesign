import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Job } from 'src/app/model/job';
import { LoginAPIService } from 'src/app/services/login-api.service';

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
    "conversation" : [],
    "designImages" : [],
    "artistName": ""
  };

  constructor(private storage : Storage,
              private router : Router,
              private loginService : LoginAPIService) { }

  ngOnInit() {
    this.storage.get("JOB").then(job => {
      this.job = job;
    });
  }

  logout() {
    this.storage.remove("JOB").then(() => {
      this.loginService.unAuthenticateCustomer();
      this.router.navigateByUrl("/home")
    })
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
