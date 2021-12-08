import { Component, Renderer2, Inject, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { RdNavbarComponent } from './core/components/rd-navbar/rd-navbar.component';
import { Router, NavigationEnd } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { Location } from '@angular/common';
import 'rxjs/add/operator/filter';
import { RdAuthenticateService } from './shared/services/authentication/rd-authenticate.service';
import { NotificationService } from './shared/services/common/rd-notification/notification.service';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit,AfterViewInit {
    title = 'radian';
    private _router: Subscription;
    currentUser: any;
    loading: any;
    @ViewChild(RdNavbarComponent) navbar: RdNavbarComponent;

    constructor(private location: Location, private rdAuthenticateService: RdAuthenticateService,
        private router: Router, private renderer: Renderer2, @Inject(DOCUMENT,)
        private document: any, private element: ElementRef, private notificationService: NotificationService) {
        // this.rdAuthenticateService.currentUser.subscribe(x => this.currentUser = x);
      
        this._router = this.router.events.filter(event => event instanceof NavigationEnd)
            .subscribe((event: NavigationEnd) => {
                this.currentUser = this.rdAuthenticateService.getLocalStorageData();
                if (window.outerWidth > 991) {
                    window.document.children[0].scrollTop = 0;
                } else {
                    window.document.activeElement.scrollTop = 0;
                }
                this.navbar.sidebarClose();
                var _location = this.location.path();
                _location = _location.split('/')[1];
                if (this.currentUser !== null && _location !== 'who-we-are' && _location !== 'vission-mission'
                    && _location !== 'member-detail' && _location !== 'detail' && _location !== 'portfolio-detail'
                    && _location !== 'how-it-works' && _location !== 'updates' && _location !== 'search' && _location !== 'resetpassword'
                    ) {
                    //this.router.navigate(['/member/radian_view']);
                }

            });
    }
    ngOnInit() {
       
    }
    ngAfterViewInit() {
        this.loading = this.notificationService.loading;
    }
}
