import {AfterViewInit, Component,inject, Input, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { finalize ,delay} from 'rxjs';
import { SessionService } from '@app/shared/services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { StateDataService } from '@app/shared/services/state-data.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { GenerateCsvService } from '@app/shared/services/generate-csv.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { ContractorInterfaceService } from '@app/shared/services/external/contractor-interface.service';
import { DynamicTabComponent } from '@app/shared/models/constant.config';

@Component({
  selector: 'app-manage-supervision-list',
  standalone: false,
  templateUrl: './manage-supervision-list.component.html',
  styleUrl: './manage-supervision-list.component.scss',
   animations: [
    trigger('detailExpand', [
      state('collapsed,void', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ManageSupervisionListComponent implements DynamicTabComponent {
single1:any = [
    {
      "name": "Physical ",
      "value": 55
    },
    {
      "name": "Financial ",
      "value": 50
    }
  ];
  xScaleMax:number=100;
  xScaleMin:number=0;
  legend: boolean = false; 
  viewGraph: [number,number] = [380, 150];
  currentDate: Date = new Date();
  isContLoading=false;
// options
showXAxis: boolean = true;
showYAxis: boolean = true;
gradient: boolean = false;
showLegend: boolean = false;
showXAxisLabel: boolean = true;
showYAxisLabel: boolean = true;
isSearchLoading=true;
  projects:any[]= [];
  isLoading = true;
  displayedColumns: string[] = ['serial','code', 'shortname', 'location','clientname', 'concernpersonname'];
  dataSource: MatTableDataSource<any[]>;
  columnsToDisplayWithExpand = [...this.displayedColumns, 'expand'];
  expandedElement: any | null;
  activeOrgId='123';
  readonly dialog = inject(MatDialog);
  @Input() subsectorId!: string;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

   private defaultdialogoptions:  MatDialogConfig = {
        minWidth: '900px', 
        disableClose: false,
        data: {},
      };

  constructor(private projectService: ProjectInterfaceService, private sessionService : SessionService,
    private router: Router,private route: ActivatedRoute,private stateDataService: StateDataService,
    private notifyBarService:NotifyBarService, private csvService:GenerateCsvService,
    private contractorService:ContractorInterfaceService
  )
  {
   
     this.dataSource = new MatTableDataSource(this.projects);
  }


  dataLabelFormat = (value: any): string => {    
    return `${value}%`; 
  };
  ngOnInit()  {
    console.log(this.route.snapshot.data['pageGuid']);
     console.log(this.subsectorId);
     this.searchObj.subsector=this.subsectorId;
    this.stateDataService.stateDataSubject.subscribe((data) => {   
      if (data.event == 'sup-projectadd' && data.valid && data.value) {
        this.addRowData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }else if (data.event == 'sup-bulkproject' && data.valid && data.value) {
        
        this.addBulkData(data.value);
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }  
    });

    this.isLoading=true;
    this.filterProject();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  view(element: any){   
    console.log(element);
    this.sessionService.setCurrentProject(element);
    this.router.navigate(['sup-view'], { relativeTo: this.route });
  }

  export(){
    if(this.projects && this.projects.length>0)
      this.csvService.downloadFile(this.projects,this.projectService.getCSVTemplateColumnList(),'Projects');
  }
  addBulkData(data:any){
    data.forEach((element:any) => {
      this.addRowData(element);
    });
  }
  addRowData(data: any) { 
    const data1:any = {
      id:data.id,
      tenderid:data.tenderId,
      projectcode:data.projectCode,
      projectshortname:data.projectShortName,
      projectlocation:data.projectLocation,
      projectname:data.projectName,
      keypoints:data.keyPoints,
      companyid: data.companyId,
      worktypeid:data.workTypeId,
      ourroleid:data.ourRoleId,
      projectlength:data.projectLength,
      bidduedate:data.bidDueDate,
      loadate:data.loaDate, 
      agreementdate:data.aggrementDate,     
      commencementdate:data.commencementDate,
      projectduration:data.projectDuration,
      oandmduration:data.oandmDuration,
      constructionduration:data.constructionDuration,
      jvshare:data.jvShare,
      scheduleconstructioncompletedate: data.scheduleConstructionCompleteDate,
      authengineerid:data.authEngineerId,
      remark:data.remark,
      cordinatorid:data.cordinatorId,
      consultancyfees:data.consultancyFees,
      contractmodeid:data.contractModeId, 
      lead:data.lead,     
      jv:data.jv,
      ourshare:data.ourShare,
      association:data.association,
      client:data.client,
      regionalofficename:data.regionalOfficeName, 
      regionalofficeaddress:data.regionalOfficeAddress,     
      piuaddress:data.piuAddress,
      siteaddress:data.siteAddress
    }      
    this.dataSource.data.unshift(data1);  
    this.dataSource._updateChangeSubscription(); 
  }

  contractorChange(element:any, event:any){ 
    this.isContLoading=true;   
    this.contractorService.getAllContractorDetailsListViewById({id:event.value},'')
    .pipe((finalize(()=> this.isContLoading=false))).subscribe((response:any)=>{
      if(response && response.success){
        const elementData:any = this.dataSource.data.find((x:any) => x.id == element.id);
        elementData.selectedContractor=event.value;
        elementData.submittedbill= response.data.submittedbill;
        elementData.recommendedbill= response.data.recommendedbill;
        elementData.authoritybill= response.data.authoritybill;
        elementData.contractor= response.data.contractor;
        elementData.progress=response.data.progress;
        elementData.cos=response.data.cos;
        elementData.eot=response.data.eot;
        this.dataSource._updateChangeSubscription();
      }
    })
  }
  searchObj:any={
    projectid:'',
    companyid:''   
  };
  projectChange(data:any){ 
    this.searchObj.projectid= data.value ?? '';
    this.filterProject();
  } 
  compChange(data:any){
    this.searchObj.companyid= data.value ?? '';
    this.searchObj.projectid= data.projectid ?? '';
    this.filterProject();
  } 
  anyChange(data:any){
    if(data && data.value){ 
      this.dataSource.filter = data.value.trim().toLowerCase()
    }
    else{
      this.dataSource.filter = '';
    }
  } 
  filterProject(){
    this.isSearchLoading=true;
    this.projectService.getAllProjectDetailsByOrdIg(this.searchObj, '')
    .pipe(finalize(() =>{ this.isLoading = false; this.isSearchLoading=false;}))
    .subscribe((response: any) => {
      if (response && response.success) {
        this.projects = response.data.map((item:any, index: number) => ({
          srno: index + 1, 
          ...item,
          selectedContractor:item.contractor!=null ? item.contractor.id : null
        }));  
         this.dataSource = new MatTableDataSource(this.projects);           
      }
  }); 
  }
}
