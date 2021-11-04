import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-dr-personal-info',
  templateUrl: './dr-personal-info.component.html',
  styleUrls: ['./dr-personal-info.component.scss'],
})
export class DrPersonalInfoComponent implements OnInit {

  @Input() sentDetails: any;

  personalDetails : object = {
    firstName : "",
    lastName : "",
    emailAddress : "",
    confirmEmailAddress : "",
    gender : "",
    addToEmailList : false
  }

  emailChecked = false;

  constructor() { }

  ngOnInit() {
    this.personalDetails = this.sentDetails;
    this.emailChecked = this.personalDetails["addToEmailList"];
  }

  updateEmailPreference(e) {
    this.personalDetails["addToEmailList"] = e.target.checked;
  }
}
