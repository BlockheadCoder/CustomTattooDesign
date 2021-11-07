import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerDesignImagesPageRoutingModule } from './customer-design-images-routing.module';

import { CustomerDesignImagesPage } from './customer-design-images.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerDesignImagesPageRoutingModule
  ],
  declarations: [CustomerDesignImagesPage]
})
export class CustomerDesignImagesPageModule {}
