import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerLandingPageRoutingModule } from './customer-landing-routing.module';

import { CustomerLandingPage } from './customer-landing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerLandingPageRoutingModule
  ],
  declarations: [CustomerLandingPage]
})
export class CustomerLandingPageModule {}
