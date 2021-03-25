import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistLandingPage } from './artist-landing.page';

const routes: Routes = [
  {
    path: '',
    component: ArtistLandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistLandingPageRoutingModule {}
