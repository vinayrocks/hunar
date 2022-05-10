import { Component, OnInit, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { RdLoginComponent } from 'src/app/core/components/rd-login/rd-login.component';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { Router, NavigationEnd } from '@angular/router';
import { first } from 'rxjs/operators';
import { Subscription } from 'rxjs';
@Component({
    selector: 'app-rd-navbar',
    templateUrl: './rd-navbar.component.html',
    styleUrls: ['./rd-navbar.component.scss']
})
export class RdNavbarComponent implements OnInit {
    private _router: Subscription;
    currentUser: any;
    private toggleButton: any;
    private sidebarVisible: boolean;
    isLoggedIn:Boolean=false;
    constructor(public location: Location, private element: ElementRef,
        public matDialog: MatDialog, private authenticationService: RdAuthenticateService,
        private router: Router) {
        this.sidebarVisible = false;
        // redirect to home if already logged in
    }

    ngOnInit() {
        this._router = this.router.events.filter(event => event instanceof NavigationEnd)
        .subscribe((event: NavigationEnd) => {
            this.currentUser = this.authenticationService.getLocalStorageData();
            this.authenticationService.setLocalStorageData(this.currentUser);
            if(this.currentUser!==null){
                this.isLoggedIn=true;
            } else {
                this.isLoggedIn=false;
            }
        });
    }
//     sidebarOpen() {
//         const toggleButton = document.getElementById('myTopnav');
//         const html = document.getElementsByTagName('html')[0];
//         setTimeout(function () {
//             toggleButton.classList.add('toggled');
//         }, 500);
//         html.classList.add('nav-open');
//         this.sidebarVisible = true;
//     };
//     sidebarClose() {
//         const toggleButton = document.getElementById('myTopnav');
//         const html = document.getElementsByTagName('html')[0];
//         // console.log(html);
//         toggleButton.classList.remove('toggled');
//         this.sidebarVisible = false;
//         html.classList.remove('nav-open');
//     };
//     sidebarToggle() {
//         debugger
//       if (this.sidebarVisible === false) {
//           this.sidebarOpen();
//       } else {
//           this.sidebarClose();
//       }
//   };

    openDialog() {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = false;
        dialogConfig.autoFocus = false;
        dialogConfig.width = '507px';
        dialogConfig.height = '420px';
        dialogConfig.panelClass = 'login-popup'
        this.matDialog.open(RdLoginComponent, dialogConfig);
    }
    logout() {
        this.authenticationService.logout();
        this.isLoggedIn=false;
        this.router.navigate(['/home']);
    }
}
