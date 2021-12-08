import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import {environment} from '../../../../../environments/environment'
@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  // private loading: BehaviorSubject<boolean>;
  public loading: any;
  constructor(private _snackBar: MatSnackBar,private router: Router) { 
    this.loading = new BehaviorSubject<boolean>(false);
  }
  success(message){
    this._snackBar.open(message, 'close', {
      duration: 10000,
      panelClass: 'success'
    });
  }
  error(message){
    this._snackBar.open(message, 'close', {
      duration: 10000,
      panelClass: 'error'
    });
  }
  warn(message){
    this._snackBar.open(message, 'close', {
      duration: 10000,
      panelClass: 'warn'
    });
  }
  info(message){
    this._snackBar.open(message, 'close', {
      duration: 10000,
      panelClass: 'info'
    });
  }
  showLoader(){
    this.loading.next(true);
  }
  hideLoader(){
    setTimeout(()=>{
      this.loading.next(false);
    },2000)
  }
  showLinkUrl(){
    return environment.apiUrl + '#'+this.router.url;
  }
}
