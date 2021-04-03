import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { sha256 } from 'js-sha256';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAPIService {

  private authenticationState = new BehaviorSubject(false);

  private apiURL = "http://142.55.32.86:50201/api/authenticateCredentials";
  private bodyData;

  constructor(public http: HttpClient) { }

  async login(user : string, pass : string) {

    var success;
    var err = false;
    var errorMsg;

    this.bodyData = {
      'username': user,
      'password': sha256(pass)
    }; 

    /* 
     * Asynchronous method - makes an API call to backend
     */
    await this.http.post(this.apiURL, this.bodyData).toPromise().then(data => {
      success = data;
      this.authenticationState.next(true);
    }).catch(error => {
      errorMsg = error.error.message;
      err = true;
    });

    return new Promise(function(resolve, reject) {
      if (err) {
        reject(errorMsg);
      } else {
        resolve(success); // send response body object
      }
    });
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
