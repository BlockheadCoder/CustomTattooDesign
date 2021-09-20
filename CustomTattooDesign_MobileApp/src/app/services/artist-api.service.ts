import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artist } from '../model/artist';
import { Job } from '../model/job';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class ArtistApiService {

  private getUnclaimedURL = "http://142.55.32.86:50201/api/fetchUnclaimedJobs";
  private getArtistJobsURL = "http://142.55.32.86:50201/api/fetchArtistJobs";
  private claimJobURL = "http://142.55.32.86:50201/api/claimJob";
  private fetchJobMessagesURL = "http://142.55.32.86:50201/api/fetchJobMessages";
  private sendStringMessageURL = "http://142.55.32.86:50201/api/sendStringMessage"

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
  async getClaimedJobs(artist : Artist) {

    var jobs;

    var err = false;
    var errorMsg = "";

    var requestBody = {
      "id": artist.id,
      "username": artist.username,
      "sessionToken": artist.sessionToken
    }

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
  }

  /* 
   * Returns a promise object holding a boolean representing whether the job claim was successful or not
   */
  async claimJob(artist : Artist, jobId : number) {

    var success;

    var err = false;
    var errorMsg = "";

    var requestBody = {
      "id": artist.id,
      "username": artist.username,
      "sessionToken": artist.sessionToken,
      "jobId": jobId
    }

    await this.http.post(this.claimJobURL, requestBody).toPromise().then(data => {
      success = data;
    }).catch(error => {
      errorMsg = error.error.message;
      err = true;
    });

    return new Promise(function(resolve, reject) {
      if (err) {
        reject(errorMsg);
      } else {
        resolve(success);
      }
    });
  }

  /* 
   * Returns a promise object containing an array of an artist's conversations
   */
  async getJobMessages(job : Job) {
    
    var success;

    var err = false;
    var errorMsg = "";

    var requestBody = {
      "jobId": job.jobId
    }

    var messages;

    await this.http.post(this.fetchJobMessagesURL, requestBody).toPromise().then(data => {
      messages = data;
    }).catch(error => {
      errorMsg = error.error.message;
      err = true;
    });

    return new Promise(function(resolve, reject) {
      if (err) {
        reject(errorMsg);
      } else {
        resolve(messages);
      }
    });
  }

  /* 
   * Returns a promise object holding a boolean representing whether the job claim was successful or not
   */
  async sendMessage(job : Job, message : Message, artist : Artist) {

    var success;

    var err = false;
    var errorMsg = "";

    var requestBody = {
      "jobId": job.jobId,
      "body": message.body,
      "sessionToken": artist.sessionToken
    }

    await this.http.post(this.sendStringMessageURL, requestBody).toPromise().then(data => {
      success = data;
    }).catch(error => {
      errorMsg = error.error.message;
      err = true;
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