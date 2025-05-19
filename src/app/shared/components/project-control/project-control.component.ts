import { Component,EventEmitter,Input ,Output} from '@angular/core';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-project-control',
  standalone: false,
  templateUrl: './project-control.component.html',
  styleUrl: './project-control.component.scss'
})
export class ProjectControlComponent {
  @Input() isProjects=false;
  projectList:[]=[];
  isProjectLoaded=false;
  private subscription: Subscription = new Subscription();
  /** Value to emit when selection Chage */
  @Output() onValueChange: EventEmitter<any> = new EventEmitter();

  /** Dfault value to be selected in the select list control */
  @Input() defaultValue: any;

  @Input() disable: any;

  constructor(private projectService:ProjectInterfaceService){
        
  }
  ngOnInit(){    
    this.subscription= this.projectService.getAllProjectPartialDetailsByOrdIg({},'').pipe(untilDestroyed(this))
    .subscribe((response:any)=>{
      if(response && response.success){
          this.projectList =  response.data.map((item :any)=>({
            id: item.id,
            name:item.projectcode + ' - '+item.projectshortname,
            projectshortname:item.projectshortname,
            companyid:item.companyid
          }));
          this.isProjectLoaded=true;
      }
    })
  }
  projectChange(data:any){
    if(data && data.value) {
      this.onValueChange.emit({value:this.projectList.find((x:any)=>x.id==data.value.id)}); 
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
