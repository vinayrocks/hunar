import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { RdEventListComponent } from './components/rd-event-list/rd-event-list.component';
import { RdEventAddComponent } from './components/rd-event-add/rd-event-add.component';
import { RdEventEditComponent } from './components/rd-event-edit/rd-event-edit.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { MatDialogModule } from '@angular/material/dialog';
import { EmbedVideoService } from 'ngx-embed-video';

@NgModule({
  declarations: [RdEventListComponent, RdEventAddComponent, RdEventEditComponent],
  imports: [
    CommonModule,
    EventRoutingModule,
    NgbModule,
    JwBootstrapSwitchNg2Module,
    MatExpansionModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),
    AngularEditorModule,
    MatDialogModule
  ],
  providers: [EmbedVideoService]
})
export class EventModule { }
