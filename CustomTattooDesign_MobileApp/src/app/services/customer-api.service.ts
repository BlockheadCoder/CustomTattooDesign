import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Job } from '../model/job';
import { Message } from '../model/message';
import { DesignImage } from '../model/designImage';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  private submitDesignRequestURL = "http://142.55.32.86:50201/api/submitDesignRequest";
  private fetchJobMessagesURL = "http://142.55.32.86:50201/api/fetchJobMessages";
  private sendStringMessageURL = "http://142.55.32.86:50201/api/sendStringMessage";
  private getDesignImagesURL = "http://142.55.32.86:50201/api/getDesigns";
  private sendDesignDraftURL = "http://142.55.32.86:50201/api/sendDesignDraft"

  private headerData = new HttpHeaders({
    'BEARER': 'CustomTattooBestTattooDesigns'
  })
  private header = {headers: this.headerData}

  constructor(private http: HttpClient) { }

  async submitDesignRequest(designRequest) {
    var err = false;
    var success;
    var errorMsg = "";

    var formData: any = new FormData();
    formData.append("firstName", designRequest.firstName);
    formData.append("lastName", designRequest.lastName);
    formData.append("email", designRequest.email);
    formData.append("identifyAs", designRequest.identifyAs);
    formData.append("firstTattoo", designRequest.firstTattoo);
    formData.append("color", designRequest.color);
    formData.append("coverExistingTattoo", designRequest.coverExistingTattoo);
    formData.append("styleOfTattoo", designRequest.styleOfTattoo);
    formData.append("estimateSize", designRequest.estimateSize);
    formData.append("position", designRequest.position);
    
    if (designRequest.image1 != null) formData.append("image1", designRequest.image1, designRequest.image1.name);
    if (designRequest.image2 != null) formData.append("image2", designRequest.image2, designRequest.image2.name);
    if (designRequest.image3 != null) formData.append("image3", designRequest.image3, designRequest.image3.name);
    if (designRequest.image4 != null) formData.append("image4", designRequest.image4, designRequest.image4.name);
    if (designRequest.image5 != null) formData.append("image5", designRequest.image5, designRequest.image5.name);
    if (designRequest.image6 != null) formData.append("image6", designRequest.image6, designRequest.image6.name);

    await this.http.post(this.submitDesignRequestURL, formData, this.header).toPromise().then(result => {
      success = result;
    }).catch(error => {
      errorMsg = error.error.message;
    });

    return new Promise(function(resolve, reject) {
      if (err) {
        reject(errorMsg);
      } else {
        resolve(success);
      }
    });
  };  

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
  async sendMessage(job : Job, message : Message) {
    var success;

    var err = false;
    var errorMsg = "";

    var requestBody = {
      "jobId": job.jobId,
      "body": message.body,
      "sessionToken": ""
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

  async submitDesignEdit(job : Job, image) {
    var err = false;
    var success;
    var errorMsg = "";

    var formData: any = new FormData();
    formData.append("image", image, image.name);
    formData.append("jobId", job.jobId);
    formData.append("sessionToken", "");

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

  /* sets the conversation for the given job */
  setMessages(job : Job) {
    var tempMessages = [];
    var tempMsg : Message;

    job.conversation.forEach(m => {
      tempMsg = {
        id: m["messageId"],
        design_id: m["designId"],
        body: m["body"],
        created_at: new Date(m["createdAt"]),
        designer_id: m["designerId"],
        comment_picture: null,
        read: m["read"]
      }
      tempMessages.push(tempMsg);
    });
    job.conversation = tempMessages;
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

  refreshConversation(job : Job) {
    var tempConversation : Message[] = [];
    var err = false;

    this.getJobMessages(job).then(data => {
      let messages = data as Array<Object>;
      var tempMsg : Message;

      messages.forEach(m => {
        tempMsg = {
          id: m["messageId"],
          design_id: m["designId"],
          body: m["body"],
          created_at: new Date(m["createdAt"]),
          designer_id: m["designerId"],
          comment_picture: null, //API returns a boolean - need to fix
          read: m["read"],
        }
        tempConversation.push(tempMsg);
      });
    }).then(() => {
      job.conversation = tempConversation;
    }).catch(() => err = true);
  }
}
