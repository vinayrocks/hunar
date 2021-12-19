import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RdEncryptDecryptService } from '../encrypt-decrypt/rd-encrypt-decrypt.service';
import { RdPortfolio } from '../../core/models/rd-portfolio/rd-portfolio';
import { RdAuthenticateService } from '../authentication/rd-authenticate.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RdUserService {

  private currentUserSubject: any;
  // public currentUser: Observable<any>;

  constructor(private http: HttpClient, private _encryptDecryptService: RdEncryptDecryptService,
    private rdAuthenticateService: RdAuthenticateService) {
   this.currentUserSubject = this.rdAuthenticateService.getLocalStorageData();
   // this.currentUser = this.currentUserSubject.asObservable();
  }
  // public get currentUserValue() {
  //   return this.currentUserSubject;
  // }

  getUserProfiles(rdCommon) {
    // rdCommon.UserId=this.currentUserSubject.id;
    return this.http.post<any>(environment.apiCommon+'radianApi/Profiles/getProfiles.php',
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getUserProfile(rdCommon) {
    rdCommon.UserId=this.currentUserSubject.id;
    return this.http.post<any>(environment.apiCommon+'radianApi/Profiles/getProfiles.php', 
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getUserProfileDetail(rdCommon) {
    return this.http.post<any>(environment.apiCommon+'radianApi/Profiles/getSingleProfile.php', 
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getUserPorfolios(rdCommon) {
    
    rdCommon.UserId=this.currentUserSubject.id;
    rdCommon.Id=0;
    
    return this.http.post<any>(environment.apiCommon+'radianApi/Portfolios/getPortfolios.php',
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getUserPorfolio(rdCommon) {
    rdCommon.UserId=this.currentUserSubject.id;
    return this.http.post<any>(environment.apiCommon+'radianApi/Portfolios/getPortfolios.php',
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getUserEvents(rdCommon) {
    rdCommon.UserId=this.currentUserSubject.id;
    return this.http.post<any>(environment.apiCommon+'radianApi/Events/getEvents.php',
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getUserEvent(rdCommon) {
    rdCommon.UserId=this.currentUserSubject.id;
    return this.http.post<any>(environment.apiCommon+'radianApi/Events/getEvents.php',
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  getEventDetail(rdCommon) {
    return this.http.post<any>(environment.apiCommon+'radianApi/Events/getSingleEvent.php', 
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  likeEvent(rdCommon) {
    return this.http.post<any>(environment.apiCommon+'radianApi/UserLikes/userLikes.php', 
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
      .pipe(map(res => {
        return res;
      }));
  }
  UploadUserPortfolioFile(file: any, portfolioName: string) {
    debugger
    const formData = new FormData();
    formData.append('UserId', this._encryptDecryptService.set(this.currentUserSubject.id));
    formData.append('Email', this._encryptDecryptService.set(this.currentUserSubject.username));
    formData.append('FirstName', this._encryptDecryptService.set(this.currentUserSubject.firstName));
    formData.append('Type', this._encryptDecryptService.set('Portfolio'));
    formData.append('PortfolioName', this._encryptDecryptService.set(portfolioName));
    for (var i = 0; i < file.length; i++) {
      formData.append('file[]', file[i].File);
    }
    return this.http.post<any>(environment.apiCommon+'radianApi/Uploads/uploadMedia.php', formData)
      .pipe(map(res => {
        debugger
        return res;
       
      }));
  }
  
  UploadUserRadianProfileImage(ProfilePicture: any, CoverPicture: any, profileName: string) {
    const formData = new FormData();
    formData.append('UserId', this._encryptDecryptService.set(this.currentUserSubject.id));
    formData.append('Email', this._encryptDecryptService.set(this.currentUserSubject.username));
    formData.append('FirstName', this._encryptDecryptService.set(this.currentUserSubject.firstName));
    formData.append('ProfileName', this._encryptDecryptService.set(profileName));
    formData.append('Type', this._encryptDecryptService.set('Profile'));
    formData.append('ProfilePicture', ProfilePicture);
    formData.append('CoverPicture', CoverPicture[0]);
    return this.http.post<any>(environment.apiCommon+'radianApi/Uploads/uploadMedia.php', formData)
      .pipe(map(res => {
        return res;
       
      }));
  }
  UploadUserEventImage(file: any, eventName: string) {
    const formData = new FormData();
    formData.append('UserId', this._encryptDecryptService.set(this.currentUserSubject.id));
    formData.append('Email', this._encryptDecryptService.set(this.currentUserSubject.username));
    formData.append('FirstName', this._encryptDecryptService.set(this.currentUserSubject.firstName));
    formData.append('Type', this._encryptDecryptService.set('Event'));
    formData.append('EventName', this._encryptDecryptService.set(eventName));
    for (var i = 0; i < file.length; i++) {
      formData.append('file[]', file[i].File);
    }
    return this.http.post<any>(environment.apiCommon+'radianApi/Uploads/uploadMedia.php', formData)
      .pipe(map(res => {
        return res;
      
      }));
  }
  addUserProfile(rdProfile: any) {
    rdProfile.UserId = this.currentUserSubject.id;
    rdProfile.Email = this.currentUserSubject.username;
    rdProfile.FirstName = this.currentUserSubject.firstName;
    
    rdProfile.ProfilePicture = rdProfile.ProfilePicture===null?'':rdProfile.ProfilePicture;
    rdProfile.CoverPicture = rdProfile.CoverPicture===null?'':rdProfile.CoverPicture;
    var data = this._encryptDecryptService.ecryptModel(rdProfile);
    return this.http.post<any>(environment.apiCommon+'radianApi/Profiles/createProfile.php', JSON.stringify(data));
  }

  addUserPortfolio(rdPortfolio: any) {
    rdPortfolio.UserId = this.currentUserSubject.id;
    rdPortfolio.Email = this.currentUserSubject.username;
    rdPortfolio.FirstName = this.currentUserSubject.firstName;
    var data = this._encryptDecryptService.ecryptModel(rdPortfolio);
    console.log(data);
    return this.http.post<any>(environment.apiCommon+'radianApi/Portfolios/createPortfolio.php', 
    JSON.stringify(data));
  }
  addUserEvent(rdEvent: any) {
    rdEvent.UserId = this.currentUserSubject.id;
    rdEvent.Email = this.currentUserSubject.username;
    rdEvent.FirstName = this.currentUserSubject.firstName;
    var data = this._encryptDecryptService.ecryptModel(rdEvent);
    return this.http.post<any>(environment.apiCommon+'radianApi/Events/createEvent.php', JSON.stringify(data));
  }
  addUpdateSettings(rdSettings:any){
    rdSettings.UserId = this.currentUserSubject.id;
    rdSettings.Email = this.currentUserSubject.username;
    rdSettings.FirstName = this.currentUserSubject.firstName;
    var data = this._encryptDecryptService.ecryptModel(rdSettings);
    return this.http.post<any>(environment.apiCommon+'radianApi/Settings/userSettings.php', JSON.stringify(data));
  }
  searchMember(rdSearchMember:any){
    rdSearchMember.UserId = this.currentUserSubject===null?0:this.currentUserSubject.id;
    rdSearchMember.Email = this.currentUserSubject===null?'':this.currentUserSubject.username;
    rdSearchMember.FirstName = this.currentUserSubject===null?'':this.currentUserSubject.firstName;
    var data = this._encryptDecryptService.ecryptModel(rdSearchMember);
    return this.http.post<any>(environment.apiCommon+'radianApi/Search/searchMember.php', JSON.stringify(data));
  }
  searchRadianUpdate(rdSearchRadian:any){
    rdSearchRadian.UserId = this.currentUserSubject===null?0:this.currentUserSubject.id;
    rdSearchRadian.Email = this.currentUserSubject===null?'':this.currentUserSubject.username;
    rdSearchRadian.FirstName = this.currentUserSubject===null?'':this.currentUserSubject.firstName;
    var data = this._encryptDecryptService.ecryptModel(rdSearchRadian);
    return this.http.post<any>(environment.apiCommon+'radianApi/Search/searchRadian.php', JSON.stringify(data));
  }

  DeleteRequest(rdCommon,type:string){
    rdCommon.UserId = this.currentUserSubject.id;
    if(type==='Event'){
      return this.http.post<any>(environment.apiCommon+'radianApi/Events/deleteUserEvent.php', 
      JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
        .pipe(map(res => {
          return res;
        }));
    } else if(type==='Portfolio') {
      return this.http.post<any>(environment.apiCommon+'radianApi/Portfolios/deleteUserPortfolio.php', 
      JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
        .pipe(map(res => {
          return res;
        }));
    } else {
      return this.http.post<any>(environment.apiCommon+'radianApi/Profiles/deleteUserProfile.php', 
      JSON.stringify(this._encryptDecryptService.ecryptModel(rdCommon)))
        .pipe(map(res => {
          return res;
        }));
    }
    return null
  }
  getPortfolioDetail(rdGetPortfolio) {
    return this.http.post<any>(environment.apiCommon+'radianApi/Portfolios/getSinglePortfolio.php', 
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdGetPortfolio)))
      .pipe(map(res => {
        return res;
      }));
  }
  addEventParticipation(rdEvent: any) {
    // rdEvent.UserId = this.currentUserSubject.id;
    var data = this._encryptDecryptService.ecryptModel(rdEvent);
    return this.http.post<any>(environment.apiCommon+'radianApi/Events/userEventCollaboration.php', JSON.stringify(data));
  }
  getEventInterestedUserList(rdGetUserIntList) {
    return this.http.post<any>(environment.apiCommon+'radianApi/Events/getInterestedUsers.php', 
    JSON.stringify(this._encryptDecryptService.ecryptModel(rdGetUserIntList)))
      .pipe(map(res => {
        return res;
      }));
  }
}
