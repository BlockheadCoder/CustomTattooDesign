import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Job } from 'src/app/model/job';
import { LoginAPIService } from 'src/app/services/login-api.service';
import { CustomerApiService } from 'src/app/services/customer-api.service';

@Component({
  selector: 'app-customer-code-entry',
  templateUrl: './customer-code-entry.page.html',
  styleUrls: ['./customer-code-entry.page.scss'],
})
export class CustomerCodeEntryPage implements OnInit {

  errorMsg = "";
  customerCode = "";

  constructor(private loginAPIService : LoginAPIService,
              private customerService : CustomerApiService,
              private router : Router,
              private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
  }

  login() {
    this.errorMsg = "";

    if (this.customerCode.trim() == "") {
      this.errorMsg = "Customer code cannot be empty.";
      return;
    }

    // calls API
    this.loginAPIService.customerLogin(this.customerCode).then(
      jobData => { 
        if (jobData != null || jobData["status"] == 500) {
          var job : Job = this.createJob(jobData);
          this.customerService.setMessages(job);
          this.customerService.getDesignImages(job).then(diData => {
            if (diData != null || diData["status"] == 500) {
              this.customerService.setDesignImages(job, diData);
              this.storage.set("JOB", job).then(() => {
                this.goCustomerLandingPage();
             });
            } else {
              this.errorMsg = "Design retrieval failed";
            }
          })
        } else {
          this.errorMsg = "Incorrect Username or Password";
        }
      }
    ).catch(err => { 
      this.errorMsg = "Invalid Code."; 
    });
  }

  createJob(userData : Object) : Job {
    var job : Job = {
      "jobId" : userData["jobId"],
      "status" : userData["state"],
      "title" : userData["title"],
      "customerName" : userData["customerName"],
      "tattooLocation" : userData["tattooLocation"],
      "tattooType" : userData["tattooType"],
      "tattooStyle" : userData["tattooStyle"],
      "color" : userData["color"],
      "commission" : userData["commision"],
      "description" : userData["description"],
      "conversation" : userData["messages"],
      "designImages" : [],
      "artistName" : userData["artistFirstName"] + " " + userData["artistLastName"]
    }
    return job;
  }

  goCustomerLandingPage() {
    this.router.navigate(['customer-landing']);
  }
}
