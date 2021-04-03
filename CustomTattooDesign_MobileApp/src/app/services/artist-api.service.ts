import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../model/artist';

@Injectable({
  providedIn: 'root'
})
export class ArtistApiService {

  private getUnclaimedURL = "http://142.55.32.86:50201/api/fetchUnclaimedJobs";
  private getArtistJobsURL = "http://142.55.32.86:50201/api/fetchArtistJobs";

  constructor(private http: HttpClient) { }

  /* 
   * Returns a promise object containing an array of unclaimed jobs from an API call
   */
  async getUnclaimedJobs() {

    var unclaimedJobs;
    var err = false;
    var errorMsg = "";

    await this.http.post(this.getUnclaimedURL, null).toPromise().then(data => {
      unclaimedJobs = data;
    }).catch(error => {
      errorMsg = error.error.message;
      err = true;
    });

    return new Promise(function(resolve, reject) {
      if (err) {
        reject(errorMsg);
      } else {
        resolve(unclaimedJobs);
      }
    });
  }

  /* 
   * Returns a promise object containing an array of the artist's jobs from an API call
   */
  async getArtistJobs(artist : Artist) {

    var jobs;

    var err = false;
    var errorMsg = "";

    var requestBody = {
      "id": artist.id,
      "username": artist.username,
      "sessionToken": artist.sessionToken
    }

    console.log(requestBody);

    // uncomment when API goes live
    /* 
    await this.http.post(this.getArtistJobsURL, requestBody).toPromise().then(data => {
      jobs = data;
    }).catch(error => {
      errorMsg = error.error.message;
      err = true;
    });

    return new Promise(function(resolve, reject) {
      if (err) {
        reject(errorMsg);
      } else {
        resolve(jobs);
      }
    });
    */
  }
}