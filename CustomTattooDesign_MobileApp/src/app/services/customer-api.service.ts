import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {

  //private testFormSubmitURL = "http://142.55.32.86:50201/api/testModelAttribute";
  private submitDesignRequestURL = "http://142.55.32.86:50201/api/submitDesignRequest";


  constructor(private http: HttpClient) { }

  /*
  async testFormSubmit(image1) {
    var formData: any = new FormData();
    formData.append("jobId", 2);
    formData.append("image1", image1, image1.name);
    console.log(formData);

    await this.http.post(this.testFormSubmitURL, formData).toPromise().then(result => {
      console.log(result);
    }).catch(error => {
      console.log(error);
    });
  };
  */

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

    console.log(formData);

    await this.http.post(this.submitDesignRequestURL, formData).toPromise().then(result => {
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
}
