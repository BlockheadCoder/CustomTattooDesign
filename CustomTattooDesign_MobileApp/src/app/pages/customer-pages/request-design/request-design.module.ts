import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestDesignPageRoutingModule } from './request-design-routing.module';

import { RequestDesignPage } from './request-design.page';
import { DesignRequestComponentsModule } from 'src/app/modules/design-request-components/design-request-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestDesignPageRoutingModule,
    DesignRequestComponentsModule
  ],
  declarations: [RequestDesignPage]
})
export class RequestDesignPageModule {}
