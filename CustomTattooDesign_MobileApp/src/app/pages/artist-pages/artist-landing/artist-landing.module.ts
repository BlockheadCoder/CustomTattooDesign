import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtistLandingPageRoutingModule } from './artist-landing-routing.module';
import { ComponentsModule } from '../../../modules/login-components/login-components.module';

import { ArtistLandingPage } from './artist-landing.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistLandingPageRoutingModule,
    ComponentsModule
  ],
  declarations: [ArtistLandingPage]
})
export class ArtistLandingPageModule {}
