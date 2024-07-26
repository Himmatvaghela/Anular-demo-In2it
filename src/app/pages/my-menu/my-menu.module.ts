import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyMenuRoutingModule } from './my-menu-routing.module';
import { TeamTaskComponent } from './team-task/team-task.component';
import { MyTaskComponent } from './my-task/my-task.component';
import { CardComponent } from './card/card.component';
import { FeatherModule } from 'angular-feather';

import { allIcons } from 'angular-feather/icons';
import { FormComponent } from './form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        TeamTaskComponent,
        MyTaskComponent,
        CardComponent,
        FormComponent
    ],
    exports: [
        FeatherModule
    ],
    imports: [
        CommonModule,
        MyMenuRoutingModule,
        FeatherModule.pick(allIcons),
        FormsModule,
        ReactiveFormsModule,
        SharedModule
    ]
})
export class MyMenuModule { }
