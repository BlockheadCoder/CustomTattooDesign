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

  errorMsg : string = "";

  constructor(private loginAPIService : LoginAPIService, private router : Router) { }

  ngOnInit() {}

  login() {
    this.errorMsg = "";

    if (this.username.length == 0 || this.password.length == 0 ) {
      this.errorMsg = "Username and Password cannot be Empty";
      return;
    }

    this.loginAPIService.authenticateLogin(this.username, this.password).then(
      data => { 
        console.log(data); 
        if (data) {
          this.goLandingPage();
        } else {
          this.errorMsg = "Incorrect Username or Password";
        }
      }
    ).catch(error => { 
      // should be caught by front-end check
      if (error == "Invalid user parameters...") {
        console.log(error); 
      }
    });
  }

  goLandingPage() {
    // eventually include user data in send
    this.router.navigate(['landing-page']).then(nav => { }, err => { } );
  }
}
