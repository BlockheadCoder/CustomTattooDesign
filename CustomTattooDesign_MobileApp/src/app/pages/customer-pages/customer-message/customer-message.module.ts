import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerMessagePageRoutingModule } from './customer-message-routing.module';

import { CustomerMessagePage } from './customer-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerMessagePageRoutingModule
  ],
  declarations: [CustomerMessagePage]
})
export class CustomerMessagePageModule {}
