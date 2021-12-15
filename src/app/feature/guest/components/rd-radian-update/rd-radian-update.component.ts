import { Component, OnInit } from '@angular/core';
import * as  skillsInterest from 'src/app/shared/core/json-data/skillsInterest.json';
import { FormGroup, FormBuilder } from '@angular/forms';
import * as Rellax from 'rellax';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RdRadianUpdates } from 'src/app/shared/core/models/rd-radian-updates/rd-radian-updates';
import { EmbedVideoService } from 'ngx-embed-video';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { RdEncryptDecryptService } from 'src/app/shared/services/encrypt-decrypt/rd-encrypt-decrypt.service';
import { RdUrlLinkBoxComponent } from 'src/app/core/components/rd-url-link-box/rd-url-link-box.component';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import { RdLikeEventProfile } from 'src/app/shared/core/models/rd-common/rd-common';
import { first } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-rd-radian-update',
  templateUrl: './rd-radian-update.component.html',
  styleUrls: ['./rd-radian-update.component.scss']
})
export class RdRadianUpdateComponent implements OnInit {
  searchRadianUpdatesFormGroup: FormGroup;
  date1: Date = new Date();
  skills: any;
  skillsSubcategory: any;
  panelOpenState = false;
  skillSelected: any = '';
  tempArr: any = [];
  radianUpdates: any;
  showLoadMore: Boolean = true;
  config: AngularEditorConfig = {
    editable: false,
    spellcheck: false,
    height: 'auto',
    minHeight: 'auto',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Open Sans',
    showToolbar: false
  };
  radianLikeData: any = [];
  currentUser: any;
  UserLiked: String = ''
  routerData: any = [];
  constructor(private _formBuilder: FormBuilder, private rdUserService: RdUserService,
    private notificationService: NotificationService, private router: Router,
    private embedService: EmbedVideoService, public matDialog: MatDialog,
    private _encryptDecryptService: RdEncryptDecryptService, private rdAuthenticateService: RdAuthenticateService,) {
    this.skills = skillsInterest.SkillsInterest;
    this.radianUpdates = [];
    this.notificationService.showLoader();
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    this.routerData = this._encryptDecryptService.decryptModel(this.routerData);
    if (this.currentUser === null) {
      this.radianLikeData.UserId = '';
      this.routerData.UserId = '';
    } else {
      this.radianLikeData.UserId = this.currentUser.id;
      this.routerData.UserId = this.currentUser.id;
    }
  }
  ngOnInit(): void {
    var rellaxHeader = new Rellax('.rellax-header');
    var body = document.getElementsByTagName('body')[0];
    body.classList.add('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.add('navbar-transparent');
    this.searchRadianUpdatesFormGroup = this._formBuilder.group({
      SearchBySkillCategory: [''],
      SearchBySkill: [''],
      SearchByText: [''],
      SearchCount: [0]
    });
    this.onSubmit(0);
  }
  get searchRadianUpdatesForm() { return this.searchRadianUpdatesFormGroup.controls; }
  getSKillSubCategory(data: any) {
    this.skillsSubcategory = this.skills.filter(function (item) {
      return item.radianSkillCategoryId === data;
    })[0].radianSkillSubCategories;
  }
  onSelectExperties(event, item: any) {
    if (event.target.checked) {
      this.tempArr.push(item.id);
    } else {
      const index: number = this.tempArr.indexOf(item.id);
      if (index !== -1) {
        this.tempArr.splice(index, 1);
      }
    }
    this.searchRadianUpdatesForm.SearchBySkill.setValue(this.tempArr.join(','));
  }
  onSubmit(SearchCount: Number) {
    this.notificationService.showLoader();
    this.searchRadianUpdatesForm.SearchCount.setValue(SearchCount);
    if (this.searchRadianUpdatesFormGroup.invalid) {
      this.notificationService.hideLoader();
      return;
    }
    this.rdUserService.searchRadianUpdate(new RdRadianUpdates(this.searchRadianUpdatesFormGroup.value))
      .subscribe(res => {
        this.notificationService.hideLoader();
        if (res.status) {
          if (res.data !== 'No Results Found!') {
            res.data.forEach(element => {
              element.EventStatus = element.EventStatus === '1' ? true : false;
              element.ContactDetails = element.ContactDetails === '' ? [] : JSON.parse(element.ContactDetails);
              element.EventCategories = element.EventCategories === '' ? [] : JSON.parse(element.EventCategories);
              element.EventSkill = element.EventSkill === '' ? [] : JSON.parse(element.EventSkill);
              element.EventImages = this.getProfilefilePath(element);
              if (SearchCount !== 0) {
                this.radianUpdates.push(element);
              }
            });
            if (SearchCount === 0) {
              this.radianUpdates = res.data;
            }
            this.showLoadMore = true;
          } else {
            this.showLoadMore = false;
            if (SearchCount === 0) {
              this.radianUpdates = [];
            }
          }
        } else {
          this.notificationService.success(res.message);
        }
      })
  }
  getVideo(url) {
    return this.embedService.embed(url);
  }
  getProfilefilePath(data: any) {
    const imageArry = [];
    if (data.EventImages.split(',').length > 1) {
      data.EventImages.split(',')
        .forEach(element => {
          if (element.indexOf('youtu.be') === -1 && element.indexOf('youtube') === -1 && element.indexOf('pdf') === -1
            && element.indexOf('pdf') === -1) {
            imageArry.push({ Name: environment.apiCommon + 'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName + '/' + element, IsImage: 'image' });
          } else if (element.indexOf('youtu.be') === -1 && element.indexOf('youtube') === -1 && element.indexOf('pdf') !== -1) {
            imageArry.push({ Name: environment.apiCommon + 'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName + '/' + element, IsImage: 'pdf' });
          } else {
            this.embedService.embed_image(element, { image: 'mqdefault' })
              .then(res => {
                imageArry.push({
                  Name: this.embedService.embed(element), IsImage: 'video',
                  Image: res.link
                });
              });
          }
        });
    } else {

      if (data.EventImages.indexOf('youtu.be') === -1 && data.EventImages.indexOf('youtube') === -1
        && data.EventImages.indexOf('pdf') === -1) {
        imageArry.push({ Name: environment.apiCommon + 'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName + '/' + data, IsImage: 'image' });
      } else if (data.EventImages.indexOf('youtu.be') === -1 && data.EventImages.indexOf('youtube') === -1
        && data.EventImages.indexOf('pdf') !== -1) {
        imageArry.push({ Name: environment.apiCommon + 'radianApi/media/' + data.FirstName + '_' + data.Email.split('@')[0] + '/Event/' + data.EventName + '/' + data, IsImage: 'pdf' });
      } else {
        this.embedService.embed_image(data.EventMedia, { image: 'mqdefault' })
          .then(res => {
            imageArry.push({
              Name: this.embedService.embed(data.EventMedia), IsImage: 'video',
              Image: res.link
            });
          });
        // imageArry.push(element.PortfolioMedia);

      }

    }
    return imageArry;
  }
  // getProfilefilePath(data:any){
  //   const imageArry=[];
  //   if(data.EventImages.split(',').length>1){
  //     data.EventImages.split(',')
  //     .forEach(element => {
  //       if(element.indexOf('youtu.be')===-1 && element.indexOf('youtube')===-1){
  //         imageArry.push(environment.apiCommon+'radianApi/media/'+data.FirstName+'_'+data.Email.split('@')[0]+'/Event/'+data.EventName+'/'+element);
  //       } else {
  //         imageArry.push(element);
  //       }

  //     });
  //   } else {
  //     if(data.EventImages.indexOf('youtu.be')===-1 && data.indexOf('youtube')===-1){
  //       imageArry.push(environment.apiCommon+'radianApi/media/'+data.FirstName+'_'+data.Email.split('@')[0]+'/Event/'+data.EventName+'/'+data.EventImages);
  //     } else {
  //       imageArry.push(data.EventImages);
  //     }

  //   }
  //   // data.EventImages.split(',').forEach(element => {
  //   //   imageArry.push('http://itechprovisions.com/radianApi/media/'+data.FirstName+'_'+data.Email.split('@')[0]+'/Event/'+data.EventName+'/'+element);
  //   // });
  //   return imageArry;
  //   // return 'http://itechprovisions.com/radianApi/media/'+data.FirstName+'_'+data.Email.split('@')[0]+'/Profile/'+data.ProfileName+'/ProfileImages/'+data.ProfilePicture;
  // }
  GetRadianDetail(element) {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = false;
    // dialogConfig.autoFocus = true;
    // dialogConfig.width = '1000px';
    // dialogConfig.height = '500px';
    // dialogConfig.data=element;
    // this.matDialog.open(RdRadianDetailComponent, dialogConfig);

    this.router.navigate(['/detail', this._encryptDecryptService.set(element.EventId)]);
  }
  likeRadianEvent(status, data) {
    this.radianLikeData.RadianType = 'Event';
    this.radianLikeData.RadianTypeId = data.EventId;
    this.radianLikeData.RadianTypeStatus = status;
    this.rdUserService.likeEvent(new RdLikeEventProfile(this.radianLikeData))
      .pipe(first())
      .subscribe(
        res => {
          this.notificationService.success(res.message);
          this.onSubmit(0);
        },
        error => {
        });
  }
  getShareLink() {
    const data = this.notificationService.showLinkUrl()
    this.matDialog.open(RdUrlLinkBoxComponent, {
      width: '500px',
      data: { link: data }
    });
  }
  ngOnDestroy() {
    var body = document.getElementsByTagName('body')[0];
    body.classList.remove('profile-page');
    var navbar = document.getElementsByTagName('nav')[0];
    navbar.classList.remove('navbar-transparent');
  }

}
