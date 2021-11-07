import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CustomerDesignDrawingPageRoutingModule } from './customer-design-drawing-routing.module';

import { CustomerDesignDrawingPage } from './customer-design-drawing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerDesignDrawingPageRoutingModule
  ],
  declarations: [CustomerDesignDrawingPage]
})
export class CustomerDesignDrawingPageModule {}
