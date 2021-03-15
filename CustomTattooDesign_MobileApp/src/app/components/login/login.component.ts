import { Component, OnInit } from '@angular/core';
import { LoginAPIService } from 'src/app/services/login-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  username : string = "";
  password : string = "";

  constructor(private loginAPIService : LoginAPIService) { }

  ngOnInit() {}

  login() {
    if (this.loginAPIService.authenticateLogin(this.username, this.password)) {
      // redirect somewhere
      // store user credentials
      console.log('successful login');
    }
  }

}
