import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private loginAPIService : LoginAPIService, private router : Router) { }

  ngOnInit() {}


  // Attempts a login API call when 'LOG IN' button is pressed
  login() {
    this.errorMsg = "";

    if (this.username.length == 0 || this.password.length == 0 ) {
      this.errorMsg = "Username and Password cannot be Empty";
      return;
    }

    // calls API
    this.loginAPIService.authenticateLogin(this.username, this.password).then(
      data => { 
        if (data["validUser"]) {
          console.log(data);
          this.goLandingPage(data);
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
  goLandingPage(userData : Object) {
    var sendData = { state: { user : userData } };
    this.router.navigate(['artist-landing'], sendData).then(nav => { }, err => { } );
  }
}
