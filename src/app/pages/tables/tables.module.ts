import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TablesRoutingModule } from './tables-routing.module';
import { ProductsComponent } from './products/products.component';
import { AgGridModule } from 'ag-grid-angular';
import { SharedModule } from '../shared/shared.module';
import { FeatherModule } from 'angular-feather';
import { allIcons } from 'angular-feather/icons';
import { LocalListComponent } from './local-list/local-list.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProductsComponent,
    LocalListComponent
  ],
  imports: [
    CommonModule,
    TablesRoutingModule,
    FormsModule,
    FeatherModule.pick(allIcons),
    AgGridModule,
    SharedModule
  ],
  exports:[
    FeatherModule
  ]
})
export class TablesModule { }
