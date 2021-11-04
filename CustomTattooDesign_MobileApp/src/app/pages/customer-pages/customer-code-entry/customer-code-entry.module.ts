import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerCodeEntryPageRoutingModule } from './customer-code-entry-routing.module';

import { CustomerCodeEntryPage } from './customer-code-entry.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerCodeEntryPageRoutingModule
  ],
  declarations: [CustomerCodeEntryPage]
})
export class CustomerCodeEntryPageModule {}
