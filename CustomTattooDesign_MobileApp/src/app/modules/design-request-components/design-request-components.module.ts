import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DrPersonalInfoComponent } from './dr-personal-info/dr-personal-info.component';
import { DrTattooDetailsComponent } from './dr-tattoo-details/dr-tattoo-details.component';
import { DrRefImagesComponent } from './dr-ref-images/dr-ref-images.component';
import { DrSkeletonComponent } from './dr-skeleton/dr-skeleton.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ DrPersonalInfoComponent, DrTattooDetailsComponent, DrSkeletonComponent, DrRefImagesComponent],
  imports: [
    CommonModule, FormsModule
  ],
  exports: [ DrPersonalInfoComponent, DrTattooDetailsComponent, DrSkeletonComponent, DrRefImagesComponent]
})
export class DesignRequestComponentsModule { }
