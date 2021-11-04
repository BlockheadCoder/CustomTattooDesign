import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerCodeEntryPage } from './customer-code-entry.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerCodeEntryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerCodeEntryPageRoutingModule {}
