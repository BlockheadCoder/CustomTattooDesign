import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginAPIService {

  apiURL = "http://142.55.32.86:50201/api/authenticateCredentials";
  bodyData;

  constructor(public http: HttpClient) { }

  authenticateLogin(user : string, pass : string) {

    //TODO - hash password

    this.bodyData = {
      'username': user,
      'password': pass
    };
    return this.http.post(this.apiURL, this.bodyData).toPromise().then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error)
    });
  }
}
