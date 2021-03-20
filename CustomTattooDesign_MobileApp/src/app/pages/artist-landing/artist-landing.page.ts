import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-artist-landing',
  templateUrl: './artist-landing.page.html',
  styleUrls: ['./artist-landing.page.scss'],
})
export class ArtistLandingPage implements OnInit {

  userData;

  constructor(private router : Router) { 
    if (this.router.getCurrentNavigation().extras.state) {
      this.userData = this.router.getCurrentNavigation().extras.state.user;
    }
  }

  ngOnInit() {
  }

}
