import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sha256 } from 'js-sha256';

@Injectable({
  providedIn: 'root'
})
export class LoginAPIService {

  apiURL = "http://142.55.32.86:50201/api/authenticateCredentials";
  bodyData;

  constructor(public http: HttpClient) { }

  async authenticateLogin(user : string, pass : string) {

    var success;
    var err = false;
    var errorMsg;

    this.bodyData = {
      'username': user,
      'password': sha256(pass)
    };

    await this.http.post(this.apiURL, this.bodyData).toPromise().then(data => {
      success = data;
    }).catch(error => {
      errorMsg = error.error.message;
      err = true;
      success = false;
    });

    return new Promise(function(resolve, reject) {
      if (err) {
        reject(errorMsg);
      } else {
        resolve(success);
      }
   });
  }
}
