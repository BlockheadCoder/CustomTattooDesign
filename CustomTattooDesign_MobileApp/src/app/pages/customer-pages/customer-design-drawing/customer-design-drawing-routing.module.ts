import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomerDesignDrawingPage } from './customer-design-drawing.page';

const routes: Routes = [
  {
    path: '',
    component: CustomerDesignDrawingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomerDesignDrawingPageRoutingModule {}
