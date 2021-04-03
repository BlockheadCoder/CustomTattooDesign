import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { Artist } from '../../model/artist';

@Component({
  selector: 'app-artist-landing',
  templateUrl: './artist-landing.page.html',
  styleUrls: ['./artist-landing.page.scss'],
})
export class ArtistLandingPage implements OnInit {

  artist : Artist = {
    "id" : 0,
    "username" : "",
    "sessionToken" : "",
    "firstName" : "",
    "lastName" : "",
    "role" : "",
    "paypalEmail" : "",
    "overrideJobLimit" : 0,
    "maxJobValue" : 0,
    "averageTimeToCompletion" : 0,
    "averageTimeToIntroduction" : 0
  };

  constructor(private router : Router, private storage : Storage) { }

  ngOnInit() {
    this.storage.get("ARTIST").then(
      artist => this.artist = artist
    );
  }

  goUnclaimed() {
    this.router.navigateByUrl("/unclaimed-jobs");
  }
}
