import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { CommonService } from '@app/shared/services/common.service';
import { DesignationInterfaceService } from '@app/shared/services/external/designation-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';
import { SessionService } from '@app/shared/services/session.service';

import { finalize, forkJoin,take } from 'rxjs';

@Component({
  selector: 'app-search-bar-controls',
  standalone: false,
  templateUrl: './search-bar-controls.component.html',
  styleUrl: './search-bar-controls.component.scss'
})
export class SearchBarControlsComponent {
  @Input() isSubCompany=false;
  @Input() isProjects=false;
  @Input() isAny=false;
  @Input() isProfessional=false;
  @Input() isDesignation=false;
  @Input() isStatus=false;
  @Input() isLetterType=false;
  @Input() isRelatedTo=false;
  @Input() isExchangeType=false;
  @Input() isGeneralStatus=false;
  @Input() projectId='';
  @Input() showProjectAllLabel=true;
  @Input() selectProjectDefault=false;
  @Input() searchByAnyPlaceholder:string='';
  @Input() isDateRange=false;
  @Input() isStartTime=false;
  @Input() isEndTime=false;
  @Input() isVehicle=false; 
  @Input() isMonthAndYear=false;

  @Output() OnProjectChange:EventEmitter<any> = new EventEmitter();
  @Output() OnDesignationChange:EventEmitter<any> = new EventEmitter();
  @Output() OnProfessionalChange:EventEmitter<any> = new EventEmitter();
  @Output() OnSubCompanyChange:EventEmitter<any> = new EventEmitter();
  @Output() OnLetterTypeChange:EventEmitter<any> = new EventEmitter();
  @Output() OnGeneralStatusChange:EventEmitter<any> = new EventEmitter();
  @Output() OnVehicleChange:EventEmitter<any> = new EventEmitter();
  @Output() OnExchangeTypeChange:EventEmitter<any> = new EventEmitter();
  @Output() OnRelatedToChange:EventEmitter<any> = new EventEmitter();
  @Output() OnDateRangeChange:EventEmitter<any> = new EventEmitter();
  @Output() OnAnyChange:EventEmitter<any> = new EventEmitter();
  @Output() OnStartTimeChange:EventEmitter<any> = new EventEmitter();
  @Output() OnEndTimeChange:EventEmitter<any> = new EventEmitter();
  @Output() OnMonthYearChange:EventEmitter<any> = new EventEmitter();

  isProjectLoaded=false;
  isDesgLoaded=false;
  isLetterTypeLoaded=false;
  isVehicleLoaded=false;
  subCompanies:any=[];
  professionals:any=[];
  designations:any=[];
  statuses:any=[];
  generalStatus:any=[];
  projects:any=[];
  relatedTo:any=[];
  letterTypes:any=[];
  exchangeTypes:any=[];
  vehicles:any=[];

  constructor(private sessionservice: SessionService, private designationService:DesignationInterfaceService,
    private subCompanyService:SubCompanyInterfaceService, private projectService:ProjectInterfaceService,
    private commonService:CommonService, private vehicleService: VehicleInterfaceService
    ){
      
  }

  ngOnInit(){
    let apiCalls: any = {};
    if (this.isSubCompany)
      apiCalls.subCompanyAPI = this.subCompanyService.getSubCompanyListByOrgId({},'');
    if (this.isProjects)
      apiCalls.projectAPI = this.projectService.getAllProjectPartialDetailsByOrdIg({  }, '');
    if (this.designations)
      apiCalls.designationAPI = this.designationService.getDesignationList({  }, '');
    

    forkJoin(apiCalls).subscribe((response:any)=>{
      if(response && response.subCompanyAPI && response.subCompanyAPI.success)
       this.subCompanies= response.subCompanyAPI.data;

      if(response && response.designationAPI && response.designationAPI.success){
        this.designations= response.designationAPI.data;
        this.isDesgLoaded=true;
      }
      
      if(response && response.projectAPI && response.projectAPI.success) {
        this.projects =  response.projectAPI.data.map((item :any)=>({
          id: item.id,
          name:item.projectcode + ' - '+item.projectshortname
        }));
        this.isProjectLoaded=true;
        if(this.selectProjectDefault){
          if(this.projectId=='')
            this.projectId= this.projects[0].id;
        }
      }
      if(this.isProfessional){
        this.sessionservice.staffTypeSubject$.pipe(take(1)).subscribe((response:any)=>{
          this.professionals= response;
        })
      }
      if(this.isStatus){
        this.sessionservice.statusSubject$.pipe(take(1)).subscribe((response:any)=>{
          this.statuses= response;
        })
      }
      if(this.isLetterType){
        this.sessionservice.entityTypeSubject$.pipe(take(1)).subscribe((response:any)=>{
          this.letterTypes= [...response];
          this.isLetterTypeLoaded=true;
        })
      }
      if(this.isExchangeType){
        this.sessionservice.exchangeTypeSubject$.pipe(take(1)).subscribe((response:any)=>{
          this.exchangeTypes= response;
        })
      }
      if(this.isGeneralStatus){
        this.sessionservice.generalStatusSubject$.pipe(take(1)).subscribe((response:any)=>{
          this.generalStatus= response;
        })
      }
      if(this.isRelatedTo){
        this.sessionservice.workOwnerSubject$.pipe(take(1)).subscribe((response:any)=>{
          this.relatedTo= response;
        })
      }
      
   });
  }

  projectChange(data:any){
    if(data && data.value){
      if(this.isVehicle){
        this.isVehicleLoaded=false;
        this.vehicleService.getVehiclePartialDetailsByProjectId({projectId:data.value.id }, '')
        .pipe(finalize(()=> this.isVehicleLoaded=true)).subscribe((response:any)=>{
          if(response && response.success){
            this.vehicles =  response.data;
          }
        })
      }
      this.OnProjectChange.emit({value:data.value.id});
    }
  }
  desgChange(data:any){
    if(data && data.value)
      this.OnDesignationChange.emit({value:data.value.id});
  }
  professionalChange(data:any){
    if(data)
      this.OnProfessionalChange.emit({value:data.value});
  }
  subCompanyChange(data:any){
    if(data){
      let obj:any={};
      obj.value=data.value;     
      if(this.isDesignation){
        this.isDesgLoaded=false;
        this.designationService.getDesignationList({companyId:data.value }, '')
        .pipe(finalize(()=> this.isDesgLoaded=true)).subscribe((response:any)=>{
          if(response && response.success){
            this.designations= response.data;
          }
        })
        obj.desgid='';
      }
      if(this.isProjects){
        this.isProjectLoaded=false;
        this.projectService.getAllProjectPartialDetailsByOrdIg({compId:data.value }, '')
        .pipe(finalize(()=> this.isProjectLoaded=true)).subscribe((response:any)=>{
          if(response && response.success){
            this.projects =  response.data.map((item :any)=>({
              id: item.id,
              name:item.projectcode + ' - '+item.projectshortname
            }));
          }
        })
        obj.projectid='';
      }      
      this.OnSubCompanyChange.emit(obj);
    }
  }
  applyFilter(event:any){
    if(event)
      this.OnAnyChange.emit({value:(event.target as HTMLInputElement).value});
  }
  letterTypeChange(data:any){
    this.OnLetterTypeChange.emit({value:data.value.id});
  }
  relatedChange(data:any){
    this.OnRelatedToChange.emit({value:data.value});
  }
  exchangeTypeChange(data:any){
    this.OnExchangeTypeChange.emit({value:data.value});
  }
  vehicleChange(data:any){
    this.OnVehicleChange.emit({value:data.value});
  }
  onStartTimeSelected(time: string): void {
    this.OnStartTimeChange.emit({value:time});
  }
  onEndTimeSelected(time: string): void {
    this.OnEndTimeChange.emit({value:time});
  }
  generalStatusChange(data:any){
    this.OnGeneralStatusChange.emit({value:data.value});
  }
  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    if(dateRangeEnd.value!='' && dateRangeStart.value!=''){      
      let startParts= dateRangeStart.value.split('/');
      let endParts= dateRangeEnd.value.split('/');      
      this.OnDateRangeChange.emit({
        start:new Date(+startParts[2], +startParts[1] - 1, +startParts[0]).toISOString() ,
        end:new Date(+endParts[2], +endParts[1] - 1, +endParts[0]).toISOString()
      })
    }
  }  
  monthYearChange(data:any){
    this.OnMonthYearChange.emit({value:data.format()})
  }
  openFromIcon(timepicker: { open: () => void }) {    
    timepicker.open();
  }
}
