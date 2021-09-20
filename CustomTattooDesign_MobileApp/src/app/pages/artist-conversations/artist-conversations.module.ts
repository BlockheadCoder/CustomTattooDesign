import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ArtistConversationsPageRoutingModule } from './artist-conversations-routing.module';

import { ArtistConversationsPage } from './artist-conversations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ArtistConversationsPageRoutingModule
  ],
  declarations: [ArtistConversationsPage]
})
export class ArtistConversationsPageModule {}
