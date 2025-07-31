import { ChangeDetectorRef, Component,Inject,inject, Optional, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { TemplateType } from '@app/shared/models/CSVTemplate';
import { BankGuaranteeInterfaceService } from '@app/shared/services/external/bank-guarantee-interface.service';
import { ContactInterfaceService } from '@app/shared/services/external/contact-interface.service';
import { ContractorInterfaceService } from '@app/shared/services/external/contractor-interface.service';
import { CosInterfaceService } from '@app/shared/services/external/cos-interface.service';
import { DepartmentInterfaceService } from '@app/shared/services/external/department-interface.service';
import { DesignationInterfaceService } from '@app/shared/services/external/designation-interface.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { EotInterfaceService } from '@app/shared/services/external/eot-interface.service';
import { InsuranceInterfaceService } from '@app/shared/services/external/insurance-interface.service';
import { InventoryInterfaceService } from '@app/shared/services/external/inventory-interface.service';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { MilestoneInterfaceService } from '@app/shared/services/external/milestone-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SiteProgressInterfaceService } from '@app/shared/services/external/site-progress-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';
import { GenerateCsvService } from '@app/shared/services/generate-csv.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import  moment from 'moment';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-upload-file',
  standalone: false,
  templateUrl: './upload-file.component.html',
  styleUrl: './upload-file.component.scss'
})
export class UploadFileComponent {
  isLoading=true;
  title:string ='';
  dataSource : MatTableDataSource<any> = new MatTableDataSource();
  displayedColumns:string[]=[];
  allColumnsData:any;
  dateTimeFormat = "YYYY-MM-DD HH:mm:ss";
  isImport: boolean = false;
  subCompnayList:any[]=[];
  currentTemplate!:TemplateRef<any>;
  @ViewChild('COS', { static: false }) cosRef!: TemplateRef<any>;
  @ViewChild('MILESTONE', { static: false }) milestoneRef!: TemplateRef<any>;
  @ViewChild('DEPT', { static: false }) deptRef!: TemplateRef<any>;
  @ViewChild('DESG', { static: false }) desgRef!: TemplateRef<any>;
  @ViewChild('PROJECT', { static: false }) projectRef!: TemplateRef<any>;
  @ViewChild('EOT', { static: false }) eotRef!: TemplateRef<any>;
  @ViewChild('CONTRACTORLETTER', { static: false }) contractorLetterRef!: TemplateRef<any>;
  @ViewChild('SITEPROGRESS', { static: false }) siteProgressRef!: TemplateRef<any>;
  @ViewChild('CONTRACTORBILLING', { static: false }) contratorBillingRef!: TemplateRef<any>;
  @ViewChild('VEHICLE', { static: false }) vehicleRef!: TemplateRef<any>;
  @ViewChild('EMPLOYEE', { static: false }) employeeRef!: TemplateRef<any>;
  @ViewChild('INSURANCE', { static: false }) insuranceRef!: TemplateRef<any>;
  @ViewChild('BANKGUARANTEE', { static: false }) bgRef!: TemplateRef<any>;
  @ViewChild('INVENTORY', { static: false }) inventoryRef!: TemplateRef<any>;
  @ViewChild('CONTACT', { static: false }) contactRef!: TemplateRef<any>;
  @ViewChild('ALLLETTER', { static: false }) allLetterRef!: TemplateRef<any>;
  dialogData:any;

  constructor(@Inject(MAT_DIALOG_DATA) data: any,
  @Optional() private dialogRef: MatDialogRef<UploadFileComponent>,
  private siteProgressService : SiteProgressInterfaceService,
  private cosService:CosInterfaceService,
  private eotService:EotInterfaceService,
  private letterService: LetterInterfaceService,
  private milestoneService:MilestoneInterfaceService,
  private projectService:ProjectInterfaceService,
  private csvService:GenerateCsvService,
  private cdRef: ChangeDetectorRef,
  private contracorService:ContractorInterfaceService,
  private insuranceSerice: InsuranceInterfaceService,
  private bankGuaranteeService:BankGuaranteeInterfaceService,
  private employeeService:EmployeeInterfaceService,
  private vehicleService:VehicleInterfaceService,
  private inventoryService:InventoryInterfaceService,
  private contactService:ContactInterfaceService,
  private departmentService:DepartmentInterfaceService,
  private designationService:DesignationInterfaceService,
  private subcompanyService:SubCompanyInterfaceService
  ) {
    this.dialogData= data;
  }

  ngOnInit(){
    let apiCalls: any={};
    if(this.dialogData){
    this.title = this.dialogData.template_type;
    }
    if (this.title.toLowerCase() === TemplateType.DEPARTMENT.toLowerCase()) {
      this.allColumnsData = this.departmentService.getTemplateColumnList();
      apiCalls.subCompanyAPI= this.subcompanyService.getSubCompanyListByOrgId({},'');
    } else if (this.title.toLowerCase() === TemplateType.DESIGNATION.toLowerCase()) {
      apiCalls.subCompanyAPI= this.subcompanyService.getSubCompanyListByOrgId({},'');
      this.allColumnsData = this.designationService.getTemplateColumnList();
    } else if (this.title.toLowerCase() === TemplateType.COS.toLowerCase()) {
      //this.allColumnsData = this.cosService.getTemplateColumnList();
    } else if (this.title.toLowerCase() === TemplateType.MILESTONE.toLowerCase()) {
      //this.allColumnsData = this.milestoneService.getTemplateColumnList();
    } else if (this.title.toLowerCase() === TemplateType.SITEPROGRESS.toLowerCase()) {
       //this.allColumnsData = this.siteProgressService.getTemplateColumnList();
    } else if (this.title.toLowerCase() === TemplateType.EOT.toLowerCase()) {
      //this.allColumnsData = this.eotService.getTemplateColumnList();
    } else if (this.title.toLowerCase() === TemplateType.CONTRACTORBILLING.toLowerCase()) {
      this.allColumnsData = this.contracorService.getTemplateColumnList();
    } else if (this.title.toLowerCase() === TemplateType.CONTRACTORLETTER.toLowerCase()) {
      this.allColumnsData = this.letterService.getTemplateColumnList();
    } else if (this.title.toLowerCase() === TemplateType.PROJECT.toLowerCase()) {
      this.allColumnsData = this.projectService.getTemplateColumnList();
    } else if (this.title.toLowerCase() === TemplateType.INSURANCE.toLowerCase()) {
      this.allColumnsData = this.insuranceSerice.getTemplateColumnList();
    } else if (this.title.toLowerCase() === TemplateType.BANKGUARANTEE.toLowerCase()) {
      this.allColumnsData = this.bankGuaranteeService.getTemplateColumnList();
    }  else if (this.title.toLowerCase() === TemplateType.EMPLOYEE.toLowerCase()) {
      apiCalls.subCompanyAPI= this.subcompanyService.getSubCompanyListByOrgId({},'');
      this.allColumnsData = this.employeeService.getTemplateColumnList();
    } else if (this.title.toLowerCase() === TemplateType.VEHICLE.toLowerCase()) {
      this.allColumnsData = this.vehicleService.getTemplateColumnList();
    } else if (this.title.toLowerCase() === TemplateType.INVENTORY.toLowerCase()) {
      this.allColumnsData = this.inventoryService.getTemplateColumnList();
    }  else if (this.title.toLowerCase() === TemplateType.CONTACT.toLowerCase()) {
      this.allColumnsData = this.contactService.getTemplateColumnList();
    }else if (this.title.toLowerCase() === TemplateType.ALLLETTER.toLowerCase()) {
      this.allColumnsData = this.letterService.getTemplateColumnList();
    } 

    this.displayedColumns = this.allColumnsData.map((x:any) => x.value);
    forkJoin(apiCalls).pipe().subscribe((response:any)=>{
      if(response){
        if(response.subCompanyAPI){
          this.subCompnayList= response.subCompanyAPI.data;
        }
      }
    })
    this.isLoading=false;
  }

ngAfterViewInit() {
  if (this.title.toLowerCase() === TemplateType.DEPARTMENT.toLowerCase()) {
    this.currentTemplate = this.deptRef;
  } else if (this.title.toLowerCase() === TemplateType.DESIGNATION.toLowerCase()) {
    this.currentTemplate = this.desgRef;
  }else if (this.title.toLowerCase() === TemplateType.COS.toLowerCase()) {
    this.currentTemplate = this.cosRef;
  } else if (this.title.toLowerCase() === TemplateType.MILESTONE.toLowerCase()) {
    this.currentTemplate = this.milestoneRef;
  } else if (this.title.toLowerCase() === TemplateType.SITEPROGRESS.toLowerCase()) {
     this.currentTemplate = this.siteProgressRef;
  } else if (this.title.toLowerCase() === TemplateType.EOT.toLowerCase()) {
    this.currentTemplate = this.eotRef;
  } else if (this.title.toLowerCase() === TemplateType.CONTRACTORBILLING.toLowerCase()) {
    this.currentTemplate = this.contratorBillingRef;
  } else if (this.title.toLowerCase() === TemplateType.CONTRACTORLETTER.toLowerCase()) {
    this.currentTemplate = this.contractorLetterRef;
  } else if (this.title.toLowerCase() === TemplateType.PROJECT.toLowerCase()) {
    this.currentTemplate = this.projectRef;
  } else if (this.title.toLowerCase() === TemplateType.INSURANCE.toLowerCase()) {
    this.currentTemplate = this.insuranceRef;
  } else if (this.title.toLowerCase() === TemplateType.BANKGUARANTEE.toLowerCase()) {
    this.currentTemplate = this.bgRef;
  }  else if (this.title.toLowerCase() === TemplateType.EMPLOYEE.toLowerCase()) {
    this.currentTemplate = this.employeeRef;
  } else if (this.title.toLowerCase() === TemplateType.VEHICLE.toLowerCase()) {
    this.currentTemplate = this.vehicleRef;
  } else if (this.title.toLowerCase() === TemplateType.INVENTORY.toLowerCase()) {
    this.currentTemplate = this.inventoryRef;
  }  else if (this.title.toLowerCase() === TemplateType.CONTACT.toLowerCase()) {
    this.currentTemplate = this.contactRef;
  }  else if (this.title.toLowerCase() === TemplateType.ALLLETTER.toLowerCase()) {
    this.currentTemplate = this.allLetterRef;
  }   
  this.cdRef.detectChanges();
}

  download_sample(){
    this.csvService.downloadFile([],this.allColumnsData,this.title);
  }

  PushDataInArray(data: []) {
    let i = 0;
    let rowelement = this.uploadedDetails.filter((ele) => {
      return ele.email === data[i + 2];
    });
    
    const dataObect = this.displayedColumns.reduce((element:any, key, index) => {
      element[key] = data[index]; 
      return element;
    }, {});

    this.uploadedDetails.push(dataObect);
    // this.uploadedDetails.push({    
    //   //status: Constants.Active,
    //   timeTypeId: 1,
    //   note: null,
    //   message: null,
    //   error: (rowelement[0] != null || rowelement.length !== 0)
    // });
  }

  uploadedDetails: any[] = [];
  errorLoadingCSV: any[]=[];
  fileuploaded(event: any) {
    this.uploadedDetails = [];
    let columnerror = false;
    this.errorLoadingCSV = [];
    event.forEach((element: [], index: number) => {
      if (element !== null) {
        if (index === 0) {
          for (let i = 0; i < element.length; i++) {
            for (let j = 0; j < this.allColumnsData.length; j++) {
              if (i == j) {
                if (this.allColumnsData[j].label !== element[i] && !columnerror) {
                  columnerror = true;
                  this.errorLoadingCSV.push('Please provide the CSV with the same column list and names as mentioned above.');
                }
              }
            }
          }
        }
        else {
          this.PushDataInArray(element);
        }
      }
    });
    //Find Visitor details with duplicate emailId
    // let errorelement = this.uploadedDetails.filter((ele) => {
    //   return ele.error == true
    // });
    // if (typeof (errorelement[0]) !== 'undefined' && errorelement[0] !== null && errorelement.length > 0)
    //   this.errorLoadingCSV.push('We found more then one guest with duplicate Email. Kindly change Email for guest(s) mentioned below.');

    // Find employee with blank email Id
    // let emailelement = this.uploadedDetails.filter((ele) => {
    //   if (ele.email === '' || ele.email == null) {
    //     ele.error = true;
    //     return ele;
    //   }
    // });
    // if (typeof (emailelement[0]) !== 'undefined' && emailelement[0] !== null && emailelement.length > 0)
    //   this.errorLoadingCSV.push('We found Email is not specified for some guest(s). Kindly provide Email for all the guest(s).');

    // email Id validation
    // let emailValidate = this.uploadedDetails.filter((ele) => {
    //   if (ele.email !== '' && !this.validatorservice.pattern.Email.test(ele.email)) {
    //     ele.error = true;
    //     return ele;
    //   }
    // });
    // if (typeof (emailValidate[0]) !== 'undefined' && emailValidate[0] !== null && emailValidate.length > 0)
    //   this.errorLoadingCSV.push('Kindly provide correct email for guets(s).');

    // Validate thse start date and end date format 
    // let dateelement = this.uploadedDetails.filter((ele) => {
    //   if (ele.startDate === '' || ele.endDate == null) {
    //     ele.error = true;
    //     return ele;
    //   }
    //   if (ele.startDate !== '' || ele.startDate !== null) {
    //     ele.error = !moment(ele.startDate, this.dateTimeFormat).isValid();
    //     if (ele.error)
    //       return ele;
    //   }
    //   if (ele.endDate !== '' || ele.endDate !== null) {
    //     ele.error = !moment(ele.endDate, this.dateTimeFormat).isValid();
    //     if (ele.error)
    //       return ele;
    //   }

    // });
    // // log.debug(dateelement);
    // if (typeof (dateelement[0]) !== 'undefined' && dateelement[0] !== null && dateelement.length > 0)
    //   this.errorLoadingCSV.push('Kindly provide Date Time in correct format and then try again.');


    this.updateTable(this.uploadedDetails);
  }

  private updateTable(info: any) {
    console.log(info);
    let ErrorData = info.filter((ele:any) => {
      return ele.error === true;
    });
    if (typeof (ErrorData[0]) === 'undefined')
      this.dataSource =  new MatTableDataSource(this.uploadedDetails);
    else
      this.dataSource = new MatTableDataSource(ErrorData);

  }

  importData(){
    if (this.title.toLowerCase() === TemplateType.DEPARTMENT.toLowerCase()) {
      let dataElement = this.uploadedDetails.filter((ele) => {
         if(!this.subCompnayList.find(x=>x.name==ele.companyname)){          
            ele.error = true;           
            return ele;
          }
          else{
            ele.companyid=this.subCompnayList.find(x=>x.name==ele.companyname).id;  
          }
        });
       
      if(dataElement.length > 0)
        this.errorLoadingCSV.push('Kindly provide the correct SubCompany Name and then try again.');
      else {
        this.isImport=true;
        this.departmentService.createBulkDepartments(this.uploadedDetails, '')
          .pipe(finalize(() => { this.isImport = false; })).subscribe({
            next:(response: any) => {
              if (response && response.success)  {
                response.data.forEach((dept:any) => {
                  dept.companyname= this.subCompnayList.find(x=>x.id==dept.companyid).name;
                });
                this.dialogRef.close({ value: response.data, valid: true });
            } else {
              this.dialogRef.close({ value: null, valid: false });
            }
          },
          error: (err: any) => {
              this.dialogRef.close(err);
            }
        });
      }
    }
    if (this.title.toLowerCase() === TemplateType.DESIGNATION.toLowerCase()) {
      this.desgData();
    }
  }

  desgData(){
    let dataElement = this.uploadedDetails.filter((ele) => {
      if(!this.subCompnayList.find(x=>x.name==ele.companyname)){          
         ele.error = true;           
         return ele;
       }
       else{
         ele.companyid=this.subCompnayList.find(x=>x.name==ele.companyname).id;  
       }
     });
    
   if(dataElement.length > 0)
     this.errorLoadingCSV.push('Kindly provide the correct SubCompany Name and then try again.');
   else {
     this.isImport=true;
     this.designationService.createBulkDesignations(this.uploadedDetails, '')
       .pipe(finalize(() => { this.isImport = false; })).subscribe({
         next:(response: any) => {
           if (response && response.success)  {
             response.data.forEach((desg:any) => {
               desg.companyname= this.subCompnayList.find(x=>x.id==desg.companyid).name;
             });
             this.dialogRef.close({ value: response.data, valid: true });
         } else {
           this.dialogRef.close({ value: null, valid: false });
         }
       },
       error: (err: any) => {
           this.dialogRef.close(err);
         }
     });
   }
  }
  
}
