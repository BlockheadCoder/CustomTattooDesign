import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { CustomerApiService } from 'src/app/services/customer-api.service';

@Component({
  selector: 'app-dr-ref-images',
  templateUrl: './dr-ref-images.component.html',
  styleUrls: ['./dr-ref-images.component.scss'],
})
export class DrRefImagesComponent implements OnInit {

  @Input() sentDetails : [];
  referenceImages = [];
  FILE_MAX = 6;
  FILE_SIZE_MAX = 6291456; //6MB in Bytes

  //image1 : File; //temp

  constructor(private customerApiService : CustomerApiService, private alertController : AlertController) { }

  ngOnInit() {
    this.referenceImages = this.sentDetails;
  }

  /*
  onSubmit() {
    this.customerApiService.testFormSubmit(this.image1);
  }

  uploadFile(fileList : FileList) {
    if (fileList.length > 0) {
      this.image1 = fileList[0];
    }
  }
  */
  
  updateFiles(target) {
    var errorMsg = "";

    if (target.files.length >= 6) {
      errorMsg = "Please limit the amout of reference images to six or less.";
    } else {
      for (let file of target.files) {
        if (file.size > this.FILE_SIZE_MAX) {
          errorMsg = "Please ensure every reference image is smaller than 6 MB in size.";
          break;
        }
        this.referenceImages.push(file);
      }
    }
    
    if (errorMsg != "") {
      target.value = "";
      while (this.referenceImages.length > 0) {
        this.referenceImages.pop();
      }

      this.alertError(errorMsg);
    } 

    console.log(this.referenceImages);
  }

  async alertError(message) {
    const alert = await this.alertController.create({
      header: "Error",
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => { /* do nothing */ }
        }
      ]
    });
    await alert.present();
  }
}
