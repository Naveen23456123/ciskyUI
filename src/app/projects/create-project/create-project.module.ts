import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateProjectRoutingModule } from './create-project-routing.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { SharedModule } from '@app/shared/shared.module';
import { CreateProjectComponent } from './create-project.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CreateProjectRoutingModule, MaterialModule, SharedModule
  ]
})
export class CreateProjectModule { }
