import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DesignImage } from 'src/app/model/designImage';

@Component({
  selector: 'app-customer-design-drawing',
  templateUrl: './customer-design-drawing.page.html',
  styleUrls: ['./customer-design-drawing.page.scss'],
})
export class CustomerDesignDrawingPage implements OnInit {
  designImage : DesignImage = {
    name: "",
    submissionDate: new Date(),
    image: null
  };

  constructor(private router : Router) { 
    if (this.router.getCurrentNavigation().extras.state) {
      this.designImage = this.router.getCurrentNavigation().extras.state.designImage;
    }
    console.log(this.designImage);
  }

  ngOnInit() {
  }

}
