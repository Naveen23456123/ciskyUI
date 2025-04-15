import { Component, input, Input } from '@angular/core';
import { DesignationInterfaceService } from '@app/shared/services/external/designation-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { SubCompanyInterfaceService } from '@app/shared/services/external/sub-company-interface.service';
import { SessionService } from '@app/shared/services/session.service';
import { forkJoin,take } from 'rxjs';

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
  @Input() isStatus=false
  isProjectLoaded=false;
  subCompanies:any=[];
  professionals:any=[];
  designations:any=[];
  statuses:any=[];

  @Input() searchByAnyPlaceholder:string='';
  projects:any=[];

  constructor(private sessionservice: SessionService, private designationService:DesignationInterfaceService,
    private subCompanyService:SubCompanyInterfaceService, private projectService:ProjectInterfaceService,
    ){
      
  }

  ngOnInit(){
    let apiCalls: any = {};
    if (this.isSubCompany)
      apiCalls.subCompanyAPI = this.subCompanyService.getSubCompanyListByOrgId({},'');
    if (this.isProjects)
      apiCalls.projectAPI = this.projectService.getAllProjectPartialDetailsByOrdIg({  }, '');
    if (this.professionals)
      apiCalls.subCompanyAPI = this.subCompanyService.getSubCompanyListByOrgId({},'');
    if (this.designations)
      apiCalls.designationAPI = this.designationService.getDesignationListByOrgId({  }, '');
    

    forkJoin(apiCalls).subscribe((response:any)=>{
      if(response && response.subCompanyAPI.success)
       this.subCompanies= response.subCompanyAPI.data;

      if(response && response.designationAPI.success)
        this.designations= response.designationAPI.data;
      
      if(response && response.projectAPI && response.projectAPI.success) {
        this.projects =  response.projectAPI.data.map((item :any)=>({
          id: item.id,
          name:item.projectcode + ' - '+item.projectshortname
        }));
        this.isProjectLoaded=true;
      }
      if(this.isProfessional){
        this.sessionservice.staffTypeSubject$.pipe(take(1)).subscribe((response:any)=>{
          console.log(this.professionals);
          this.professionals= response;
        })
      }
      if(this.isStatus){
        this.sessionservice.statusSubject$.pipe(take(1)).subscribe((response:any)=>{
          this.statuses= response;
        })
      }
      
   });
  }
  projectChange(data:any){

  }
  applyFilter(data:any){

  }
}
