import { ChangeDetectorRef, Component, ComponentRef, Input, QueryList, Type, ViewChild, ViewChildren, ViewContainerRef } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { DynamicTabComponent } from '@app/shared/models/constant.config';
import { SessionService } from '@app/shared/services/session.service';

@Component({
  selector: 'app-project-subshell',
  standalone: false,
  templateUrl: './project-subshell.component.html',
  styleUrl: './project-subshell.component.scss'
})
export class ProjectSubshellComponent {
  @ViewChild('constructionHost', { read: ViewContainerRef }) constructionHost!: ViewContainerRef;
  @ViewChild('omHost', { read: ViewContainerRef }) omHost!: ViewContainerRef;
  @ViewChild('dprHost', { read: ViewContainerRef }) dprHost!: ViewContainerRef;
  @ViewChild('feasibilityHost', { read: ViewContainerRef }) feasibilityHost!: ViewContainerRef;
  @ViewChild('safetyHost', { read: ViewContainerRef }) safetyHost!: ViewContainerRef;
  @Input() constructionComponent!: Type<any>;
  @Input() omHostComponent!: Type<any>;
  @Input() dprHostComponent!: Type<any>;
  @Input() feasibilityHostComponent!: Type<any>;
  @Input() safetyHostComponent!: Type<any>;
  @Input() sectorGuid:any;
  tabComponentMap: { [key: string]: any } = {};
  subsectors:any[]=[];
  constructor(private cdr: ChangeDetectorRef,private sessionService:SessionService) {}

  // onTabChange(index: number) {
  //   this.loadTabComponent(index);
  // }

  ngOnInit(){
    this.sessionService.orgSubject$.subscribe((response:any)=>{
      if(this.sectorGuid && response){        
         this.subsectors= response.sectors.find((x:any)=>x.id==this.sectorGuid).subsectors;
        
      }
    })
  }
  ngAfterViewInit() {
    this.tabComponentMap = {
    "AE/IE": this.constructionComponent,
    "DPR": this.dprHostComponent,
    "Operation & Maintenance": this.omHostComponent,
    "Feasibility Study": this.feasibilityHostComponent,
    "Safety Measures": this.safetyHostComponent
  };
    this.loadTabComponent(0);
    this.cdr.detectChanges();
  }
  // private loadTabComponent(index: number) {   
  //   switch (index) {
  //     case 0:
  //       if (this.constructionComponent && this.constructionHost) {    
  //         this.constructionHost.clear();      
  //         this.constructionHost.createComponent(this.constructionComponent);          
  //       }
  //       break;
  //     case 1:
  //        if ( this.dprHostComponent && this.dprHost) {
  //         this.dprHost.clear(); 
  //         this.dprHost.createComponent(this.dprHostComponent);          
  //       }        
  //       break;
  //     case 2:
  //      if ( this.omHostComponent && this.omHost) {
  //       this.omHost.clear(); 
  //         this.omHost.createComponent(this.omHostComponent);          
  //       }
  //       break;
  //     case 3:
  //       if ( this.feasibilityHostComponent && this.feasibilityHost) {
  //         this.feasibilityHost.clear(); 
  //         this.feasibilityHost.createComponent(this.feasibilityHostComponent);         
  //       }
  //       break;
  //     case 4:
  //       if ( this.safetyHostComponent && this.safetyHost) {
  //         this.safetyHost.clear(); 
  //         this.safetyHost.createComponent(this.safetyHostComponent);          
  //       }
  //       break;
  //   }
  // }

  tabHostRefs: { [index: number]: ViewContainerRef } = {};
  registerTabHost(index: number, ref: ViewContainerRef) {
    this.tabHostRefs[index] = ref;
  }

  onTabChange(event: MatTabChangeEvent) {
    const index = event.index;
    this.loadTabComponent(index);
   
  }
  loadTabComponent(index: number) {
    const selectedSubsector = this.subsectors[index]?.abbreviation;
    const component = this.tabComponentMap[selectedSubsector];
    
    const host = this.tabHostRefs[index];

    if (host && component) {
      host.clear();
      const componentRef =host.createComponent(component) as ComponentRef<DynamicTabComponent>;
    
      componentRef.instance.subsectorId = this.subsectors[index]?.id;

      componentRef.changeDetectorRef.detectChanges();
    } else {
      console.warn(`No host/component found for index: ${index}, subsector: ${selectedSubsector}`);
    }
  }

}
