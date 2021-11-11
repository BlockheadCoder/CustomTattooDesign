import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, Platform } from '@ionic/angular';
import { DesignImage } from 'src/app/model/designImage';

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

  saveX : number;
  saveY : number;

  selectedColor = '#9e2956';
  colors = ['#9e2956', '#c2281d', '#de722f', '#edbf4c', '#5db37e', '#459cde', '#4250ad', '#802fa3'];
  selectedLineWidth = 5;

  designImage : DesignImage = {
    name: "",
    submissionDate: new Date(),
    image: null
  };

  constructor(private router : Router, private plt : Platform) { 
    if (this.router.getCurrentNavigation().extras.state) {
      this.designImage = this.router.getCurrentNavigation().extras.state.designImage;
    }
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.canvasElement = this.myCanvas.nativeElement;
    this.canvasElement.width = this.plt.width();
    this.canvasElement.height = this.plt.height() - 180;
    
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

  drawDesign() {
    let ctx = this.canvasElement.getContext('2d');
    var img = new Image();
    img.src = this.getImageSrcString(this.designImage);

    // get the new properly ratioed height of the image after stretching the width to fit the device
    var stretchFactor = img.width / this.plt.width(); 
    var newHeight = img.height / stretchFactor;

    /*
    console.log('stretchFactor=' + stretchFactor);
    console.log('deviceWidth=' + this.plt.width())
    console.log('original: width=' + img.width + ', height=' + img.height);
    console.log('converted: width=' + (img.width / stretchFactor) + ', height=' + (img.height / stretchFactor));
    */

    img.onload = () => {
      // Math.min stretches the image horizontally to fit if it would be too tall otherwise
      ctx.drawImage(img, 0, 0, this.canvasElement.width, Math.min(this.canvasElement.height, newHeight)); 
    };
    img.src = this.getImageSrcString(this.designImage);
  }

  getImageSrcString(designImage : DesignImage) {
    var mimeType = "PNG";
    if (designImage.image.endsWith(".jpg") || designImage.image.endsWith(".JPG")) {
      mimeType = "JPG";
    }
    return "data:image/" + mimeType + ";base64," + designImage.image;
  }
}
