import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShellComponent } from './shell.component';
import { RouterModule } from '@angular/router';
import {NgMaterialMultilevelMenuModule, MultilevelMenuService as eb } from 'ng-material-multilevel-menu';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '@app/shared/shared.module';
import {TranslateModule} from '@ngx-translate/core';
import { MaterialModule } from '@app/shared/material/material.module';

@NgModule({
  declarations: [ShellComponent, HeaderComponent],
  imports: [
    CommonModule, RouterModule, MaterialModule, NgMaterialMultilevelMenuModule, SharedModule,TranslateModule
  ],
  providers:[eb]
})
export class ShellModule { }
