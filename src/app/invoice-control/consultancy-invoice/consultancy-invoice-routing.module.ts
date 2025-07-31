import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConsultancyInvoiceComponent } from './consultancy-invoice.component';
import { extractTitle } from '@app/core/i18n.service';
import { AddConStaffComponent } from './con-staff/add-con-staff/add-con-staff.component';
import { EditConStaffComponent } from './con-staff/edit-con-staff/edit-con-staff.component';
import { DeleteConStaffComponent } from './con-staff/delete-con-staff/delete-con-staff.component';
import { AddConTransportationComponent } from './con-transportation/add-con-transportation/add-con-transportation.component';
import { EditConTransportationComponent } from './con-transportation/edit-con-transportation/edit-con-transportation.component';
import { DeleteConTransportationComponent } from './con-transportation/delete-con-transportation/delete-con-transportation.component';
import { AddConRoadSurveyComponent } from './con-road-survey/add-con-road-survey/add-con-road-survey.component';
import { EditConRoadSurveyComponent } from './con-road-survey/edit-con-road-survey/edit-con-road-survey.component';
import { DeleteConRoadSurveyComponent } from './con-road-survey/delete-con-road-survey/delete-con-road-survey.component';
import { AddConReportDocComponent } from './con-report-doc/add-con-report-doc/add-con-report-doc.component';
import { EditConReportDocComponent } from './con-report-doc/edit-con-report-doc/edit-con-report-doc.component';
import { DeleteConReportDocComponent } from './con-report-doc/delete-con-report-doc/delete-con-report-doc.component';
import { AddConOfcSupplyComponent } from './con-ofc-supply/add-con-ofc-supply/add-con-ofc-supply.component';
import { EditConOfcSupplyComponent } from './con-ofc-supply/edit-con-ofc-supply/edit-con-ofc-supply.component';
import { DeleteConOfcSupplyComponent } from './con-ofc-supply/delete-con-ofc-supply/delete-con-ofc-supply.component';
import { AddConOfcRentComponent } from './con-ofc-rent/add-con-ofc-rent/add-con-ofc-rent.component';
import { EditConOfcRentComponent } from './con-ofc-rent/edit-con-ofc-rent/edit-con-ofc-rent.component';
import { DeleteConOfcRentComponent } from './con-ofc-rent/delete-con-ofc-rent/delete-con-ofc-rent.component';
import { AddConOfcFurnitureComponent } from './con-ofc-furniture/add-con-ofc-furniture/add-con-ofc-furniture.component';
import { DeleteConOfcFurnitureComponent } from './con-ofc-furniture/delete-con-ofc-furniture/delete-con-ofc-furniture.component';
import { EditConOfcFurnitureComponent } from './con-ofc-furniture/edit-con-ofc-furniture/edit-con-ofc-furniture.component';
import { AddConDutyTravelComponent } from './con-duty-travel/add-con-duty-travel/add-con-duty-travel.component';
import { EditConDutyTravelComponent } from './con-duty-travel/edit-con-duty-travel/edit-con-duty-travel.component';
import { DeleteConDutyTravelComponent } from './con-duty-travel/delete-con-duty-travel/delete-con-duty-travel.component';
import { AddConContingencyComponent } from './con-contigency/add-con-contingency/add-con-contingency.component';
import { EditConContingencyComponent } from './con-contigency/edit-con-contingency/edit-con-contingency.component';
import { DeleteConContingencyComponent } from './con-contigency/delete-con-contingency/delete-con-contingency.component';

const routes: Routes = [
  {
    path:'',
    component:ConsultancyInvoiceComponent,
    data:{title:extractTitle('Invoice')},
    children: [
              {
               path: 'staff-create',
               component: AddConStaffComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-staff/add-con-staff/add-con-staff.module').then(x=>x.AddConStaffModule),
               data:{pageGuid:'',type:'add'}
             },
             {
               path: 'con-staff-edit/:staffId',
               component: EditConStaffComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-staff/edit-con-staff/edit-con-staff.module').then(x=>x.EditConStaffModule),
               data:{pageGuid:'',type:'edit'}
             },
             {
               path: 'con-staff-delete/:staffId',
               component: DeleteConStaffComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-staff/delete-con-staff/delete-con-staff.module').then(x=>x.DeleteConStaffModule),
               data:{pageGuid:'',type:'delete'}
             },
             {
               path:'tp-create',
               component: AddConTransportationComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-transportation/add-con-transportation/add-con-transportation.module').then(x=>x.AddConTransportationModule),
               data:{pageGuid:'',type:'add'}
             },
             {
               path: 'tp-edit/:tpId',
               component: EditConTransportationComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-transportation/edit-con-transportation/edit-con-transportation.module').then(x=>x.EditConTransportationModule),
               data:{pageGuid:'',type:'edit'}
             },
             {
               path: 'tp-delete/:tpId',
               component: DeleteConTransportationComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-transportation/delete-con-transportation/delete-con-transportation.module').then(x=>x.DeleteConTransportationModule),
               data:{pageGuid:'',type:'delete'}
             },
             {
               path:'rs-create',
               component: AddConRoadSurveyComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-road-survey/add-con-road-survey/add-con-road-survey.module').then(x=>x.AddConRoadSurveyModule),
               data:{pageGuid:'',type:'add'}
             },
             {
               path: 'rs-edit/:rsId',
               component: EditConRoadSurveyComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-road-survey/edit-con-road-survey/edit-con-road-survey.module').then(x=>x.EditConRoadSurveyModule),
               data:{pageGuid:'',type:'edit'}
             },
             {
               path: 'rs-delete/:rsId',
               component: DeleteConRoadSurveyComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-road-survey/delete-con-road-survey/delete-con-road-survey.module').then(x=>x.DeleteConRoadSurveyModule),
               data:{pageGuid:'',type:'delete'}
             },
             {
               path:'rd-create',
               component: AddConReportDocComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-report-doc/add-con-report-doc/add-con-report-doc.module').then(x=>x.AddConReportDocModule),
               data:{pageGuid:'',type:'add'}
             },
             {
               path: 'rd-edit/:rdId',
               component: EditConReportDocComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-report-doc/edit-con-report-doc/edit-con-report-doc.module').then(x=>x.EditConReportDocModule),
               data:{pageGuid:'',type:'edit'}
             },
             {
               path: 'rd-delete/:rdId',
               component: DeleteConReportDocComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-report-doc/delete-con-report-doc/delete-con-report-doc.module').then(x=>x.DeleteConReportDocModule),
               data:{pageGuid:'',type:'delete'}
             },
             {
               path:'os-create',
               component: AddConOfcSupplyComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-ofc-supply/add-con-ofc-supply/add-con-ofc-supply.module').then(x=>x.AddConOfcSupplyModule),
               data:{pageGuid:'',type:'add'}
             },
             {
               path: 'os-edit/:osId',
               component: EditConOfcSupplyComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-ofc-supply/edit-con-ofc-supply/edit-con-ofc-supply.module').then(x=>x.EditConOfcSupplyModule),
               data:{pageGuid:'',type:'edit'}
             },
             {
               path: 'os-delete/:osId',
               component: DeleteConOfcSupplyComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-ofc-supply/delete-con-ofc-supply/delete-con-ofc-supply.module').then(x=>x.DeleteConOfcSupplyModule),
               data:{pageGuid:'',type:'delete'}
             },
             {
               path:'or-create',
               component: AddConOfcRentComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-ofc-rent/add-con-ofc-rent/add-con-ofc-rent.module').then(x=>x.AddConOfcRentModule),
               data:{pageGuid:'',type:'add'}
             },
             {
               path: 'or-edit/:orId',
               component: EditConOfcRentComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-ofc-rent/edit-con-ofc-rent/edit-con-ofc-rent.module').then(x=>x.EditConOfcRentModule),
               data:{pageGuid:'',type:'edit'}
             },
             {
               path: 'or-delete/:orId',
               component: DeleteConOfcRentComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-ofc-rent/delete-con-ofc-rent/delete-con-ofc-rent.module').then(x=>x.DeleteConOfcRentModule),
               data:{pageGuid:'',type:'delete'}
             },
             {
               path:'of-create',
               component: AddConOfcFurnitureComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-ofc-furniture/add-con-ofc-furniture/add-con-ofc-furniture.module').then(x=>x.AddConOfcFurnitureModule),
               data:{pageGuid:'',type:'add'}
             },
             {
               path: 'of-edit/:ofId',
               component: EditConOfcFurnitureComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-ofc-furniture/edit-con-ofc-furniture/edit-con-ofc-furniture.module').then(x=>x.EditConOfcFurnitureModule),
               data:{pageGuid:'',type:'edit'}
             },
             {
               path: 'of-delete/:ofId',
               component: DeleteConOfcFurnitureComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-ofc-furniture/delete-con-ofc-furniture/delete-con-ofc-furniture.module').then(x=>x.DeleteConOfcFurnitureModule),
               data:{pageGuid:'',type:'delete'}
             },
             {
               path:'dt-create',
               component: AddConDutyTravelComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-duty-travel/add-con-duty-travel/add-con-duty-travel.module').then(x=>x.AddConDutyTravelModule),
               data:{pageGuid:'',type:'add'}
             },
             {
               path: 'dt-edit/:dtId',
               component: EditConDutyTravelComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-duty-travel/edit-con-duty-travel/edit-con-duty-travel.module').then(x=>x.EditConDutyTravelModule),
               data:{pageGuid:'',type:'edit'}
             },
             {
               path: 'dt-delete/:dtId',
               component: DeleteConDutyTravelComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-duty-travel/delete-con-duty-travel/delete-con-duty-travel.module').then(x=>x.DeleteConDutyTravelModule),
               data:{pageGuid:'',type:'delete'}
             },
             {
               path:'cont-create',
               component: AddConContingencyComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-contigency/add-con-contingency/add-con-contingency.module').then(x=>x.AddConContingencyModule),
               data:{pageGuid:'',type:'add'}
             },
             {
               path: 'cont-edit/:contId',
               component: EditConContingencyComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-contigency/edit-con-contingency/edit-con-contingency.module').then(x=>x.EditConContingencyModule),
               data:{pageGuid:'',type:'edit'}
             },
             {
               path: 'cont-delete/:contId',
               component: DeleteConContingencyComponent,
               loadChildren:()=>import('app/invoice-control/consultancy-invoice/con-contigency/delete-con-contingency/delete-con-contingency.module').then(x=>x.DeleteConContingencyModule),
               data:{pageGuid:'',type:'delete'}
             }
           ]   
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultancyInvoiceRoutingModule { }
