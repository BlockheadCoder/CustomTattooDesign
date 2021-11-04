import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';
import { CustomerAuthGuardService } from './services/customer-auth-guard.service';

const routes: Routes = [
  {
    path: 'artist-login',
    loadChildren: () => import('./pages/artist-pages/artist-login/artist-login').then( m => m.ArtistLoginPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'artist-landing',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/artist-pages/artist-landing/artist-landing.module').then( m => m.ArtistLandingPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'unclaimed-jobs',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/artist-pages/unclaimed-jobs/unclaimed-jobs.module').then( m => m.UnclaimedJobsPageModule)
  },
  {
    path: 'claimed-jobs',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/artist-pages/claimed-jobs/claimed-jobs.module').then( m => m.ClaimedJobsPageModule)
  },
  {
    path: 'job-details',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/artist-pages/job-details/job-details.module').then( m => m.JobDetailsPageModule)
  },
  {
    path: 'artist-conversations',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/artist-pages/artist-conversations/artist-conversations.module').then( m => m.ArtistConversationsPageModule)
  },
  {
    path: 'artist-message',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/artist-pages/artist-message/artist-message.module').then( m => m.ArtistMessagePageModule)
  },
  {
    path: 'request-design',
    loadChildren: () => import('./pages/customer-pages/request-design/request-design.module').then( m => m.RequestDesignPageModule)
  },
  {
    path: 'customer-code-entry',
    loadChildren: () => import('./pages/customer-pages/customer-code-entry/customer-code-entry.module').then( m => m.CustomerCodeEntryPageModule)
  },
  {
    path: 'customer-landing',
    canActivate: [CustomerAuthGuardService],
    loadChildren: () => import('./pages/customer-pages/customer-landing/customer-landing.module').then( m => m.CustomerLandingPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
