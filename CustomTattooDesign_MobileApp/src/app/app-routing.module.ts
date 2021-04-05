import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: 'artist-login',
    loadChildren: () => import('./pages/artist-login/artist-login').then( m => m.ArtistLoginPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'artist-landing',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/artist-landing/artist-landing.module').then( m => m.ArtistLandingPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'unclaimed-jobs',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/unclaimed-jobs/unclaimed-jobs.module').then( m => m.UnclaimedJobsPageModule)
  },
  {
    path: 'claimed-jobs',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/claimed-jobs/claimed-jobs.module').then( m => m.ClaimedJobsPageModule)
  },
  {
    path: 'job-details',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./pages/job-details/job-details.module').then( m => m.JobDetailsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
