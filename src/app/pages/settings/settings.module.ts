import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { CustomTaskComponent } from './custom-task/custom-task.component';
import { OrganizationSettingComponent } from './organization-setting/organization-setting.component';


@NgModule({
  declarations: [
    CustomTaskComponent,
    OrganizationSettingComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
