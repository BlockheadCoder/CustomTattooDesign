import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonContent, NavController, Platform } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { DesignImage } from 'src/app/model/designImage';
import { Job } from 'src/app/model/job';
import { CustomerApiService } from 'src/app/services/customer-api.service';

@Component({
  selector: 'app-customer-design-drawing',
  templateUrl: './customer-design-drawing.page.html',
  styleUrls: ['./customer-design-drawing.page.scss'],
})

/* 
 * a large portion of the code used for this section was taken from this tutorial: https://www.youtube.com/watch?v=igJFPu6RrJ0
 */
export class CustomerDesignDrawingPage implements OnInit {
  @ViewChild('imageCanvas') myCanvas: ElementRef<HTMLCanvasElement>;
  canvasElement : any;
  img : any;

  job : Job;

  saveX : number;
  saveY : number;
  imgWidth = 1;
  imgHeight = 1;

  selectedColor = '#9e2956';
  colors = ['#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3'];
  selectedLineWidth = 5;

  designImage : DesignImage = {
    name: "",
    submissionDate: new Date(),
    image: null
  };

  constructor(private router : Router,
              private plt : Platform,
              private storage : Storage,
              private customerService : CustomerApiService,
              private alertController : AlertController,
              private navCtrl: NavController) { 
    if (this.router.getCurrentNavigation().extras.state) {
      this.designImage = this.router.getCurrentNavigation().extras.state.designImage;
    }
  }

  ngOnInit() { 
    this.storage.get("JOB").then(job => {
      this.job = job;
    }).catch(err => {
      console.log(err);
    });

    this.img = new Image();
    this.img.src = this.getImageSrcString(this.designImage);

    var stretchFactor = this.img.width / this.plt.width();
    this.imgWidth = this.plt.width(); 
    this.imgHeight = this.img.height / stretchFactor;
  }

  ngAfterViewInit() {
    this.canvasElement = this.myCanvas.nativeElement;
    this.canvasElement.width = this.imgWidth;
    this.canvasElement.height = this.plt.height() - 190;

    this.canvasElement.onWheel = function(event){
      event.preventDefault();
    };
    
    this.drawDesign();
  }

  selectColor(color) {
    this.selectedColor = color;
  }

  startDrawing(event) {
    var canvasPosition = this.canvasElement.getBoundingClientRect();

    this.saveX = event.touches[0].pageX - canvasPosition.x;
    this.saveY = event.touches[0].pageY - canvasPosition.y;
  }

  moved(event) {
    var canvasPosition = this.canvasElement.getBoundingClientRect();

    let currentX = event.touches[0].pageX - canvasPosition.x;
    let currentY = event.touches[0].pageY - canvasPosition.y;

    let ctx = this.canvasElement.getContext('2d');
    ctx.lineJoin = 'round';
    ctx.strokeStyle = this.selectedColor;
    ctx.lineWidth = this.selectedLineWidth;

    ctx.beginPath();
    ctx.moveTo(this.saveX, this.saveY);
    ctx.lineTo(currentX, currentY);
    ctx.closePath();

    ctx.stroke();

    this.saveX = currentX;
    this.saveY = currentY;
  }

  resetCanvas() {
    let ctx = this.canvasElement.getContext('2d');
    ctx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    this.drawDesign();
  }

  /* inserts the selected design image onto the blank canvas so it can be drawn over */
  drawDesign() {
    let ctx = this.canvasElement.getContext('2d');

    this.img.onload = () => {
      // Math.min stretches the image horizontally to fit if it would be too tall otherwise
      ctx.drawImage(this.img, 0, 0, this.canvasElement.width, Math.min(this.canvasElement.height, this.imgHeight)); 
    };
  }

  getImageSrcString(designImage : DesignImage) {
    var mimeType = "PNG";
    if (designImage.image.endsWith(".jpg") || designImage.image.endsWith(".JPG")) {
      mimeType = "JPG";
    }
    return "data:image/" + mimeType + ";base64," + designImage.image;
  }

  
  async confirmUploadImage() {
    const alert = await this.alertController.create({
      header: "Please Confirm",
      message: "Would you like to upload this image edit for your designer to see?",
      buttons: [
        {
          text: 'Cancel',
          handler: () => { /* do nothing */ }
        },
        {
          text: 'OK',
          handler: () => { 
            this.uploadImage();
            this.navCtrl.back();
          }
        }
      ]
    });
    await alert.present();
  }

  uploadImage() {
    var editName = this.designImage.name.split(".")[0] + "_edit.jpg"
    console.log(editName);
    
    this.canvasElement.toBlob((blob) => {
      let file = new File([blob], editName, { type: "image/jpeg" })
      this.customerService.submitDesignEdit(this.job, file).then(success => console.log(success))
    }, 'image/jpeg');
  }
}
