import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeatherModule } from 'angular-feather';

import { allIcons } from 'angular-feather/icons';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';





@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,

  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FeatherModule.pick(allIcons),
    NgbModule,
    NgbNavModule,
    FormsModule,
    AgGridModule
  ],

  exports: [
    FeatherModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
