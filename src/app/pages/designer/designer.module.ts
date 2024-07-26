import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignerRoutingModule } from './designer-routing.module';
import { WorkflowBuilderComponent } from './workflow-builder/workflow-builder.component';
import { FormBuilderComponent } from './form-builder/form-builder.component';
import { ChartsComponent } from './charts/charts.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { CertaintyChartComponent } from './certainty-chart/certainty-chart.component';
import { FunnelChartComponent } from './funnel-chart/funnel-chart.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';


@NgModule({
  declarations: [
    WorkflowBuilderComponent,
    FormBuilderComponent,
    ChartsComponent,
    PieChartComponent,
    CertaintyChartComponent,
    FunnelChartComponent
  ],
  imports: [
    CommonModule,
    DesignerRoutingModule,
    FeatherModule.pick(allIcons),
  ],
  exports:[
    FeatherModule
  ]
})
export class DesignerModule { }
