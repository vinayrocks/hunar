import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';

@Component({
  selector: 'app-rd-user-layout',
  templateUrl: './rd-user-layout.component.html',
  styleUrls: ['./rd-user-layout.component.scss']
})
export class RdUserLayoutComponent implements OnInit {
  currentUser: any=[];
  currentUrl: any;
  profileImagePath:string;
  coverImagePath:string
  constructor(private rdAuthenticateService: RdAuthenticateService, private router: Router) { 
    debugger
    this.currentUser = this.rdAuthenticateService.getLocalStorageData();
    this.currentUrl = router.url;
  }

  ngOnInit(): void {
    if(this.currentUser!==null){
      this.profileImagePath = this.GetProfilePath();
      this.coverImagePath = this.GetCoverPicture();
    }
    
  }

  isCurrentRoute(route : string) : boolean {
    return this.currentUrl === route;
  } 

  GetProfilePath(){
    return 'http://itechprovisions.com/radianApi/media/'+this.currentUser.firstName + '_'+this.currentUser.username.split('@')[0]+'/Profile/'+this.currentUser.ProfileName+'/ProfileImages/'+this.currentUser.ProfilePicture;
  }
  GetCoverPicture(){
    return 'http://itechprovisions.com/radianApi/media/'+this.currentUser.firstName + '_'+this.currentUser.username.split('@')[0]+'/Profile/'+this.currentUser.ProfileName+'/CoverImages/'+this.currentUser.CoverPicture;
  }

}
