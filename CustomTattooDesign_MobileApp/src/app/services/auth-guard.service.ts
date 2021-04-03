import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginAPIService } from './login-api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginService : LoginAPIService, private router : Router) { }

  canActivate() {
    if (this.loginService.isAuthenticated()) {
      return true
    } else {
      return this.router.parseUrl('home');
    }
  }
}