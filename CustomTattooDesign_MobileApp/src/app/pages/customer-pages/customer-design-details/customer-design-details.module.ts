import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerDesignDetailsPageRoutingModule } from './customer-design-details-routing.module';

import { CustomerDesignDetailsPage } from './customer-design-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerDesignDetailsPageRoutingModule
  ],
  declarations: [CustomerDesignDetailsPage]
})
export class CustomerDesignDetailsPageModule {}
