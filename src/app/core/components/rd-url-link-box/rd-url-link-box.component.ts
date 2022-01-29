import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RdUserService } from 'src/app/shared/services/user/rd-user-service';

@Component({
  selector: 'app-rd-url-link-box',
  templateUrl: './rd-url-link-box.component.html',
  styleUrls: ['./rd-url-link-box.component.scss']
})
export class RdUrlLinkBoxComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<RdUrlLinkBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private rdUserService: RdUserService) { }

  ngOnInit(): void {
  }
  onNoClick(): void {
    this.dialogRef.close('Cancel');
  }
}
