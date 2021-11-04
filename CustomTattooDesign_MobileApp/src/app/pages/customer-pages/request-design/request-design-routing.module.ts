import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RequestDesignPage } from './request-design.page';

const routes: Routes = [
  {
    path: '',
    component: RequestDesignPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RequestDesignPageRoutingModule {}
