import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnclaimedJobsPageRoutingModule } from './unclaimed-jobs-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { UnclaimedJobsPage } from './unclaimed-jobs.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UnclaimedJobsPageRoutingModule,
    ComponentsModule
  ],
  declarations: [UnclaimedJobsPage]
})
export class UnclaimedJobsPageModule {}
