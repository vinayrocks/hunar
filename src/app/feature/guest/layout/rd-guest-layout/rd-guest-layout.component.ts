import { Component, OnInit } from '@angular/core';
import {timer, Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { NavigationEnd, Router } from '@angular/router';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
@Component({
  selector: 'app-rd-guest-layout',
  templateUrl: './rd-guest-layout.component.html',
  styleUrls: ['./rd-guest-layout.component.scss']
})
export class RdGuestLayoutComponent implements OnInit {
  data : number=0;
  setSmallPageHeader:Boolean=false;
  private _router: Subscription;
  currentUser:any;
  isCustomHeader:Boolean=false;
  constructor(private location: Location, private rdAuthenticateService: RdAuthenticateService,
    private router: Router) {
   
    // this.rdAuthenticateService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    // this._router = this.router.events.filter(event => event instanceof NavigationEnd)
    // .subscribe((event: NavigationEnd) => {
    //   var _location = this.location.path();
    //   _location = _location.split('/')[2];
    //   if(_location!=='home'){
    //     this.setSmallPageHeader=true;
    //     this.isCustomHeader=true;
    //   } else {
    //     this.setSmallPageHeader=false;
    //     this.isCustomHeader=false;
    //   }
    // });
    // if (this.currentUser !== null) {
    //   this.router.navigate(['/member/view']);
    // }
    // router.events.subscribe(val => {
    //   var _location = this.location.path();
    //   _location = _location.split('/')[2];
    //   if(_location!=='home'){
    //      this.setSmallPageHeader=true;
    //      this.isCustomHeader=true;
    //   } else {
    //     this.setSmallPageHeader=false;
    //      this.isCustomHeader=false;
    //   }
    // });
   }

  ngOnInit(): void {
  }
}
