import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dr-skeleton',
  templateUrl: './dr-skeleton.component.html',
  styleUrls: ['./dr-skeleton.component.scss'],
})
export class DrSkeletonComponent implements OnInit {

  @Input() sentDetails: any; 
  bodyParts = [];
  segmentValue = "front";

  constructor() { }

  ngOnInit() {
    this.bodyParts = this.sentDetails["bodyParts"];
    this.segmentValue = this.sentDetails["segmentValue"];
  }

  ngDoCheck() {
    this.loadClickedBodyParts();
  }

  loadClickedBodyParts() {
    for (let bodyPart of this.bodyParts) {
      try {
        var e = document.getElementById(bodyPart);
        e.setAttribute("class", "active");
      } catch (e) {
        //console.log(e.message);
      }
    }
  }

  clickBodyPart(e) {
    if (e.srcElement.attributes.class.value == "inactive") {
      e.srcElement.setAttribute("class", "active");

      var index = this.bodyParts.indexOf(e.srcElement.id);
      if (index === -1) {
        this.bodyParts.push(e.srcElement.id);
      }
    } else {
      e.srcElement.setAttribute("class", "inactive");

      var index = this.bodyParts.indexOf(e.srcElement.id);
      if (index !== -1) {
        this.bodyParts.splice(index, 1);
      }
    }
  }

  changeView(e) {
    this.segmentValue = e.target.value;
    this.sentDetails["segmentValue"] = e.target.value; //necessary for value to persist after page swap
  }
}
