import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Job } from 'src/app/model/job';
import { LoginAPIService } from 'src/app/services/login-api.service';

@Component({
  selector: 'app-customer-code-entry',
  templateUrl: './customer-code-entry.page.html',
  styleUrls: ['./customer-code-entry.page.scss'],
})
export class CustomerCodeEntryPage implements OnInit {

  errorMsg = "";
  customerCode = "";

  constructor(private loginAPIService : LoginAPIService,
              private router : Router,
              private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
  }

  login() {
    console.log(this.customerCode);
    this.errorMsg = "";

    if (this.customerCode.trim() == "") {
      this.errorMsg = "Customer code cannot be empty.";
      return;
    }

    // calls API
    this.loginAPIService.customerLogin(this.customerCode).then(
      data => { 
        console.log(data);
        if (data != null || data["status"] == 500) {
          var job : Job = this.createJob(data);
          this.storage.set("JOB", job).then(() => this.goCustomerLandingPage());
        } else {
          this.errorMsg = "Incorrect Username or Password";
        }
      }
    ).catch(error => { 
      // add new errors here as they are created
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
      "conversation" : userData["messages"]
    }
    return job;
  }

  goCustomerLandingPage() {
    this.router.navigate(['customer-landing']);
  }
}
