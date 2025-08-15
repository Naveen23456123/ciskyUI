import { ChangeDetectorRef, Component ,inject, Type} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageContractorComponent } from '@app/shared/components/manage-contractor/manage-contractor.component';
import { DialogOperation, LetterType } from '@app/shared/models/constant.config';
import { SessionService } from '@app/shared/services/session.service';
import { take, finalize } from 'rxjs/operators';
import { ProjectService } from '../project.service';
import { AttachLetterComponent } from '@app/shared/components/letters/attach-letter/attach-letter.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ManageConsultantComponent } from '@app/shared/components/consultant/manage-consultant/manage-consultant.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-project-view',
  standalone: false,
  templateUrl: './project-view.component.html',
  styleUrl: './project-view.component.scss'
})
export class ProjectViewComponent {
  readonly dialog = inject(MatDialog);
  isLoading = true;
  workingProject:any;
  activeOrgId='123';
  selectTab=0;
  contractorItemList:any[]=[];
  contractorList:any;
  selectedContractor:any='';
  // contactListcomponentData!: Type<any>;
  projectForm:FormGroup= new FormGroup({});
  isConsultant:boolean=true;
  informationLoading=true;
  workOwnerList:any=[];

  constructor(private router: Router,private route: ActivatedRoute, private sessionService : SessionService,
    private projectService : ProjectService,private formbuilder: FormBuilder,
    private notifyBarService:NotifyBarService,private cdr: ChangeDetectorRef
  ){
  this.projectForm= this.formbuilder.group({
    conscontName:[],
    contractorId:[]
  })
  }
    private defaultdialogoptions:  MatDialogConfig = {   
      disableClose: false,
      data: {},
    };

  ngOnInit()
  {    
    this.sessionService.workOwnerSubject$.subscribe((response:any)=>{
      if(response) {
       this.workOwnerList= response;
       if(this.workOwnerList)
       this.projectForm.patchValue({conscontName:this.workOwnerList[0]?.id});
      }
    }); 
    this.sessionService.workingProjectSubject$.pipe(take(1)).subscribe((data:any)=>{
      if(data){
        let apicalls :any ={
          contractorAPI:this.projectService.getAllContractorDetailsByProjectId({ projectId: data.id }, ''),
          consultantAPI: this.projectService.getAllProjectDetailsById({id:data.id},'')
        };
        forkJoin(apicalls).pipe(finalize(() => this.isLoading =false))
        .subscribe((response:any)=>{
            
          if(response.contractorAPI && response.contractorAPI.success) {   
            this.contractorList= (response.contractorAPI.data as any[])
             if(this.contractorList){           
              this.contractorItemList =  this.contractorList.map((item :any)=>({
                               value: item.id,
                               text:item.contractorname
               })); 
              if(this.contractorItemList.length>0){
                this.projectForm.patchValue({contractorId:this.contractorList[0].id});               
              }
             }
          }
          if(response.consultantAPI && response.consultantAPI.success){
            this.workingProject= response.consultantAPI.data;          
          }  
          this.projectEntityChange();
          this.informationLoading= false;
        });
      }
    });   
  }

  ngAfterViewInit(){
    
  }

  projectEntityChange() {
    this.selectTab=0;
    const selectedOption = this.workOwnerList.find((option:any) => option.id === this.projectForm.controls['conscontName'].value);
    if(selectedOption && selectedOption.name){
      this.isConsultant = selectedOption.name.toLowerCase()=="consultant"; 
      const projectEntity= {
        projectId:this.workingProject.id,
        isConsultant: this.isConsultant,
        relatedToId: selectedOption.id,
        companyId:this.workingProject.companyid,
        consultantId:'',
        contractorId:this.projectForm.controls['contractorId'].value,
        projectshortname:this.workingProject.projectshortname
      }    
      this.sessionService.setProjectEntity(projectEntity);
      this.loadContractData();
      this.cdr.detectChanges();
    }
  }

  loadContractData(){ 
    if(this.contractorList.length>0){    
      this.selectedContractor= this.contractorList.find((x:any)=>x.id==this.projectForm.controls['contractorId'].value);
      this.informationLoading=false;    
    }
    else
      this.selectedContractor=null;
  }

  contractor(){
    const config = this.defaultdialogoptions;
        config.data = {
          pageGuid: this.route.snapshot.data['pageGuid'],
          type: DialogOperation.ADD
        };
        config.minWidth= '75vw';
        const dialogRef = this.dialog.open(ManageContractorComponent, config);
        dialogRef.afterClosed().subscribe((data:any) => {
          if (data && data.valid) {
            this.notifyBarService.showsnackbar('The Contractor Created successfully.');   
            this.contractorItemList.push({
              value: data.value.id,
              text:data.value.contractorname
            });         
            this.addContractorRowData(data.value);
            this.projectForm.patchValue({contractorId:data.value.id});
            this.loadContractData();
          }
          else {
            //this.router.navigate(['../'], { relativeTo: this.route });
          }
        });
  }
  addContractorRowData(newdata: any) {
    const data1:any = {
      id:newdata.id,
      projectid : newdata.projectid,
      contractorname : newdata.contractorname,
      contractoraddress: newdata.contractoraddress,
      projectduration : newdata.projectduration,
      projectlength : newdata.projectlength,
      projectcost : newdata.projectcost,
      bidduedate: newdata.bidduedate,
      loadate : newdata.loadate,
      agreementdate : newdata.agreementdate,
      commencementdate : newdata.commencementdate,
      scheduleconstructioncompletedate: newdata.scheduleconstructioncompletedate,
      schedulecompletedate : newdata.schedulecompletedate,
      actualconstructioncompletedate : newdata.actualconstructioncompletedate,
      actualcompletedate : newdata.actualcompletedate
    }      
    this.contractorList.push(data1);  
  }
  updateContracrorRowData(newdata: any) {
    const element:any = this.contractorList.find((x:any) => x.id == newdata.id);
    if(element) {
      element.projectid = newdata.projectid,
      element.contractorname = newdata.contractorname,
      element.contractoraddress= newdata.contractoraddress,
      element.projectduration = newdata.projectduration,
      element.projectlength = newdata.projectlength,
      element.projectcost = newdata.projectcost,
      element.bidduedate= newdata.bidduedate,
      element.loadate = newdata.loadate,
      element.agreementdate = newdata.agreementDate,
      element.commencementdate = newdata.commencementdate,
      element.scheduleconstructioncompletedate= newdata.scheduleconstructioncompletedate,
      element.schedulecompletedate = newdata.schedulecompletedate,
      element.actualconstructioncompletedate = newdata.actualconstructioncompletedate,
      element.actualcompletedate = newdata.actualcompletedate
    }
  }
  deleteContractorRow(data: any) {
    const index = this.contractorList.findIndex((x:any) => x.id == data);
    this.contractorList.splice(index, 1);
  }
  eot(){
    this.openLetterDialog(LetterType.EOT);
  }
  cos(){
    this.openLetterDialog(LetterType.COS);
  }

 
  openLetterDialog(type:string){
    const config = this.defaultdialogoptions;
        config.data = {
          pageGuid: this.route.snapshot.data['pageGuid'],
          type: this.route.snapshot.data['type'],
          letter_type : type
        };
        const dialogRef = this.dialog.open(AttachLetterComponent, config);
        dialogRef.afterClosed().subscribe((data:any) => {
          if (data && data.valid) {
            let navigationExtras: NavigationExtras = {
              relativeTo: this.route,
              state: { value: data.value, event: 'letteradd', valid: true, msg: 'The '+ type +' letter attached successfully.' }
            };
            this.router.navigate(['../'], navigationExtras);
          }
          else {
            //this.router.navigate(['../'], { relativeTo: this.route });
          }
        });
  }
  import(){
    
  }
  submit(){

  }
  edit_contractor(){    
    this.defaultdialogoptions.data = {
          pageGuid: this.route.snapshot.data['pageGuid'],
          type: DialogOperation.EDIT,
          element: this.selectedContractor
        };
    this.defaultdialogoptions.minWidth= '75vw';
    const dialogRef = this.dialog.open(ManageContractorComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        this.notifyBarService.showsnackbar('The Contractor updated successfully.');
          this.updateContracrorRowData(data.value);
          this.selectedContractor = data.value;
        }
        else {
        }
    });    
  }

  delete_contractor(){
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: DialogOperation.DELETE,
      element: this.selectedContractor
    };
    this.defaultdialogoptions.minWidth='45vw';
    const dialogRef = this.dialog.open(ManageContractorComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        this.notifyBarService.showsnackbar('The Contractor removed successfully.');
        this.deleteContractorRow(data.value);
        const index = this.contractorItemList.findIndex((x:any) => x.id == data.value.id);
        this.contractorItemList.splice(index, 1);
      }
      else {
      }
    });

  }

  edit_consultant(){      
    this.defaultdialogoptions.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: 'edit',
      element: this.workingProject
    };
    this.defaultdialogoptions.minWidth= '75vw';
    const dialogRef = this.dialog.open(ManageConsultantComponent, this.defaultdialogoptions);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {   
       this.workingProject.tenderid=data.value.tenderId;
       this.workingProject.projectlocation=data.value.projectLocation;
       this.workingProject.companyid=data.value.companyId;
       this.workingProject.worktypeid=data.value.workTypeId;
       this.workingProject.ourroleid=data.value.ourRoleId;
       this.workingProject.company=data.value.company;
       this.workingProject.worktype=data.value.worktype;
       this.workingProject.ourrole=data.value.ourrole;
       this.workingProject.projectlength=data.value.projectLength;
       this.workingProject.bidduedate=data.value.bidDueDate;
       this.workingProject.loadate=data.value.loaDate;
       this.workingProject.aggrementdate=data.value.aggrementDate;
       this.workingProject.commencementdate=data.value.commencementDate;
       this.workingProject.constructionduration=data.value.constructionDuration;
       this.workingProject.oandmduration=data.value.oandmDuration;
       this.workingProject.projectduration=data.value.projectDuration;
       this.workingProject.scheduleconstructioncompletedate=data.value.scheduleConstructionCompleteDate;
       this.workingProject.schedulecompletedate=data.value.scheduleCompleteDate;
       this.workingProject.actualcompletedate=data.value.actualCompleteDate;
       this.workingProject.actualconstructioncompletedate=data.value.actualConstructionCompleteDate;
       this.workingProject.authengineerid=data.value.authEngineerId;
       this.workingProject.cordinatorid=data.value.cordinatorId;
       this.workingProject.authengineer=data.value.authengineer;
       this.workingProject.cordinator=data.value.cordinator;
       this.workingProject.remark=data.value.remark;
       this.workingProject.consultancyfees=data.value.consultancyFees;
       this.workingProject.contractmodeid=data.value.contractModeId;
       this.workingProject.contractmode=data.value.contractmode;
       this.workingProject.lead=data.value.lead;
       this.workingProject.jv=data.value.jv;
       this.workingProject.association=data.value.association;
       this.workingProject.ourshare=data.value.ourShare;
       this.workingProject.client=data.value.client;
       this.workingProject.clientaddress=data.value.clientAddress;
       this.workingProject.siteaddress=data.value.siteAddress;
       this.workingProject.accountdetailid=data.value.accountDetailId ??''
        this.notifyBarService.showsnackbar('The Project details updated successfully.');
      }
      else {
       // this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });
  }
}
