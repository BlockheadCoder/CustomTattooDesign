import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Artist } from '../model/artist';
import { Job } from '../model/job';
import { Message } from '../model/message';
import { DesignImage } from '../model/designImage';

@Injectable({
  providedIn: 'root'
})
export class ArtistApiService {

  private getUnclaimedURL = "http://142.55.32.86:50201/api/fetchUnclaimedJobs";
  private getArtistJobsURL = "http://142.55.32.86:50201/api/fetchArtistJobs";
  private claimJobURL = "http://142.55.32.86:50201/api/claimJob";
  private fetchJobMessagesURL = "http://142.55.32.86:50201/api/fetchJobMessages";
  private sendStringMessageURL = "http://142.55.32.86:50201/api/sendStringMessage";
  private getDesignImagesURL = "http://142.55.32.86:50201/api/getDesigns";
  private sendDesignDraftURL = "http://142.55.32.86:50201/api/sendDesignDraft"

  private headerData = new HttpHeaders({
    'BEARER': 'CustomTattooBestTattooDesigns'
  })
  private header = {headers: this.headerData}

  constructor(private http: HttpClient) { }

  /* 
   * Returns a promise object containing an array of unclaimed jobs from an API call
   */
  async getUnclaimedJobs() {

    var unclaimedJobs;
    var err = false;
    var errorMsg = "";

    await this.http.post(this.getUnclaimedURL, null, this.header).toPromise().then(data => {
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

    await this.http.post(this.getArtistJobsURL, requestBody, this.header).toPromise().then(data => {
      jobs = data;
      console.log(data);
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
   * Returns a promise object containing an array of the given job's design objects
   */
  async getDesignImages(job : Job) {
    var success;

    var err = false;
    var errorMsg = "";

    var requestBody = {
      "jobId": job.jobId
    }

    await this.http.post(this.getDesignImagesURL, requestBody, this.header).toPromise().then(data => {
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

    await this.http.post(this.claimJobURL, requestBody, this.header).toPromise().then(data => {
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
    var err = false;
    var errorMsg = "";

    var requestBody = {
      "jobId": job.jobId
    }

    var messages;

    await this.http.post(this.fetchJobMessagesURL, requestBody, this.header).toPromise().then(data => {
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

    await this.http.post(this.sendStringMessageURL, requestBody, this.header).toPromise().then(data => {
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

  async submitDesignDraft(artist : Artist, job : Job, image) {
    var err = false;
    var success;
    var errorMsg = "";

    var formData: any = new FormData();
    formData.append("image", image, image.name);
    formData.append("jobId", job.jobId);
    formData.append("sessionToken", artist.sessionToken);

    await this.http.post(this.sendDesignDraftURL, formData, this.header).toPromise().then(result => {
      success = result;
    }).catch(error => {
      err = true;
      errorMsg = error.error.message;
    });

    return new Promise(function(resolve, reject) {
      if (err) {
        reject(errorMsg);
      } else {
        resolve(success);
      }
    });
  }

  /* sets the jobs design images as a new DesignImages array built from the API return data */
  setDesignImages(job : Job, data) {
    let designImages = data as Array<Object>;

    var tempDesignImages : DesignImage[] = [];
    var tempDesignImage : DesignImage;
    
    designImages.forEach(di => {
      tempDesignImage = {
        name: di["imageName"],
        submissionDate: new Date(di["submissionDate"]),
        image: di["imageByteRepresentation"]
      }
      tempDesignImages.push(tempDesignImage);
    })
    
    job.designImages = tempDesignImages;
  }
}