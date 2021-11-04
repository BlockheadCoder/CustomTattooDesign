import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UnclaimedJobsPageRoutingModule } from './unclaimed-jobs-routing.module';

import { UnclaimedJobsPage } from './unclaimed-jobs.page';
import { ComponentsModule } from 'src/app/modules/login-components/login-components.module';

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
