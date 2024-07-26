import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkflowBuilderComponent } from './workflow-builder/workflow-builder.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ChartsComponent } from './charts/charts.component';

const routes: Routes = [
  {
    path:'',
    redirectTo:'workflow-builder',
    pathMatch:"full"
  },
  {
    path:'workflow-builder',
    component:WorkflowBuilderComponent
  },
  {
    path:'form-builder',
    component:FormBuilderComponent
  },
  {
    path:'charts',
    component:ChartsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignerRoutingModule { }
