import { Component, OnInit } from '@angular/core';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';

@Component({
  selector: 'app-rd-user-layout',
  templateUrl: './rd-user-layout.component.html',
  styleUrls: ['./rd-user-layout.component.scss']
})
export class RdUserLayoutComponent implements OnInit {
  currentUser: any=[];
  profileImagePath:string;
  coverImagePath:string
  constructor(private rdAuthenticateService: RdAuthenticateService) { 
    // this.rdAuthenticateService.currentUser.subscribe(x => this.currentUser = x);
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
  }

  ngOnInit(): void {
    if(this.currentUser!==null){
      this.profileImagePath = this.GetProfilePath();
      this.coverImagePath = this.GetCoverPicture();
    }
   
  }

  GetProfilePath(){
    return 'http://itechprovisions.com/radianApi/media/'+this.currentUser.firstName + '_'+this.currentUser.username.split('@')[0]+'/Profile/'+this.currentUser.ProfileName+'/ProfileImages/'+this.currentUser.ProfilePicture;
  }
  GetCoverPicture(){
    return 'http://itechprovisions.com/radianApi/media/'+this.currentUser.firstName + '_'+this.currentUser.username.split('@')[0]+'/Profile/'+this.currentUser.ProfileName+'/CoverImages/'+this.currentUser.CoverPicture;
  }

}
