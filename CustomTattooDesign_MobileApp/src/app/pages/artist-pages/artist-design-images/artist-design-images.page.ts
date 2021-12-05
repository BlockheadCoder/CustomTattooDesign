import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Artist } from 'src/app/model/artist';
import { DesignImage } from 'src/app/model/designImage';
import { Job } from 'src/app/model/job';
import { ArtistApiService } from 'src/app/services/artist-api.service';

@Component({
  selector: 'app-artist-design-images',
  templateUrl: './artist-design-images.page.html',
  styleUrls: ['./artist-design-images.page.scss'],
})
export class ArtistDesignImagesPage implements OnInit {
  job : Job;
  artist : Artist;

  FILE_SIZE_MAX = 6291456; //6MB in Bytes
  designDraftImage : any;

  constructor(private router : Router, 
              private artistService : ArtistApiService,
              private storage : Storage,
              public actionSheetController: ActionSheetController,
              public alertController: AlertController) { 
                
    if (this.router.getCurrentNavigation().extras.state) {
      this.job = this.router.getCurrentNavigation().extras.state.job;
    }
  }

  ngOnInit() {
    this.storage.get("ARTIST").then(
      artist => this.artist = artist
    );

    console.log(this.job);
  }

  getImageSrcString(designImage : DesignImage) {
    var mimeType = "PNG";
    if (designImage.image.endsWith(".jpg") || designImage.image.endsWith(".JPG")) {
      mimeType = "JPG";
    }
    return "data:image/" + mimeType + ";base64," + designImage.image;
  }

  submitDesignDraftImage() {
    if (this.designDraftImage == null) {
      this.alertMessage("Error", "Please select a design draft before continuing.");
      return;
    }
    this.artistService.submitDesignDraft(this.artist, this.job, this.designDraftImage).then((result) => {
      if (result) {
        this.refreshDesignImages();
        this.alertMessage("Success", "Your design draft image was submitted successfully");
      }
    }).catch(() => {

    });
  }

  updateFiles(target) {
    if (target.files[0] == null) {
      return;
    } 
    var file = target.files[0];

    if (file.size > this.FILE_SIZE_MAX) {
      target.value = "";
      this.designDraftImage = null;
      this.alertMessage("Error", "Please ensure the design draft is smaller than 6 MB in size.");
    } else {
      this.designDraftImage = file;
    }
  }

  async alertMessage(header, message) {
    const alert = await this.alertController.create({
      header: header,
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

  refreshDesignImages() {
    this.artistService.getDesignImages(this.job).then(diData => {
      if (diData != null || diData["status"] == 500) {
        this.artistService.setDesignImages(this.job, diData);
      } else {
        console.log("design retrieval failed");
        console.log(diData);
      }
    });
  }
}
