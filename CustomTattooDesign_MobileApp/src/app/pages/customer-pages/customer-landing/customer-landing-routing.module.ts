import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerLandingPage } from './customer-landing.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerLandingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerLandingPageRoutingModule {}
