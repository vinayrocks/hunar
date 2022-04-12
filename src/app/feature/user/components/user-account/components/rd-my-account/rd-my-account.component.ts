import { Component, OnInit, NgModule } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import * as memberShipCategory from '../../../../../../shared/core/json-data/membershipCategory.json';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rd-my-account',
  templateUrl: './rd-my-account.component.html',
  styleUrls: ['./rd-my-account.component.scss']
})
export class RdMyAccountComponent implements OnInit {

  upgradeMembershipCategoryFormGroup: FormGroup;
  membership: any;
  membershipAmount: Number;
  membershipDuration: any;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router

  ) { 
    this.membership = memberShipCategory.MembershipCategories;
  }

  get upgradeMembershipCategoryForm() {
    return this.upgradeMembershipCategoryFormGroup.controls;
  }

  ngOnInit(): void {

    this.upgradeMembershipCategoryFormGroup = this._formBuilder.group({
      memberShip: ['', Validators.required],
      membershipAmount: [''],
      membershipDuration: ['']
    });

  }

  onSelectMembership(event, item: any) {
    if (event.target.checked) {
      this.upgradeMembershipCategoryForm.membershipAmount.setValue(item.amount);
      this.upgradeMembershipCategoryForm.membershipDuration.setValue(item.name);
    }
  }

}
