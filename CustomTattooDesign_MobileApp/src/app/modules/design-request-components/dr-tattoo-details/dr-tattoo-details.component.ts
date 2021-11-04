import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dr-tattoo-details',
  templateUrl: './dr-tattoo-details.component.html',
  styleUrls: ['./dr-tattoo-details.component.scss'],
})
export class DrTattooDetailsComponent implements OnInit {

  tattooStyles = [
    { id: "unknown-other", name: "Don't Know / Other" },
    { id: "custom-script", name: "Custom Script" },
    { id: "realistic", name: "Realistic" },
    { id: "traditional", name: "Traditional" },
    { id: "watercolour", name: "Watercolour" },
    { id: "tribal", name: "Tribal" },
    { id: "new-school", name: "New School" },
    { id: "neo-traditional", name: "Neo Traditional" },
    { id: "japanese", name: "Japanese" },
    { id: "blackwork", name: "Blackwork" },
    { id: "illustrative", name: "Illustrative" },
    { id: "chicano", name: "Chicano" },
  ];

  tattooSizes = [
    { id: "unknown", name: "Don't Know" },
    { id: "extra-small", name: "Extra Small" },
    { id: "small", name: "Small" },
    { id: "medium", name: "Medium" },
    { id: "large", name: "Large" },
    { id: "half-sleeve", name: "Half Sleeve" },
    { id: "full-sleeve", name: "Full Sleeve" },
    { id: "extra-large", name: "Extra Large" }
  ];

  @Input() sentDetails: any;
  
  tattooDetails : object = {
    firstTattoo : "",
    tattooColour : "",
    coverUpOrExtension : "",
    tattooStyle : "",
    tattooSize : "",
    tattooDescription : ""
  }

  constructor() { }

  ngOnInit() {
    this.tattooDetails = this.sentDetails;
  }

  /*
  tattooStyle = "";
  optionChanged() {
    this.tattooDetails["tattooStyle"] = this.tattooStyle;
  }
  */
}
