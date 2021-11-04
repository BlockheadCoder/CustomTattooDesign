import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnclaimedJobsPage } from './unclaimed-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: UnclaimedJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnclaimedJobsPageRoutingModule {}
