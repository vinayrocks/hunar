import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RdEventAddComponent } from './components/event/components/rd-event-add/rd-event-add.component';
import { RdEventEditComponent } from './components/event/components/rd-event-edit/rd-event-edit.component';
import { RdEventListComponent } from './components/event/components/rd-event-list/rd-event-list.component';
import { EventModule } from './components/event/event.module';
import { RdPortfolioAddComponent } from './components/portfolio/components/rd-portfolio-add/rd-portfolio-add.component';
import { RdPortfolioEditComponent } from './components/portfolio/components/rd-portfolio-edit/rd-portfolio-edit.component';
import { RdPortfolioListComponent } from './components/portfolio/components/rd-portfolio-list/rd-portfolio-list.component';
import { PortfolioModule } from './components/portfolio/portfolio.module';
import { RdMyAccountComponent } from './components/radian-account/components/rd-my-account/rd-my-account.component';
import { RdRadianAddComponent } from './components/radian/components/rd-radian-add/rd-radian-add.component';
import { RdRadianEditComponent } from './components/radian/components/rd-radian-edit/rd-radian-edit.component';
import { RdRadianListComponent } from './components/radian/components/rd-radian-list/rd-radian-list.component';
import { RadianModule } from './components/radian/radian.module';
import { RdSettingComponent } from './components/settings/components/rd-setting/rd-setting.component';
import { SettingsModule } from './components/settings/settings.module';
import { RdUserLayoutComponent } from './layout/rd-user-layout/rd-user-layout.component';


const routes: Routes = [
  {
    path:'',
    component: RdUserLayoutComponent,
    children: [
      {
        path:'hunar_view', 
        component:RdRadianListComponent
      },
      {
        path:'hunar_add', 
        component:RdRadianAddComponent
      },
      {
        path:'hunar_edit/:id', 
        component:RdRadianEditComponent
      },
      {
        path:'portfolio_view',
        component:RdPortfolioListComponent
      },
      {
        path:'portfolio_add',
        component:RdPortfolioAddComponent
      },
      {
        path:'portfolio_edit/:id',
        component:RdPortfolioEditComponent
      },
      {
        path:'event_view',
        component:RdEventListComponent
      },
      {
        path:'event_add',
        component:RdEventAddComponent
      },
      {
        path:'event_edit/:id',
        component:RdEventEditComponent
      },
      {
        path:'setting_view',
        component:RdSettingComponent
      },
      {
        path:'my_account',
        component:RdMyAccountComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
