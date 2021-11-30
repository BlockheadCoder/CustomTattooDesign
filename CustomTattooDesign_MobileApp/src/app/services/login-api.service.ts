import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { sha256 } from 'js-sha256';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginAPIService {

  private headerData = new HttpHeaders({
    'BEARER': 'CustomTattooBestTattooDesigns'
  })
  private header = {headers: this.headerData}

  constructor(public http: HttpClient) { }

  /* artist login */
  private authenticationState = new BehaviorSubject(false);

  private apiURL = "http://142.55.32.86:50201/api/authenticateCredentials";
  private bodyData;

  async login(user : string, pass : string) {
    var success;
    var err = false;
    var errorMsg;

    this.bodyData = {
      'username': user,
      'password': sha256(pass)
    }; 

    await this.http.post(this.apiURL, this.bodyData, this.header).toPromise().then(data => {
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



  /* customer login */
  private customerAuthenticationState = new BehaviorSubject(false);

  private getJobAsCustomerURL = "http://142.55.32.86:50201/api/getJobAsCustomer";
  private customerBodyData;
  private customerHeaderData;

  async customerLogin(jobAccessToken : string) {
    var success;
    var err = false;
    var errorMsg;

    this.customerBodyData = {
      'jobAccessToken': jobAccessToken
    }; 

    await this.http.post(this.getJobAsCustomerURL, this.customerBodyData, this.header).toPromise().then(data => {
      success = data;
      this.customerAuthenticationState.next(true);
    }).catch(error => {
      errorMsg = error.error.message;
      err = true;
    });

    return new Promise(function(resolve, reject) {
      if (err) {
        console.log(errorMsg);
        reject(errorMsg);
      } else {
        resolve(success); // send response body object
      }
    });
  }

  isCustomerAuthenticated() {
    return this.customerAuthenticationState.value;
  }
}
