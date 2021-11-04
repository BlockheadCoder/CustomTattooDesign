import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtistMessagePageRoutingModule } from './artist-message-routing.module';

import { ArtistMessagePage } from './artist-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistMessagePageRoutingModule
  ],
  declarations: [ArtistMessagePage]
})
export class ArtistMessagePageModule {}
