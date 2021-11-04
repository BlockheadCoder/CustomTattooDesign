import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerApiService } from 'src/app/services/customer-api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private router : Router, private cas : CustomerApiService) { }

  ngOnInit() {
  }

  goArtistLogin() {
    this.router.navigateByUrl("/artist-login");
  }

  goCustomerCodeEntry() {
    this.router.navigateByUrl("/customer-code-entry");
  }

  goRequestDesign() {
    this.router.navigateByUrl("/request-design");
  }
}