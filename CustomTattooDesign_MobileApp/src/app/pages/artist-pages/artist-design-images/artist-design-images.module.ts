import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtistDesignImagesPageRoutingModule } from './artist-design-images-routing.module';

import { ArtistDesignImagesPage } from './artist-design-images.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistDesignImagesPageRoutingModule
  ],
  declarations: [ArtistDesignImagesPage]
})
export class ArtistDesignImagesPageModule {}
