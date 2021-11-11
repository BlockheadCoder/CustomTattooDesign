import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ArtistDesignImagesPage } from './artist-design-images.page';

const routes: Routes = [
  {
    path: '',
    component: ArtistDesignImagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArtistDesignImagesPageRoutingModule {}
