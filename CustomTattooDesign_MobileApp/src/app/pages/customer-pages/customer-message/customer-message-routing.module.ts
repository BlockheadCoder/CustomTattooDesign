import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerMessagePage } from './customer-message.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerMessagePageRoutingModule {}
