import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { CustomerApiService } from 'src/app/services/customer-api.service';

@Component({
  selector: 'app-request-design',
  templateUrl: './request-design.page.html',
  styleUrls: ['./request-design.page.scss'],
})
export class RequestDesignPage implements OnInit {

  bodyPartNames = new Map([
    ["f_r_hand", "Front Right Hand"], 
    ["f_head", "Front Head"], 
    ["b_r_lowerarm", "Back Right Lower Arm"],
    ["f_r_foot", "Front Right Foot"], 
    ["f_r_bicep", "Front Right Bicep"],
    ["f_r_shoulder", "Front Right Shoulder"], 
    ["f_r_outerab", "Front Right Outer Ab"],
    ["f_r_pec", "Front Right Pec"], 
    ["f_r_calf", "Front Right Calf"],
    ["f_neck", "Front Right Neck"], 
    ["f_ab", "Front Ab"],
    ["f_r_forearm", "Front Right Forearm"], 
    ["f_r_thigh", "Front Right Thigh"],
    ["f_l_hand", "Front Left Hand"], 
    ["f_l_foot", "Front Left Foot"],
    ["f_l_bicep", "Front Left Bicep"], 
    ["f_l_shoulder", "Front Left Shoulder"],
    ["f_l_outerab", "Front Left Outer Ab"], 
    ["f_l_pec", "Front Left Pec"],
    ["f_l_calf", "Front Left Calf"], 
    ["f_l_forearm", "Front Left Forearm"],
    ["f_l_thigh", "Front Left Thigh"], 
    ["f_groin", "Front Groin"],

    ["b_r_hand", "Back Right Hand"], 
    ["b_r_lowerarm", "Back Right Lower Arm"],
    ["b_r_foot", "Back Right Foot"], 
    ["b_r_shoulder", "Back Right Shoulder"],
    ["b_head", "Back Head"], 
    ["b_neck", "Back Neck"],
    ["b_r_buttock", "Back Right Buttock"], 
    ["b_r_thigh", "Back Right Thigh"],
    ["b_r_calf", "Back Right Calf"], 
    ["b_r_lowerback", "Back Right Lower Back"],
    ["b_r_upperback", "Back Right Upper Back"], 
    ["b_r_upperarm", "Back Right Upper Arm"],
    ["b_l_hand", "Back Left Hand"], 
    ["b_l_lowerarm", "Back Left Lower Arm"],
    ["b_l_foot", "Back Left Foot"], 
    ["b_l_shoulder", "Back Left Shoulder"],
    ["b_l_buttock", "Back Left Buttock"], 
    ["b_l_thigh", "Back Left Thigh"],
    ["b_l_calf", "Back Left Calf"], 
    ["b_l_lowerback", "Back Left Lower Back"],
    ["b_l_upperback", "Back Left Upper Back"], 
    ["b_l_upperarm", "Back Left Upper Arm"]
  ]);

  //form navigation support variables
  SECTION_MAX = 3;
  currentSection = 0;
  completionAmount = 0.0;
  sectionTitle = ["Personal Details", "Tattoo Details", "Tattoo Location", "Reference Images"];

  //section0
  personalDetails : object = {
    firstName : "",
    lastName : "",
    emailAddress : "",
    confirmEmailAddress : "",
    gender : "",
    addToEmailList : true
  }
  //taken from: https://mailtrap.io/blog/angular-email-validation/
  EMAILREGEX = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$");

  //section1
  tattooDetails : object = {
    firstTattoo : "",
    tattooColour : "",
    coverUpOrExtension : "",
    tattooStyle : "",
    tattooSize : "",
    tattooDescription : ""
  }
  
  //section2
  skeletonDetails : object = {
    bodyParts : [],
    segmentValue : "front"
  }
  
  //section3
  referenceImages = []; 

  constructor(private alertController : AlertController, private customerApiServive : CustomerApiService, private router : Router) { }

  ngOnInit() {
  }

  submitDesignRequest() {
    var designRequest = {
      firstName: this.personalDetails["firstName"],
      lastName: this.personalDetails["lastName"],
      email: this.personalDetails["emailAddress"],
      identifyAs: this.personalDetails["gender"],
      firstTattoo: (this.tattooDetails["firstTattoo"] == "yes" ? true : false),
      color: (this.tattooDetails["tattooColour"] == "yes" ? true : false),
      coverExistingTattoo: (this.tattooDetails["coverUpOrExtension"] == "yes" ? true : false),
      styleOfTattoo: this.tattooDetails["tattooStyle"],
      estimateSize: this.tattooDetails["tattooSize"],
      position: this.getBodyPartsStr(this.skeletonDetails["bodyParts"]),
      image1: null,
      image2: null,
      image3: null,
      image4: null,
      image5: null,
      image6: null
    }

    //take advantage of cascading switch statements
    switch (this.referenceImages.length) {
      case 6: 
        designRequest.image6 = this.referenceImages[5];
      case 5:
        designRequest.image5 = this.referenceImages[4];
      case 4:
        designRequest.image4 = this.referenceImages[3];
      case 3:
        designRequest.image3 = this.referenceImages[2];
      case 2:
        designRequest.image2 = this.referenceImages[1];
      case 1:
        designRequest.image1 = this.referenceImages[0];
        break;
      default:
        //console.log("no images");
    }

    this.customerApiServive.submitDesignRequest(designRequest).then(result => { this.alertAction(result); });
  }

  goPrev() {
    this.currentSection = Math.max(0, this.currentSection - 1);
    this.completionAmount = (this.currentSection / this.SECTION_MAX);
  }

  goNext() {
    if (this.validDataEntry()) {
      this.currentSection = Math.min(this.SECTION_MAX, this.currentSection + 1);
      this.completionAmount = (this.currentSection / this.SECTION_MAX);
    }
  }

  validDataEntry() : boolean {
    var success = true;
    switch (this.currentSection) {
      case 0: 
        success = this.validPersonalDetails();
        break;
      case 1:
        success = this.validTattooDetails();
        break;
      case 2:
        success = this.validBodyParts();
        break;
      default:
        success = false;
    }
    return success;
  }

  validPersonalDetails() : boolean {
    var success = true;

    if (this.personalDetails["firstName"].trim() == "" || this.personalDetails["lastName"].trim() == "" || this.personalDetails["emailAddress"].trim() == "" 
          || this.personalDetails["confirmEmailAddress"].trim() == "" || this.personalDetails["gender"] == "") {
      success = false;
      this.alertError("Please ensure all fields are filled before continuing.");
    } else if (!this.EMAILREGEX.test(this.personalDetails["emailAddress"])) {
      success = false;
      this.alertError("The given email address is invalid, please enter a valid address.");
    } else if (this.personalDetails["emailAddress"] != this.personalDetails["confirmEmailAddress"]) {
      success = false;
      this.alertError("Please ensure that both email addresses are identical.");
    }

    return success;
  }  

  validTattooDetails() : boolean {
    var success = true;

    if (this.tattooDetails["firstTattoo"] == "" || this.tattooDetails["tattooColour"] == "" 
        || this.tattooDetails["coverUpOrExtension"] == "" || this.tattooDetails["tattooStyle"] == "" 
        ||  this.tattooDetails["tattooSize"] == "" || this.tattooDetails["tattooDescription"].trim() == "") 
          {
            success = false;
            this.alertError("Please ensure all fields are filled before continuing.");
          }

    return success;
  }

  validBodyParts(): boolean {
    var success = true;

    if (this.skeletonDetails["bodyParts"].length == 0) {
      success = false;
      this.alertError("Please select at least one body part before continuing.");
    }

    return success;
  }


  async alertError(message) {
    const alert = await this.alertController.create({
      header: "Error",
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => { /* do nothing */ }
        }
      ]
    });
    await alert.present();
  }

  getBodyPartsStr(bodyParts) : string {
    var bodyPartsStr : string = "";
    for (let bodyPart of bodyParts) {
      bodyPartsStr = bodyPartsStr + this.bodyPartNames.get(bodyPart) + ", ";
    }

    if (bodyPartsStr != "") {
      bodyPartsStr = bodyPartsStr.substring(0, bodyPartsStr.length - 2); //trim trailing comma & space
    }
    return bodyPartsStr;
  }

  async alertAction(result) {
    console.log(result);
    var header = "Design Request Submission Failed"
    var message = "You were unable to submit the design request. Please try again later."

    if (result["jobAccessToken"] != null) {
      header = "Design Request Successfully Submitted"
      message = "Use code " + result["jobAccessToken"] + " to view your design request." 
    }

    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [
        {
          text: 'OK',
          handler: () => {
            let navTransition = alert.dismiss();
            navTransition.then(() => {
                this.router.navigate(["home"]);
            });
            return false;
          }
        }
      ]
    });
    await alert.present();
  }
  
}
