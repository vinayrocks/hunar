import { Component, OnInit } from '@angular/core';
import * as Rellax from 'rellax';
import * as  skillsInterest from 'src/app/shared/core/json-data/skillsInterest.json';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RdEncryptDecryptService } from 'src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdCommon } from 'src/app/shared/core/models/rd-common/rd-common';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { MatDialog } from '@angular/material/dialog';
import { RdDeleteConfirmationBoxComponent } from 'src/app/core/components/rd-delete-confirmation-box/rd-delete-confirmation-box.component';
@Component({
  selector: 'app-rd-radian-list',
  templateUrl: './rd-radian-list.component.html',
  styleUrls: ['./rd-radian-list.component.scss']
})
export class RdRadianListComponent implements OnInit {
  userProfiles: any=[];
  skills: any;
  userPortfolio: any;
  routerData: any = [];
  projectFilePath: String = '';
  projectPath: String = '';
  currentUser: any;
  config: AngularEditorConfig = {
    editable: false,
    spellcheck: false,
    height: 'auto',
    minHeight: 'auto',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Open Sans',
    showToolbar:false,
    toolbarHiddenButtons: [
      ['bold', 'italic'],
      ['fontSize', 'insertImage','insertVideo','insertHorizontalRule',]
    ]
  };
  constructor(private rdUserService: RdUserService, private router: Router,
    private _encryptDecryptService: RdEncryptDecryptService,
    private notificationService: NotificationService,public matDialog: MatDialog,
     private rdAuthenticateService: RdAuthenticateService) {
    this.skills = skillsInterest.SkillsInterest;
    // this.rdAuthenticateService.currentUser.subscribe(x => this.currentUser = x);
    this.notificationService.showLoader();
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    if(this.currentUser !== null) {
      this.projectFilePath = this.currentUser.firstName + '_' + this.currentUser.username.split('@')[0] + '/Profile';
      this.routerData.UserId = this.currentUser.id;
    }
    
  }
  ngOnInit() {
    var rellaxHeader = new Rellax('.rellax-header');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.getUserProfiles()
  }
  getUserProfiles() {
    this.userProfiles=[];
    this.notificationService.showLoader();
    
    this.rdUserService.getUserProfiles(new RdCommon(this.routerData))
      .pipe(first())
      .subscribe(res => {
        
        this.notificationService.hideLoader();
        res.data.forEach(element => {
          element.ProfileExpertise = element.ProfileExpertise === ''?[]:JSON.parse(element.ProfileExpertise);
          element.ProfileSkill =  element.ProfileSkill === ''?[]:JSON.parse(element.ProfileSkill);
          element.LinkedPortfolio = element.LinkedPortfolio === ''?[]:JSON.parse(element.LinkedPortfolio);
        });
        this.userProfiles = res.data;
        this.projectPath = res.projectPath;
      },
        error => {
        });
  }
  openEdit(data: Number) {
    this.router.navigate(['/member/hunar_edit', this._encryptDecryptService.set(data)]);
  }
  DeleteProfile(data){
    const dialogRef = this.matDialog.open(RdDeleteConfirmationBoxComponent, {
      width: '250px',
      data: {id: data.id, name: data.PortfolioName,type:'Profile'}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result !=='Cancel'){
        this.getUserProfiles();
      }
    });
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}
