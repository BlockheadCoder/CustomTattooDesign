import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginAPIService } from './login-api.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerAuthGuardService implements CanActivate {

  constructor(private loginService : LoginAPIService, private router : Router) { }

  canActivate() {
    if (this.loginService.isCustomerAuthenticated()) {
      return true;
    } else {
      return this.router.parseUrl('home');
    }
  }
}
