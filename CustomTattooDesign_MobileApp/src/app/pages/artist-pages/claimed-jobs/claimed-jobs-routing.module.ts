import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClaimedJobsPage } from './claimed-jobs.page';

const routes: Routes = [
  {
    path: '',
    component: ClaimedJobsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClaimedJobsPageRoutingModule {}
