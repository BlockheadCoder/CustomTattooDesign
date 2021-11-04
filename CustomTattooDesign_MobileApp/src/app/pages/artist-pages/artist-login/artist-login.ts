import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ArtistLoginPage } from './artist-login.page';

import { HomePageRoutingModule } from './artist-login-routing.module';
import { ComponentsModule } from 'src/app/modules/login-components/login-components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ComponentsModule
  ],
  declarations: [ArtistLoginPage]
})
export class ArtistLoginPageModule {}
