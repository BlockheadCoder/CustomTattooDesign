import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClaimedJobsPageRoutingModule } from './claimed-jobs-routing.module';

import { ClaimedJobsPage } from './claimed-jobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClaimedJobsPageRoutingModule
  ],
  declarations: [ClaimedJobsPage]
})
export class ClaimedJobsPageModule {}
