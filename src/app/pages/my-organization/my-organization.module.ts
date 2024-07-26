import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrganizationRoutingModule } from './my-organization-routing.module';
import { SolutionAreasComponent } from './solution-areas/solution-areas.component';
import { ProcessComponent } from './process/process.component';
import { WorkflowsComponent } from './workflows/workflows.component';
import { HumanTasksComponent } from './human-tasks/human-tasks.component';
import { WorkflowsExecutionComponent } from './workflows-execution/workflows-execution.component';
import { SheduleListComponent } from './shedule-list/shedule-list.component';
import { OrganzationComponent } from './organzation/organzation.component';
import { ContactComponent } from './contact/contact.component';
import { allIcons } from 'angular-feather/icons';
import { FeatherModule } from 'angular-feather';
import { OrganizationDataComponent } from './organization-data/organization-data.component';
import { TabBarComponent } from './tab-bar/tab-bar.component';
import {  NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllContactsComponent } from './all-contacts/all-contacts.component';
import {  AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    SolutionAreasComponent,
    ProcessComponent,
    WorkflowsComponent,
    HumanTasksComponent,
    WorkflowsExecutionComponent,
    SheduleListComponent,
    OrganzationComponent,
    ContactComponent,
    OrganizationDataComponent,
    TabBarComponent,
    AllContactsComponent,
  ],
  imports: [
    CommonModule,
    MyOrganizationRoutingModule,
    FeatherModule.pick(allIcons),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbNavModule,
    AgGridModule,
    SharedModule
  ],
  exports:[
    FeatherModule
  ]
})
export class MyOrganizationModule { }
