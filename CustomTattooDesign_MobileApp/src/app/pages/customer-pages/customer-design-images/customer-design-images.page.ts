import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { DesignImage } from 'src/app/model/designImage';
import { Job } from 'src/app/model/job';
import { CustomerApiService } from 'src/app/services/customer-api.service';

@Component({
  selector: 'app-customer-design-images',
  templateUrl: './customer-design-images.page.html',
  styleUrls: ['./customer-design-images.page.scss'],
})
export class CustomerDesignImagesPage implements OnInit {
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
  sendData : NavigationExtras;

  constructor(private router : Router,
              private storage : Storage,
              private customerService : CustomerApiService) { }

  ngOnInit() {
    this.storage.get("JOB").then(job => {
      this.job = job;
      this.refreshDesignImages();
    }).catch(err => {
      console.log(err);
    });
  }

  goDrawOnDesign(designImage : DesignImage) {
    this.sendData = { state: { designImage :  designImage} };

    this.router.navigate(['customer-design-drawing'], this.sendData).catch(err => 
      console.log(err)
    );
  }

  getImageSrcString(designImage : DesignImage) {
    var mimeType = "PNG";
    if (designImage.image.endsWith(".jpg") || designImage.image.endsWith(".JPG")) {
      mimeType = "JPG";
    }
    return "data:image/" + mimeType + ";base64," + designImage.image;
  }

  refreshDesignImages() {
    this.customerService.getDesignImages(this.job).then(diData => {
      if (diData != null || diData["status"] == 500) {
        this.customerService.setDesignImages(this.job, diData);
      } else {
        console.log("design retrieval failed");
        console.log(diData);
      }
    });
  }
}
