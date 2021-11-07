import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerDesignDetailsPage } from './customer-design-details.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerDesignDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerDesignDetailsPageRoutingModule {}
