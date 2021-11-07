import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerDesignImagesPage } from './customer-design-images.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerDesignImagesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerDesignImagesPageRoutingModule {}
