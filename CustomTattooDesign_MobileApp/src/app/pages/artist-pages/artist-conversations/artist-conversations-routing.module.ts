import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistConversationsPage } from './artist-conversations.page';

const routes: Routes = [
  {
    path: '',
    component: ArtistConversationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistConversationsPageRoutingModule {}
