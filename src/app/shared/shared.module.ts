import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { LockerModule } from 'angular-safeguard';
import { NotifyBarComponent } from './notify-bar/notify-bar.component';
import { AlertComponent } from './dialogs/alert/alert.component';
import { RouterModule } from '@angular/router';
import { LoaderComponent } from './loader/loader.component';
import { CONSTANTS, Constants } from './models/constant.config';
import { HelpComponent } from './help/help.component';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { ReactiveFormsModule, FormControl, FormsModule } from '@angular/forms';
import { BtnLoaderComponent } from './btn-loader/btn-loader.component';
import { TranslateModule } from '@ngx-translate/core';
//import { NgxMatColorPickerModule, MAT_COLOR_FORMATS, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import { NotificationTextComponent } from './components/notification-text/notification-text.component';
import { MonthAndYearPickerComponent } from './components/month-and-year-picker/month-and-year-picker.component';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { DateTimePipe } from './pipes/date-time.pipe';
//import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';
//import { AgmCoreModule } from '@agm/core';
import { TimePipe } from './pipes/time.pipe';
import { AccessDirective } from './directives/access.directive';
import { NotEditableComponent } from './components/not-editable/not-editable.component';
import { StatusIconComponent } from './components/status-icon/status-icon.component';
import { LocationComponent } from './components/location/location.component';
import { ManageProjectComponent } from './components/manage-project/manage-project.component';
import { MaterialModule } from './material/material.module';
import { ManageContractorComponent } from './components/manage-contractor/manage-contractor.component';
import { AttachFileComponent } from './components/attach-file/attach-file.component';
import { SiteProgressListComponent } from './components/site-progress/site-progress-list/site-progress-list.component';
import { ManageSiteProgressComponent } from './components/site-progress/manage-site-progress/manage-site-progress.component';
import { EotListComponent } from './components/eot/eot-list/eot-list.component';
import { CosListComponent } from './components/cos/cos-list/cos-list.component';
import { MilestoneListComponent } from './components/milestone/milestone-list/milestone-list.component';
import { ManageLettersListComponent } from './components/letters/manage-letters-list/manage-letters-list.component';
import { ManageMilestoneComponent } from './components/milestone/manage-milestone/manage-milestone.component';
import { ManageEotComponent } from './components/eot/manage-eot/manage-eot.component';
import { ManageCosComponent } from './components/cos/manage-cos/manage-cos.component';
import { AttachLetterComponent } from './components/letters/attach-letter/attach-letter.component';
import { UploadFileComponent } from './components/upload-file/upload-file.component';
import { ReplaceUnderscorePipe } from './pipes/replace-underscore.pipe';
import { UploadBtnComponent } from './upload-btn/upload-btn.component';
import { DownloadCsvComponent } from './components/download-csv/download-csv.component';
import { ManageSubcompanyComponent } from './components/manage-subcompany/manage-subcompany.component';
import { ManageDepartmentComponent } from './components/manage-department/manage-department.component';
import { ManageDesignationComponent } from './components/manage-designation/manage-designation.component';
import { ManageConsultantAccountComponent } from './components/consultant/manage-consultant-account/manage-consultant-account.component';
import { ManageSiteInventoryComponent } from './components/inventory/manage-site-inventory/manage-site-inventory.component';
import { ManageItemComponent } from './components/manage-item/manage-item.component';
import { ManageEmployeeComponent } from './components/employee/manage-employee/manage-employee.component';
import { ManageVehicleComponent } from './components/vehicle/manage-vehcile/manage-vehcile.component';
import { ManageVehcileLogComponent } from './components/vehicle/manage-vehcile-log/manage-vehcile-log.component';
import { ManageVehcileBillingComponent } from './components/vehicle/manage-vehcile-billing/manage-vehcile-billing.component';
import { ManageInsuranceComponent } from './components/insurance/manage-insurance/manage-insurance.component';
import { InsuranceListComponent } from './components/insurance/insurance-list/insurance-list.component';
import { ManageBankGuaranteeComponent } from './components/bank-guarantee/manage-bank-guarantee/manage-bank-guarantee.component';
import { BankGuaranteeListComponent } from './components/bank-guarantee/bank-guarantee-list/bank-guarantee-list.component';
import { ContractorBillingListComponent } from './components/contractor-billing/contractor-billing-list/contractor-billing-list.component';
import { ManageContractorBillingComponent } from './components/contractor-billing/manage-contractor-billing/manage-contractor-billing.component';
import { ManageVehicleListComponent } from './components/vehicle/manage-vehicle-list/manage-vehicle-list.component';
import { ManageEmployeeListComponent } from './components/employee/manage-employee-list/manage-employee-list.component';
import { ManageInventoryListComponent } from './components/inventory/manage-inventory-list/manage-inventory-list.component';
import { ManageConsultantComponent } from './components/consultant/manage-consultant/manage-consultant.component';
import { ManageBoqAttendenceComponent } from './components/attendence/manage-boq-attendence/manage-boq-attendence.component';
import { ContactListComponent } from './components/contacts/contact-list/contact-list.component';
import { ManageContactComponent } from './components/contacts/manage-contact/manage-contact.component';
import { ContractorBillingDetailsComponent } from './components/contractor-billing/contractor-billing-details/contractor-billing-details.component';
import { ManageCircularComponent } from './components/manage-circular/manage-circular.component';
import { ManageBoqInvoiceComponent } from './components/invoices/boq/manage-boq-invoice/manage-boq-invoice.component';
import { ManageConsultancyInvoiceComponent } from './components/invoices/consultancy/manage-consultancy-invoice/manage-consultancy-invoice.component';
import { ManageSupportStaffComponent } from './components/invoices/boq/manage-support-staff/manage-support-staff.component';
import { ManageTransportationComponent } from './components/invoices/boq/manage-transportation/manage-transportation.component';
import { ManageDutyTravelComponent } from './components/invoices/boq/manage-duty-travel/manage-duty-travel.component';
import { ManageOfficeRentComponent } from './components/invoices/boq/manage-office-rent/manage-office-rent.component';
import { ManageOfficeSuppliesComponent } from './components/invoices/boq/manage-office-supplies/manage-office-supplies.component';
import { ManageOfficeFurnitureComponent } from './components/invoices/boq/manage-office-furniture/manage-office-furniture.component';
import { ManageReportDocComponent } from './components/invoices/boq/manage-report-doc/manage-report-doc.component';
import { ManageRoadSurveyComponent } from './components/invoices/boq/manage-road-survey/manage-road-survey.component';
import { ManageContingenciesComponent } from './components/invoices/boq/manage-contingencies/manage-contingencies.component';
import { ManageConsultancyStaffComponent } from './components/invoices/consultancy/manage-consultancy-staff/manage-consultancy-staff.component';
import { ManageConsultancyContingenciesComponent } from './components/invoices/consultancy/manage-consultancy-contingencies/manage-consultancy-contingencies.component';
import { ManageConsultancyReportDocComponent } from './components/invoices/consultancy/manage-consultancy-report-doc/manage-consultancy-report-doc.component';
import { ManageConsultancyOfficeFurnitureComponent } from './components/invoices/consultancy/manage-consultancy-office-furniture/manage-consultancy-office-furniture.component';
import { ManageConsultancyOfficeSuppliesComponent } from './components/invoices/consultancy/manage-consultancy-office-supplies/manage-consultancy-office-supplies.component';
import { ManageConsultancyOfficeRentComponent } from './components/invoices/consultancy/manage-consultancy-office-rent/manage-consultancy-office-rent.component';
import { ManageConsultancyDutyTravelComponent } from './components/invoices/consultancy/manage-consultancy-duty-travel/manage-consultancy-duty-travel.component';
import { ManageConsultancyTransportationComponent } from './components/invoices/consultancy/manage-consultancy-transportation/manage-consultancy-transportation.component';
import { ManageOfficeRentControlComponent } from './components/office/manage-office-rent-control/manage-office-rent-control.component';
import { SelectSearchComponent } from './single-select-search/select-search.component';
import { ManageConsultancyRoadSurveyComponent } from './components/invoices/consultancy/manage-consultancy-road-survey/manage-consultancy-road-survey.component';
import { FormatDatePipe } from './pipes/format-date.pipe';
import { FileIconComponent } from './components/file-icon/file-icon.component';
import { BreadCrumComponent } from './components/bread-crum/bread-crum.component';
import { SearchBarControlsComponent } from './components/search-bar-controls/search-bar-controls.component';
import { ViewLetterDetailsComponent } from './components/letters/view-letter-details/view-letter-details.component';
import { ViewEmployeeListComponent } from './components/employee/view-employee-list/view-employee-list.component';
import { ViewBtnComponent } from './view-btn/view-btn.component';
import { ProjectControlComponent } from './components/project-control/project-control.component';
import { ContractorLetterListComponent } from '@app/contractor/contractor-letter-list/contractor-letter-list.component';
import { FormatCurrencyPipe } from './pipes/format-currency.pipe';
import { EditBtnComponent } from './components/edit-btn/edit-btn.component';
import { DeleteBtnComponent } from './components/delete-btn/delete-btn.component';
import { ManageVehicleDocComponent } from './components/vehicle/manage-vehicle-doc/manage-vehicle-doc.component';
import { DeleteVehicleDocComponent } from './components/vehicle/delete-vehicle-doc/delete-vehicle-doc.component';
import { NoDataComponent } from './no-data-component/no-data.component';
import { ViewEmployeeDetailsComponent } from './components/employee/view-employee-details/view-employee-details.component';
import { ManageEmployeeDocComponent } from './components/employee/manage-employee-doc/manage-employee-doc.component';
import { DeleteEmployeeDocComponent } from './components/employee/delete-employee-doc/delete-employee-doc.component';
import { DocumentManageBtnComponent } from './components/document-manage-btn/document-manage-btn.component';
import { DetailVehicleComponent } from './components/vehicle/detail-vehicle/detail-vehicle.component';
import { ManageProfitLossComponent } from './components/proft-and-loss/manage-profit-loss/manage-profit-loss.component';
import { ManageTicketComponent } from './components/manage-ticket/manage-ticket.component';
import { ManageImperestComponent } from './components/siteops/manage-imperest/manage-imperest.component';
import { ManageExpenseComponent } from './components/siteops/manage-expense/manage-expense.component';
import { ManageApprovalComponent } from './components/settings/manage-approval/manage-approval.component';
import { ExploreMilestoneComponent } from './components/explore/explore-milestone/explore-milestone.component';
import { ExploreSiteProgressComponent } from './components/explore/explore-site-progress/explore-site-progress.component';
import { ExploreEotComponent } from './components/explore/explore-eot/explore-eot.component';
import { ExploreCosComponent } from './components/explore/explore-cos/explore-cos.component';
import { ManageOfficeDocComponent } from './components/office/manage-office-doc/manage-office-doc.component';
import { DeleteOfficeDocComponent } from './components/office/delete-office-doc/delete-office-doc.component';
import { ExploreBankGuaranteeComponent } from './components/explore/explore-bank-guarantee/explore-bank-guarantee.component';
import { ExploreInsuranceComponent } from './components/explore/explore-insurance/explore-insurance.component';
import { SubmitLoadBtnComponent } from './components/btn/submit-load-btn/submit-load-btn.component';
import { FormatAmountPipe } from './pipes/format-amount.pipe';
import { ManageUploadEmpComponent } from './components/employee/manage-upload-emp/manage-upload-emp.component';
import { UploadDataComponent } from './components/upload-data/upload-data.component';
import { ManageUploadInventoryComponent } from './components/inventory/manage-upload-inventory/manage-upload-inventory.component';
import { AddIconBtnComponent } from './components/btn/add-icon-btn/add-icon-btn.component';
import { ManageUploadLettersComponent } from './components/letters/manage-upload-letters/manage-upload-letters.component';
import { ItemEmployeesComponent } from './components/employee/item-employees/item-employees.component';
import { ManageUploadVehicleComponent } from './components/vehicle/manage-upload-vehicle/manage-upload-vehicle.component';
import { ViewReadingImageComponent } from './components/vehicle/view-reading-image/view-reading-image.component';
import { ManageLetterDocComponent } from './components/letters/manage-letter-doc/manage-letter-doc.component';
import { DeleteLetterDocComponent } from './components/letters/delete-letter-doc/delete-letter-doc.component';
import { AlertBadgeComponent } from './alert-badge/alert-badge.component';
import { EditIconBtnComponent } from './components/btn/edit-icon-btn/edit-icon-btn.component';
import { ConsultentListSummaryComponent } from './components/consultant/consultent-list-summary/consultent-list-summary.component';
import { LetterInfoSummaryComponent } from './components/letters/letter-info-summary/letter-info-summary.component';
import { EotInfoSummaryComponent } from './components/eot/eot-info-summary/eot-info-summary.component';
import { CosInfoSummaryComponent } from './components/cos/cos-info-summary/cos-info-summary.component';
import { EmployeeInfoSummaryComponent } from './components/employee/employee-info-summary/employee-info-summary.component';
import { ManageOfcRentBillingComponent } from './components/siteops/manage-ofc-rent-billing/manage-ofc-rent-billing.component';
import { ManageProfitLossSheetComponent } from './components/profit-and-loss/manage-profit-loss-sheet/manage-profit-loss-sheet.component';
import { ProfitLossInvListComponent } from './components/profit-and-loss/profit-loss-inv-list/profit-loss-inv-list.component';
import { ProfitLossInvDetailsComponent } from './components/profit-and-loss/profit-loss-inv-details/profit-loss-inv-details.component';
import { ProfitLossCommulativeComponent } from './components/profit-and-loss/profit-loss-commulative/profit-loss-commulative.component';
import { FinanicalYearComponent } from './components/finanical-year/finanical-year.component';
import { StatusBadgeComponent } from './components/status-badge/status-badge.component';
import { ManageUploadConsultantComponent } from './components/consultant/manage-upload-consultant/manage-upload-consultant.component';
import { ManageOfcBillingReqComponent } from './components/siteops/manage-ofc-billing-req/manage-ofc-billing-req.component';
import { ManageImperestBillingReqComponent } from './components/siteops/manage-imperest-billing-req/manage-imperest-billing-req.component';
import { ManageVehBillingReqComponent } from './components/siteops/manage-veh-billing-req/manage-veh-billing-req.component';
import { BillingInfoSummaryComponent } from './components/siteops/billing-info-summary/billing-info-summary.component';
import { ManageExpBillingReqComponent } from './components/siteops/manage-exp-billing-req/manage-exp-billing-req.component';
import { ViewExpDetailsInfoComponent } from './components/siteops/view-exp-details-info/view-exp-details-info.component';
import { ProjectReportsListComponent } from './components/projects-report/project-reports-list/project-reports-list.component';
import { ManageProjectReportsComponent } from './components/projects-report/manage-project-reports/manage-project-reports.component';
import { ExploreProjectReportsComponent } from './components/explore/explore-project-reports/explore-project-reports.component';
import { LetterCountSummaryComponent } from './components/letters/letter-count-summary/letter-count-summary.component';
import { ManageProjectInvoiceListComponent } from './components/payment/manage-project-invoice-list/manage-project-invoice-list.component';
import { EmptyTableSkltnComponent } from './components/empty-table-skltn/empty-table-skltn.component';
import { DownloadPdfComponent } from './components/btn/download-pdf/download-pdf.component';
import { ManageMiscComponent } from './components/manage-misc/manage-misc.component';
import { ProjectSubshellComponent } from './components/projects/project-subshell/project-subshell.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ManageSupervisionComponent } from './components/projects/transport-infra/supervision/manage-supervision/manage-supervision.component';
import { ManageDprComponent } from './components/projects/transport-infra/dpr/manage-dpr/manage-dpr.component';
import { ManageSupervisionListComponent } from './components/projects/transport-infra/supervision/manage-supervision-list/manage-supervision-list.component';
import { ManageDprListComponent } from './components/projects/transport-infra/dpr/manage-dpr-list/manage-dpr-list.component';
import { SubShellTabHostDirective } from './directives/project/sub-shell-tab-host.directive';
import { ManageUploadSupervisionComponent } from './components/projects/transport-infra/supervision/manage-upload-supervision/manage-upload-supervision.component';
import { ManageUploadDprComponent } from './components/projects/transport-infra/dpr/manage-upload-dpr/manage-upload-dpr.component';

@NgModule({
  declarations: [NotifyBarComponent, AlertComponent, LoaderComponent,  
    FileUploaderComponent, InfoBarComponent,BtnLoaderComponent,
    MonthAndYearPickerComponent, HelpComponent,SelectSearchComponent,  
    NotificationTextComponent,  MonthAndYearPickerComponent, DateTimePipe, FormatDatePipe, 
    NotEditableComponent, StatusIconComponent, LocationComponent, ManageProjectComponent,
    ManageContractorComponent, AttachLetterComponent, AttachFileComponent, ManageMilestoneComponent, ManageEotComponent, 
    ManageCosComponent, ManageSiteProgressComponent, SiteProgressListComponent, EotListComponent, CosListComponent, MilestoneListComponent,
    ManageLettersListComponent, UploadFileComponent,  ReplaceUnderscorePipe, UploadBtnComponent, 
    DownloadCsvComponent, ManageSubcompanyComponent, ManageDepartmentComponent, ManageConsultancyRoadSurveyComponent,
    ManageDesignationComponent, ManageConsultantAccountComponent, ManageSiteInventoryComponent, ManageItemComponent, ManageEmployeeComponent, ManageVehicleComponent, ManageVehcileLogComponent, 
    ManageVehcileBillingComponent, ManageInsuranceComponent, InsuranceListComponent, ManageBankGuaranteeComponent, BankGuaranteeListComponent, ContractorBillingListComponent, ManageContractorBillingComponent, 
    ManageVehicleListComponent, ManageEmployeeListComponent, ManageInventoryListComponent, ManageConsultantComponent, ManageBoqAttendenceComponent, ContactListComponent, ManageContactComponent, ContractorBillingDetailsComponent, ManageCircularComponent, ManageBoqInvoiceComponent, ManageConsultancyInvoiceComponent,
     ManageSupportStaffComponent, ManageTransportationComponent, ManageDutyTravelComponent, 
     ManageOfficeRentComponent, ManageOfficeSuppliesComponent, ManageOfficeFurnitureComponent, ManageReportDocComponent, ManageRoadSurveyComponent, ManageContingenciesComponent, ManageConsultancyStaffComponent, ManageConsultancyContingenciesComponent, ManageConsultancyReportDocComponent, ManageConsultancyOfficeFurnitureComponent, ManageConsultancyOfficeSuppliesComponent, ManageConsultancyOfficeRentComponent, ManageConsultancyDutyTravelComponent, ManageConsultancyTransportationComponent, ManageOfficeRentControlComponent, 
     FileIconComponent, BreadCrumComponent, SearchBarControlsComponent, ViewLetterDetailsComponent, ViewEmployeeListComponent, ViewBtnComponent, ProjectControlComponent, FormatCurrencyPipe, EditBtnComponent, DeleteBtnComponent, ManageVehicleDocComponent, DeleteVehicleDocComponent, NoDataComponent, ViewEmployeeDetailsComponent, ManageEmployeeDocComponent, DeleteEmployeeDocComponent, DocumentManageBtnComponent, DetailVehicleComponent, ManageProfitLossComponent, ManageTicketComponent, ManageImperestComponent, ManageExpenseComponent, ManageApprovalComponent, ExploreMilestoneComponent, ExploreSiteProgressComponent, ExploreEotComponent, ExploreCosComponent, ManageOfficeDocComponent, DeleteOfficeDocComponent, ExploreBankGuaranteeComponent, ExploreInsuranceComponent, SubmitLoadBtnComponent, FormatAmountPipe, ManageUploadEmpComponent, UploadDataComponent, ManageUploadInventoryComponent, AddIconBtnComponent, ManageUploadLettersComponent, ItemEmployeesComponent, ManageUploadVehicleComponent, ViewReadingImageComponent, ManageLetterDocComponent, DeleteLetterDocComponent, AlertBadgeComponent, EditIconBtnComponent, ConsultentListSummaryComponent, LetterInfoSummaryComponent, EotInfoSummaryComponent, CosInfoSummaryComponent, EmployeeInfoSummaryComponent, ManageOfcRentBillingComponent, ManageProfitLossSheetComponent, ProfitLossInvListComponent, ProfitLossInvDetailsComponent, ProfitLossCommulativeComponent, FinanicalYearComponent, StatusBadgeComponent, ManageUploadConsultantComponent, ManageOfcBillingReqComponent, ManageImperestBillingReqComponent, ManageVehBillingReqComponent, BillingInfoSummaryComponent, ManageExpBillingReqComponent, ViewExpDetailsInfoComponent, ProjectReportsListComponent, ManageProjectReportsComponent, ExploreProjectReportsComponent, LetterCountSummaryComponent, ManageProjectInvoiceListComponent, EmptyTableSkltnComponent, DownloadPdfComponent, ManageMiscComponent, ProjectSubshellComponent,  ManageSupervisionComponent,ManageSupervisionListComponent,ManageDprListComponent, ManageDprComponent, SubShellTabHostDirective, ManageUploadSupervisionComponent, ManageUploadDprComponent],
  imports: [
    CommonModule, 
    //LockerModule, 
    FormsModule,
    MaterialModule, RouterModule,  ReactiveFormsModule, TranslateModule,NgxMatSelectSearchModule,NgxChartsModule
    //NgxMatColorPickerModule, 
    // AgmCoreModule.forRoot({
    //   apiKey: 'AIzaSyDhRiG4iUpth-xrOgZwLYXGFmrrk-g1av8',
    //   libraries: ['places']
    // })
  ],
  providers: [
    {
      provide: CONSTANTS,
      useValue: Constants
    },DecimalPipe
    // { provide: MAT_DIALOG_DATA, useValue: {} },
    // { provide: MatDialogRef, useValue: {} },
    // {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
    //{ provide: MAT_COLOR_FORMATS, useValue: NGX_MAT_COLOR_FORMATS }
  ],
  exports: [NotifyBarComponent, LoaderComponent,   FileUploaderComponent, 
    MonthAndYearPickerComponent,SelectSearchComponent,
       NotificationTextComponent, NgxMatSelectSearchModule,InfoBarComponent,BtnLoaderComponent,
       ReactiveFormsModule,HelpComponent,DateTimePipe,FormatDatePipe,
    NotEditableComponent, StatusIconComponent, LocationComponent,ManageProjectComponent, FileIconComponent, BreadCrumComponent,
  SearchBarControlsComponent, UploadBtnComponent, DownloadCsvComponent, ManageEmployeeListComponent,
  ManageVehicleListComponent, ManageInventoryListComponent, EotListComponent, CosListComponent,InsuranceListComponent,BankGuaranteeListComponent,
ContractorBillingListComponent,MilestoneListComponent, SiteProgressListComponent, ManageLettersListComponent,ContactListComponent,
ViewBtnComponent, FormatCurrencyPipe, EditBtnComponent, DeleteBtnComponent,NoDataComponent, ViewEmployeeDetailsComponent, ExploreMilestoneComponent,
ExploreSiteProgressComponent, ExploreEotComponent, ExploreCosComponent, DocumentManageBtnComponent, ExploreBankGuaranteeComponent,ExploreInsuranceComponent,
FormatAmountPipe,UploadFileComponent, AddIconBtnComponent,EditIconBtnComponent, FinanicalYearComponent, ProjectControlComponent, StatusBadgeComponent,
BillingInfoSummaryComponent,ProjectReportsListComponent, ExploreProjectReportsComponent,LetterCountSummaryComponent,EmptyTableSkltnComponent,
ProjectSubshellComponent,ManageSupervisionListComponent,ManageDprListComponent,SubShellTabHostDirective]
})
export class SharedModule { }
