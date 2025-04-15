import { Directive, ElementRef, Input } from '@angular/core';
import { Logger } from '@app/core/logger.service';
import { SessionService } from '../services/session.service';

const log = new Logger('Access Directive');
@Directive({
  standalone:false,
  selector: '[access]'
})
export class AccessDirective {
  accessControls: any;
  @Input('module') module: string='';
  @Input('operation') operation: string='';
  constructor(private elementRef: ElementRef, private sessionService: SessionService) { }

  ngOnInit() {
    // this.elementRef.nativeElement.style.display = "none";
    this.hasAccess();
  }
  hasAccess() {
    this.sessionService.userPriviligesSubject$.subscribe((data: any) => {
      if (data) {
        this.accessControls = data;
      }
    });

    // //  const accessControls: any = this.auth.getAccessControls();
    // const accessControls: any = {
    //   "role": "ABC",
    //   "priviligies": [
    //     {
    //       "module_name": "visitors",
    //       "all": false,
    //       "create_action": false,
    //       "read_action": false,
    //       "update_action": true,
    //       "delete_action": false
    //     },
    //     {
    //       "module_name": "invitation",
    //       "all": false,
    //       "create_action": false,
    //       "read_action": false,
    //       "update_action": false,
    //       "delete_action": false
    //     }, {
    //       "module_name": "device",
    //       "all": false,
    //       "create_action": false,
    //       "read_action": false,
    //       "update_action": false,
    //       "delete_action": false
    //     }, {
    //       "module_name": "attendence",
    //       "all": false,
    //       "create_action": false,
    //       "read_action": false,
    //       "update_action": false,
    //       "delete_action": false
    //     },
    //     {
    //       "module_name": "analytics",
    //       "all": false,
    //       "create_action": false,
    //       "read_action": false,
    //       "update_action": false,
    //       "delete_action": false
    //     },
    //     {
    //       "module_name": "reports",
    //       "all": false,
    //       "create_action": false,
    //       "read_action": false,
    //       "update_action": false,
    //       "delete_action": false
    //     }
    //   ]
    // };
    if(this.accessControls){
     // log.debug(this.accessControls);
      const module: any = this.accessControls.find((access:any) => access.module === this.module);
     // log.debug(module);
      // this.elementRef.nativeElement.style.display = module[this.operation] ? "block" : "none";
      if (module && !module[this.operation])
        this.elementRef.nativeElement.remove();
    }  
  }
}
