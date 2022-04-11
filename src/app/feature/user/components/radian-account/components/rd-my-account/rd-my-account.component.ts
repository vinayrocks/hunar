import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as memberShipCategory from 'src/app/shared/core/json-data/membershipCategory.json';

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

  constructor(private _formBuilder: FormBuilder) { 
    this.membership = memberShipCategory.MembershipCategories.filter(
      (x: any) =>
        x.name === 'Monthly' ||
        x.name === 'Quarterly' ||
        x.name === 'Semi Annual' ||
        x.name === 'Annual'
    );
  }

  ngOnInit() {

    this.upgradeMembershipCategoryFormGroup = this._formBuilder.group({
      memberShip: ['', Validators.required],
      membershipAmount: [''],
      membershipDuration: ['']
    });

  }

  get upgradeMembershipCategoryForm() {
    return this.upgradeMembershipCategoryFormGroup.controls;
  }

  onSelectMembership(event, item: any) {
    if (event.target.checked) {
      this.upgradeMembershipCategoryForm.membershipAmount.setValue(item.amount);
      this.upgradeMembershipCategoryForm.membershipDuration.setValue(item.name);
    }
  }

  onSubmit(){
    
  }

}
