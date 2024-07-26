import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { AgGridTableComponent } from './ag-grid-table/ag-grid-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { OrgRendererComponent } from './cellRenderer/org-renderer/org-renderer.component';
import { ButtonRendererComponent } from './cellRenderer/button-renderer/button-renderer.component';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { InputRendererComponent } from './cellRenderer/input-renderer/input-renderer.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AgGridTableComponent,
    OrgRendererComponent,
    ButtonRendererComponent,
    InputRendererComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedRoutingModule,
    AgGridModule,
    FeatherModule.pick(allIcons),
  ],
  exports:[
    AgGridTableComponent,
    FeatherModule
  ]
})
export class SharedModule { }
