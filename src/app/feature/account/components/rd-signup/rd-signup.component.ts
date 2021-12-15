import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { RdRegister } from 'src/app/shared/core/models/register/rd-register';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RdAuthenticateService } from 'src/app/shared/services/authentication/rd-authenticate.service';
import * as  skillsInterest from 'src/app/shared/core/json-data/skillsInterest.json';
import * as  memberShipCategory from 'src/app/shared/core/json-data/membershipCategory.json';
import * as  countryState from 'src/app/shared/core/json-data/countryState.json';
import { codeValidation, emailValidation, numberValidation, passwordValidation } from 'src/app/shared/core/regx-expression/RegxExpression';
import { NotificationService } from 'src/app/shared/services/common/rd-notification/notification.service';
import { RdForgotPassword } from 'src/app/shared/core/models/forgot-password/rd-forgot-password';
@Component({
  selector: 'app-rd-signup',
  templateUrl: './rd-signup.component.html',
  styleUrls: ['./rd-signup.component.scss']
})
export class RdSignupComponent implements OnInit {
  skills: any;
  skillsSubcategory: any;
  membership: any;
  countryState: any;
  state: any;
  billStates: any;
  registerFormGroup: FormGroup;
  currentUser: any;
  tempArr: any = [];
  setSameAddress: Boolean;
  constructor(private _formBuilder: FormBuilder,
    private rdAuthenticateService: RdAuthenticateService,
    private router: Router, private notificationService: NotificationService) {
    this.notificationService.showLoader();
    this.skills = skillsInterest.SkillsInterest;
    this.membership = memberShipCategory.MembershipCategories;
    this.countryState = countryState.Countries;
    this.setSameAddress = false;
  }

  ngOnInit(): void {
   this.initRegisterForm();
  }
  initRegisterForm(){
    this.registerFormGroup = this._formBuilder.group({
      isUser: [true, Validators.required],
      organizationName:['', this.requiredIfValidator(() => !this.registerForm.isUser.value)],
      uniqueNumber:['',this.requiredIfValidator(() => !this.registerForm.isUser.value)],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      street: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      memberShip: ['', Validators.required],
      email: ['', [Validators.required, Validators.email, emailValidation]],
      password: ['', [Validators.required, passwordValidation]],
      confirmPassword: ['', Validators.required],
      profileSkill: ['', Validators.required],
      profileSkillSubCategory: ['', Validators.required],
      paymentMethod: [''],
      cardName: [''],
      cardNumber: [''],
      cardSecurity: [''],
      cardExpiry: [''],
      billingAddress: ['', Validators.required],
      billCountry: ['', Validators.required],
      billStreet: ['', Validators.required],
      billCity: ['', Validators.required],
      billState: ['', Validators.required],
      billZip: ['', Validators.required],
      termCondition: ['', Validators.required],
      phoneCode: ['', [Validators.required, codeValidation]],
      phone: ['', [Validators.required, numberValidation]],
      cellCode: ['', [Validators.required, codeValidation]],
      cell: ['', [Validators.required, numberValidation]],
      faxCode: ['', [codeValidation]],
      fax: ['', [numberValidation]],
    });
    this.notificationService.hideLoader();
  }
  // convenience getter for easy access to form fields
  get registerForm() { return this.registerFormGroup.controls; }
  getStates(event: any) {
    this.notificationService.showLoader();
    this.state = this.countryState.filter(function (item) {
      return item.country === event;
    })[0].states;
    this.notificationService.hideLoader();
  }
  getBillingStates(event: any) {
    this.billStates = this.countryState.filter(function (item) {
      return item.country === event;
    })[0].states;
  }
  getSkillSubCategory(event: any) {
    if (this.registerForm.profileSkill.value !== '') {
      this.skillsSubcategory = this.skills.filter(function (item) {
        return item.radianSkillCategoryId === event;
      })[0].radianSkillSubCategories;
    }
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
    this.registerForm.profileSkillSubCategory.setValue(this.tempArr.join(','));
  }
  checkEmailExists() {
    this.notificationService.showLoader();
    this.rdAuthenticateService.checkEmailExists(new RdForgotPassword(this.registerFormGroup.value))
      .pipe(first())
      .subscribe(
        res => {
          this.notificationService.hideLoader();
          if (res.status) {
            this.notificationService.success('Email already is in use.');
            this.registerFormGroup.controls.email.setValue('');
          }
        },
        error => {
          this.notificationService.error('Something went wrong.Pleased try again.');
        });
  }
  setBilingAddress() {
    if (this.registerForm.billingAddress.value) {
      this.registerFormGroup.controls['billCountry'].setValue(this.registerForm.country.value);
      this.registerFormGroup.controls['billCountry'].disabled;
      this.registerFormGroup.controls['billStreet'].setValue(this.registerForm.street.value);
      this.registerFormGroup.controls['billStreet'].disabled;
      this.registerFormGroup.controls['billCity'].setValue(this.registerForm.city.value);
      this.registerFormGroup.controls['billCity'].disabled;
      this.registerFormGroup.controls['billState'].setValue(this.registerForm.state.value);
      this.registerFormGroup.controls['billState'].disabled;
      this.registerFormGroup.controls['billZip'].setValue(this.registerForm.zip.value);
      this.registerFormGroup.controls['billZip'].disabled;
      this.registerFormGroup.updateValueAndValidity()
    } else {
      this.registerFormGroup.controls['billCountry'].setValue('');
      this.registerFormGroup.controls['billCountry'].enabled;
      this.registerFormGroup.controls['billStreet'].setValue('');
      this.registerFormGroup.controls['billStreet'].enabled;
      this.registerFormGroup.controls['billCity'].setValue('');
      this.registerFormGroup.controls['billCity'].enabled;
      this.registerFormGroup.controls['billState'].setValue('');
      this.registerFormGroup.controls['billState'].enabled;
      this.registerFormGroup.controls['billZip'].setValue('');
      this.registerFormGroup.controls['billZip'].enabled;
      this.registerFormGroup.updateValueAndValidity()
    }
  }
  onSubmit() {
    this.notificationService.showLoader();
    // stop here if form is invalid
    if (this.registerFormGroup.invalid) {
      this.notificationService.hideLoader();
      this.notificationService.error('Please fill in the required fields');
      this.validateAllFormFields(this.registerFormGroup);
      return;
    }
    this.rdAuthenticateService.register(new RdRegister(this.registerFormGroup.value))
      .pipe(first())
      .subscribe(
        res => {
          this.notificationService.hideLoader();
          if (res.status) {
            this.notificationService.success(res.message);
            this.router.navigate(['/home']);
          }
        },
        error => {
          this.notificationService.error('Something went wrong.Please try again.');
        });

  }
  validateAllFormFields(formGroup: FormGroup) {         //{1}
    Object.keys(formGroup.controls).forEach(field => {  //{2}
      const control = formGroup.get(field);             //{3}
      if (control instanceof FormControl) {             //{4}
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {        //{5}
        this.validateAllFormFields(control);            //{6}
      }
    });
  }
  reset() {
    this.initRegisterForm();
  }
  requiredIfValidator(predicate) {
    return (formControl => {
      if (!formControl.parent) {
        return null;
      }
      if (predicate()) {
        return Validators.required(formControl); 
      }
      return null;
    })
  }
  changeUserType(event:any){
    if (event.target.checked) {
      this.registerForm.organizationName.setValue('');
      this.registerForm.uniqueNumber.setValue('');
    }
  }
}
