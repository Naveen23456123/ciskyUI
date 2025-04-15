import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { extractTitle } from '@app/core/i18n.service';
import { BoqInvoiceComponent } from './boq-invoice.component';
import { AddBoqStaffComponent } from './boq-staff/add-boq-staff/add-boq-staff.component';
import { EditBoqStaffComponent } from './boq-staff/edit-boq-staff/edit-boq-staff.component';
import { DeleteBoqStaffComponent } from './boq-staff/delete-boq-staff/delete-boq-staff.component';
import { AddBoqTransportationComponent } from './boq-transportation/add-boq-transportation/add-boq-transportation.component';
import { AddBoqRoadSurveyComponent } from './boq-road-survey/add-boq-road-survey/add-boq-road-survey.component';
import { AddBoqReportDocComponent } from './boq-report-doc/add-boq-report-doc/add-boq-report-doc.component';
import { AddBoqOfficeSupplyComponent } from './boq-office-supply/add-boq-office-supply/add-boq-office-supply.component';
import { AddBoqOfficeRentComponent } from './boq-office-rent/add-boq-office-rent/add-boq-office-rent.component';
import { AddBoqOfficeFurnitureComponent } from './boq-office-furniture/add-boq-office-furniture/add-boq-office-furniture.component';
import { AddBoqDutyTravelComponent } from './boq-duty-travel/add-boq-duty-travel/add-boq-duty-travel.component';
import { AddBoqContingencyComponent } from './boq-contingency/add-boq-contingency/add-boq-contingency.component';
import { EditBoqTransportationComponent } from './boq-transportation/edit-boq-transportation/edit-boq-transportation.component';
import { DeleteBoqTransportationComponent } from './boq-transportation/delete-boq-transportation/delete-boq-transportation.component';
import { DeleteBoqContingencyComponent } from './boq-contingency/delete-boq-contingency/delete-boq-contingency.component';
import { EditBoqContingencyComponent } from './boq-contingency/edit-boq-contingency/edit-boq-contingency.component';
import { DeleteBoqDutyTravelComponent } from './boq-duty-travel/delete-boq-duty-travel/delete-boq-duty-travel.component';
import { EditBoqDutyTravelComponent } from './boq-duty-travel/edit-boq-duty-travel/edit-boq-duty-travel.component';
import { DeleteBoqOfficeFurnitureComponent } from './boq-office-furniture/delete-boq-office-furniture/delete-boq-office-furniture.component';
import { EditBoqOfficeFurnitureComponent } from './boq-office-furniture/edit-boq-office-furniture/edit-boq-office-furniture.component';
import { DeleteBoqOfficeRentComponent } from './boq-office-rent/delete-boq-office-rent/delete-boq-office-rent.component';
import { EditBoqOfficeRentComponent } from './boq-office-rent/edit-boq-office-rent/edit-boq-office-rent.component';
import { DeleteBoqOfficeSupplyComponent } from './boq-office-supply/delete-boq-office-supply/delete-boq-office-supply.component';
import { EditBoqOfficeSupplyComponent } from './boq-office-supply/edit-boq-office-supply/edit-boq-office-supply.component';
import { DeleteBoqReportDocComponent } from './boq-report-doc/delete-boq-report-doc/delete-boq-report-doc.component';
import { EditBoqReportDocComponent } from './boq-report-doc/edit-boq-report-doc/edit-boq-report-doc.component';
import { DeleteBoqRoadSurveyComponent } from './boq-road-survey/delete-boq-road-survey/delete-boq-road-survey.component';
import { EditBoqRoadSurveyComponent } from './boq-road-survey/edit-boq-road-survey/edit-boq-road-survey.component';

const routes: Routes = [
  {
    path:'',
    component:BoqInvoiceComponent,
    data:{title:extractTitle('BOQ Invoice')}, 
    children: [
           {
            path: 'staff-create',
            component: AddBoqStaffComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-staff/add-boq-staff/add-boq-staff.module').then(x=>x.AddBoqStaffModule),
            data:{pageGuid:'',type:'add'}
          },
          {
            path: 'boq-staff-edit/:staffId',
            component: EditBoqStaffComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-staff/edit-boq-staff/edit-boq-staff.module').then(x=>x.EditBoqStaffModule),
            data:{pageGuid:'',type:'edit'}
          },
          {
            path: 'boq-staff-delete/:staffId',
            component: DeleteBoqStaffComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-staff/delete-boq-staff/delete-boq-staff.module').then(x=>x.DeleteBoqStaffModule),
            data:{pageGuid:'',type:'delete'}
          },
          {
            path:'tp-create',
            component: AddBoqTransportationComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-transportation/add-boq-transportation/add-boq-transportation.module').then(x=>x.AddBoqTransportationModule),
            data:{pageGuid:'',type:'add'}
          },
          {
            path: 'tp-edit/:tpId',
            component: EditBoqTransportationComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-transportation/edit-boq-transportation/edit-boq-transportation.module').then(x=>x.EditBoqTransportationModule),
            data:{pageGuid:'',type:'edit'}
          },
          {
            path: 'tp-delete/:tpId',
            component: DeleteBoqTransportationComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-transportation/delete-boq-transportation/delete-boq-transportation.module').then(x=>x.DeleteBoqTransportationModule),
            data:{pageGuid:'',type:'delete'}
          },
          {
            path:'rs-create',
            component: AddBoqRoadSurveyComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-road-survey/add-boq-road-survey/add-boq-road-survey.module').then(x=>x.AddBoqRoadSurveyModule),
            data:{pageGuid:'',type:'add'}
          },
          {
            path: 'rs-edit/:rsId',
            component: EditBoqRoadSurveyComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-road-survey/edit-boq-road-survey/edit-boq-road-survey.module').then(x=>x.EditBoqRoadSurveyModule),
            data:{pageGuid:'',type:'edit'}
          },
          {
            path: 'rs-delete/:rsId',
            component: DeleteBoqRoadSurveyComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-road-survey/delete-boq-road-survey/delete-boq-road-survey.module').then(x=>x.DeleteBoqRoadSurveyModule),
            data:{pageGuid:'',type:'delete'}
          },
          {
            path:'rd-create',
            component: AddBoqReportDocComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-report-doc/add-boq-report-doc/add-boq-report-doc.module').then(x=>x.AddBoqReportDocModule),
            data:{pageGuid:'',type:'add'}
          },
          {
            path: 'rd-edit/:rdId',
            component: EditBoqReportDocComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-report-doc/edit-boq-report-doc/edit-boq-report-doc.module').then(x=>x.EditBoqReportDocModule),
            data:{pageGuid:'',type:'edit'}
          },
          {
            path: 'rd-delete/:rdId',
            component: DeleteBoqReportDocComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-report-doc/delete-boq-report-doc/delete-boq-report-doc.module').then(x=>x.DeleteBoqReportDocModule),
            data:{pageGuid:'',type:'delete'}
          },
          {
            path:'os-create',
            component: AddBoqOfficeSupplyComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-office-supply/add-boq-office-supply/add-boq-office-supply.module').then(x=>x.AddBoqOfficeSupplyModule),
            data:{pageGuid:'',type:'add'}
          },
          {
            path: 'os-edit/:osId',
            component: EditBoqOfficeSupplyComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-office-supply/edit-boq-office-supply/edit-boq-office-supply.module').then(x=>x.EditBoqOfficeSupplyModule),
            data:{pageGuid:'',type:'edit'}
          },
          {
            path: 'os-delete/:osId',
            component: DeleteBoqOfficeSupplyComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-office-supply/delete-boq-office-supply/delete-boq-office-supply.module').then(x=>x.DeleteBoqOfficeSupplyModule),
            data:{pageGuid:'',type:'delete'}
          },
          {
            path:'or-create',
            component: AddBoqOfficeRentComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-office-rent/add-boq-office-rent/add-boq-office-rent.module').then(x=>x.AddBoqOfficeRentModule),
            data:{pageGuid:'',type:'add'}
          },
          {
            path: 'or-edit/:orId',
            component: EditBoqOfficeRentComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-office-rent/edit-boq-office-rent/edit-boq-office-rent.module').then(x=>x.EditBoqOfficeRentModule),
            data:{pageGuid:'',type:'edit'}
          },
          {
            path: 'or-delete/:orId',
            component: DeleteBoqOfficeRentComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-office-rent/delete-boq-office-rent/delete-boq-office-rent.module').then(x=>x.DeleteBoqOfficeRentModule),
            data:{pageGuid:'',type:'delete'}
          },
          {
            path:'of-create',
            component: AddBoqOfficeFurnitureComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-office-furniture/add-boq-office-furniture/add-boq-office-furniture.module').then(x=>x.AddBoqOfficeFurnitureModule),
            data:{pageGuid:'',type:'add'}
          },
          {
            path: 'of-edit/:ofId',
            component: EditBoqOfficeFurnitureComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-office-furniture/edit-boq-office-furniture/edit-boq-office-furniture.module').then(x=>x.EditBoqOfficeFurnitureModule),
            data:{pageGuid:'',type:'edit'}
          },
          {
            path: 'of-delete/:ofId',
            component: DeleteBoqOfficeFurnitureComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-office-furniture/delete-boq-office-furniture/delete-boq-office-furniture.module').then(x=>x.DeleteBoqOfficeFurnitureModule),
            data:{pageGuid:'',type:'delete'}
          },
          {
            path:'dt-create',
            component: AddBoqDutyTravelComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-duty-travel/add-boq-duty-travel/add-boq-duty-travel.module').then(x=>x.AddBoqDutyTravelModule),
            data:{pageGuid:'',type:'add'}
          },
          {
            path: 'dt-edit/:dtId',
            component: EditBoqDutyTravelComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-duty-travel/edit-boq-duty-travel/edit-boq-duty-travel.module').then(x=>x.EditBoqDutyTravelModule),
            data:{pageGuid:'',type:'edit'}
          },
          {
            path: 'dt-delete/:dtId',
            component: DeleteBoqDutyTravelComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-duty-travel/delete-boq-duty-travel/delete-boq-duty-travel.module').then(x=>x.DeleteBoqDutyTravelModule),
            data:{pageGuid:'',type:'delete'}
          },
          {
            path:'cont-create',
            component: AddBoqContingencyComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-contingency/add-boq-contingency/add-boq-contingency.module').then(x=>x.AddBoqContingencyModule),
            data:{pageGuid:'',type:'add'}
          },
          {
            path: 'cont-edit/:contId',
            component: EditBoqContingencyComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-contingency/edit-boq-contingency/edit-boq-contingency.module').then(x=>x.EditBoqContingencyModule),
            data:{pageGuid:'',type:'edit'}
          },
          {
            path: 'cont-delete/:contId',
            component: DeleteBoqContingencyComponent,
            loadChildren:()=>import('app/invoice-control/boq-invoice/boq-contingency/delete-boq-contingency/delete-boq-contingency.module').then(x=>x.DeleteBoqContingencyModule),
            data:{pageGuid:'',type:'delete'}
          }
        ]     
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BoqInvoiceRoutingModule { }
