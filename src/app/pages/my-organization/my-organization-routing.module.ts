import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolutionAreasComponent } from './solution-areas/solution-areas.component';
import { ProcessComponent } from './process/process.component';
import { WorkflowsComponent } from './workflows/workflows.component';
import { HumanTasksComponent } from './human-tasks/human-tasks.component';
import { WorkflowsExecutionComponent } from './workflows-execution/workflows-execution.component';
import { SheduleListComponent } from './shedule-list/shedule-list.component';
import { OrganzationComponent } from './organzation/organzation.component';
import { OrganizationDataComponent } from './organization-data/organization-data.component';
import { AllContactsComponent } from './all-contacts/all-contacts.component';

const routes: Routes = [
  {
    path:'', redirectTo:'solution-areas', pathMatch: "full",
  },
  {
    path:'solution-areas',
    component:SolutionAreasComponent
  },
  {
    path:'process',
    component:ProcessComponent
  },
  {
    path:'workflows',
    component:WorkflowsComponent
  },
  {
    path:'human-tasks',
    component:HumanTasksComponent
  },
  {
    path:'workflow-execution',
    component:WorkflowsExecutionComponent
  },
  {
    path:'shedule-list',
    component:SheduleListComponent
  },
  {
    path:'contact',
    component:AllContactsComponent
  },
  {
    path:'organization',
    component:OrganzationComponent
  },
  {
    path:'organization/details',
    component:OrganizationDataComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOrganizationRoutingModule { }
