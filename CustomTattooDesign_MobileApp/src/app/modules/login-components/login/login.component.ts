import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { Artist } from '../../../model/artist';

import { LoginAPIService } from 'src/app/services/login-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username : string = "";
  password : string = "";

  errorMsg : string = ""; // displayed to screen when login fails

  constructor(private loginAPIService : LoginAPIService, 
              private router : Router,
              private storage: Storage) { }

  async ngOnInit() {
    await this.storage.create();
  }

  // Attempts a login API call when 'LOG IN' button is pressed
  login() {
    this.errorMsg = "";

    if (this.username.length == 0 || this.password.length == 0 ) {
      this.errorMsg = "Username and Password cannot be Empty";
      return;
    }

    // calls API
    this.loginAPIService.login(this.username, this.password).then(
      data => { 
        if (data["validUser"]) {
          var artist : Artist = this.createArtist(data);
          this.storage.set("ARTIST", artist).then(() => this.goLandingPage());
        } else {
          this.errorMsg = "Incorrect Username or Password";
        }
      }
    ).catch(error => { 
      // add new errors here as they are created
      if (error == "Invalid user parameters...") {
        this.errorMsg = error;
      }
    });
  }

  // routes to landing page and sends the user data from the API call
  goLandingPage() {
    //var sendData = { state: { user : userData } };
    this.router.navigate(['artist-landing']);
  }

  createArtist(userData : Object) : Artist {
    var artist : Artist = {
      "id" : 15,
      "username" : this.username,
      "sessionToken" : userData["sessionToken"],
      "firstName" : userData["firstName"],
      "lastName" : userData["lastName"],
      "role" : userData["role"],
      "paypalEmail" : userData["paypalEmail"],
      "overrideJobLimit" : userData["overrideJobLimit"],
      "maxJobValue" : userData["maxJobValue"],
      "averageTimeToCompletion" : userData["averageTimeToCompletion"],
      "averageTimeToIntroduction" : userData["averageTimeToIntroduction"],
      "last30Days" : {
        "refunds": userData["refundsLast30Days"],
        "jobsTaken": userData["jobsTakenLast30Days"]
      },
      "lifetime" : {
        "refunds": userData["refundsLifetime"],
        "jobsTaken": userData["jobsTakenLifetime"],
        "earnings": (Math.round(userData["earningsLifetime"] * 100) / 100)
      }
    }
    return artist;
  }
}
