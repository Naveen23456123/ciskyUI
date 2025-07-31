import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '@app/shared/shared.module';
import { MaterialModule } from '@app/shared/material/material.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxEchartsModule } from 'ngx-echarts';
// import echarts core
import * as echarts from 'echarts/core';
// import necessary echarts components
import { BarChart, LineChart, PieChart } from 'echarts/charts';
import { GraphicComponent, GridComponent, LegendComponent, TitleComponent, ToolboxComponent, TooltipComponent } from 'echarts/components';
import { CanvasRenderer } from 'echarts/renderers';
import { DashboardTestComponent } from './dashboard-test.component';
import { DashboardTestRoutingModule } from './dashboard-test-routing.module';
echarts.use([BarChart,LineChart,TooltipComponent,TitleComponent,ToolboxComponent, GraphicComponent, LegendComponent,PieChart, GridComponent, CanvasRenderer]);

@NgModule({
  declarations: [
    DashboardTestComponent
  ],
  imports: [
    CommonModule,
    DashboardTestRoutingModule, SharedModule, MaterialModule, NgxChartsModule,
    NgxEchartsModule.forRoot({ echarts }),
  ]
})
export class DashboardTestModule { }
