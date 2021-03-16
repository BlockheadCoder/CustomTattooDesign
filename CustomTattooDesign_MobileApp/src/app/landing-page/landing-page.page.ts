import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.page.html',
  styleUrls: ['./landing-page.page.scss'],
})
export class LandingPagePage implements OnInit {

  userData;

  constructor(private router : Router) { 
    if (this.router.getCurrentNavigation().extras.state) {
      this.userData = this.router.getCurrentNavigation().extras.state.user;
    }
  }

  ngOnInit() {
  }

}
