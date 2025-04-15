import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectListRoutingModule } from './project-list-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { ProjectListComponent } from './project-list.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ProjectListComponent],
  imports: [
    CommonModule,
    ProjectListRoutingModule, SharedModule, MaterialModule,NgxChartsModule, FormsModule
  ]
})
export class ProjectListModule { }
