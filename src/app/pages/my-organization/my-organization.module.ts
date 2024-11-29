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
import { InputErrorDirective } from 'src/app/directive/input-error.directive';
import { NumericValidatorDirective } from 'src/app/directive/numeric-validator.directive';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';


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
    InputErrorDirective,
    NumericValidatorDirective
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
    SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  exports:[
    FeatherModule
  ]
})
export class MyOrganizationModule { }
