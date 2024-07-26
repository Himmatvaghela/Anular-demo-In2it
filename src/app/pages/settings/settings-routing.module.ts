import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomTaskComponent } from './custom-task/custom-task.component';
import { OrganizationSettingComponent } from './organization-setting/organization-setting.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'custom-task',
    pathMatch:"full"
  },
  {
    path:'custom-task',
    component:CustomTaskComponent
  },
  {
    path:'organization-settings',
    component:OrganizationSettingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
