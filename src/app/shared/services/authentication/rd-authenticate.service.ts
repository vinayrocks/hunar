import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RdLogin } from '../../core/models/login/rd-login';
import { RdRegister } from '../../core/models/register/rd-register'
import { RdEncryptDecryptService } from '../encrypt-decrypt/rd-encrypt-decrypt.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RdAuthenticateService {
  public currentUserSubject: any;
  constructor(private http: HttpClient, private _encryptDecryptService: RdEncryptDecryptService) {
    this.currentUserSubject = this.getLocalStorageData();
  }
  login(RdLogin: RdLogin) {
    var data=this._encryptDecryptService.ecryptModel(RdLogin);
    return this.http.post<any>(environment.apiCommon+'radianApi/Users/loginDetails.php', data)
      .pipe(map(res => {
        if(res.status){
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          this.setLocalStorageData(res.data);
        }
        return res;
      }));
  }
  register(RdRegister: RdRegister) {
    debugger
    var data=this._encryptDecryptService.ecryptModel(RdRegister);
    return this.http.post<any>(environment.apiCommon+'radianApi/Users/registrationDetails.php',
    JSON.stringify(data))
      .pipe(map(res => {
        return res;
      }));
  }
  forgotPassword(rdForgotPassword: any) {
    var data=this._encryptDecryptService.ecryptModel(rdForgotPassword);
    return this.http.post<any>(environment.apiCommon+'radianApi/Users/forgotPassword.php', JSON.stringify(data))
      .pipe(map(res => {
        return res;
      }));
   // return null
  }
  resetPassword(rdResetPassword: any) {
    var data=this._encryptDecryptService.ecryptModel(rdResetPassword);
    return this.http.post<any>(environment.apiCommon+'radianApi/Users/resetPassword.php', JSON.stringify(data))
      .pipe(map(res => {
        return res;
      }));
    // return null
  }
  checkEmailExists(rdForgotPassword: any) {
    var data=this._encryptDecryptService.ecryptModel(rdForgotPassword);
    return this.http.post<any>(environment.apiCommon+'radianApi/Users/checkUserExists.php', JSON.stringify(data))
      .pipe(map(res => {
        return res;
      }));
  }

  logout() {
    // remove user from local storage and set current user to null
    localStorage.removeItem('currentUser');
    localStorage.clear();
    this.currentUserSubject=[];
  }
  getLocalStorageData(){
    return  localStorage.getItem('currentUser') === null?null:JSON.parse(localStorage.getItem('currentUser'));
  }
  setLocalStorageData(data){
    if(data!==null){
      localStorage.setItem('currentUser',JSON.stringify(data));
    }
  }
}
