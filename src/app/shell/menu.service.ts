import { Injectable } from '@angular/core';
import { Logger } from '@app/core/logger.service';
import { SessionService } from '@app/shared/services/session.service';
import { Observable } from 'rxjs';

const log = new Logger('Menu Service');
@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor(private sessionService: SessionService) { }

  public menuItems() {
    return [
      //   {
      //   label: 'System',
      //   icon: 'computer',
      //   items: [{
      //     label: 'Routing',
      //     items: [{
      //       label: 'Features Routing',
      //       link: 'system/routing/features-routing',
      //       guid: '',
      //       roles: []
      //     }]
      //   }]
      // },
      {
        label: 'Dashboard',
        icon: 'bxs-dashboard',
        link: 'dashboard',
        guid: '',
        roles: []
      },
      // {
      //   label: 'Dashboard Test',
      //   icon: 'bxs-dashboard',
      //   link: 'dashboard-test',
      //   guid: '',
      //   roles: []
      // },
       {
        label: 'Projects',
        icon: 'bxs-network-chart',
        link: '#',
        guid: '',
        roles: [],
        items: [
        {
          label: 'Transport Infra',
          link: 'transport-list',
          guid: '',
          roles: []
        },
        // {
        //   label: 'Smart Cities/Urban',
        //   link: 'sub-company',
        //   guid: '',
        //   roles: []
        // },
        // {
        //   label: 'Env & Social',
        //   link: 'projects',
        //   guid: '',
        //   roles: []
        // },
        // {
        //   label: 'Survey & Testing',
        //   link: 'department',
        //   guid: '',
        //   roles: []
        // },
        // {
        //   label: 'Finance & Advisory',
        //   link: 'con-account',
        //   guid: '',
        //   roles: []
        // },       
        // {
        //   label: 'Railway & Metros',
        //   link: 'con-account',
        //   guid: '',
        //   roles: []
        // },
        // {
        //   label: 'Water Resources',
        //   link: 'con-account',
        //   guid: '',
        //   roles: []
        // },
        // {
        // label: 'Tourism',
        // link: 'con-account',
        // guid: '',
        // roles: []
        // }
        ],
      },
      // {
      //   label: 'Projects',
      //   icon: 'bxs-network-chart',
      //   link: 'projects',
      //   guid: '',
      //   roles: [],
      // },
      {
        label: 'Glance',
        icon: 'bxs-network-chart',
        link: 'explore',
        guid: '',
        roles: []
      },
      {
        label: 'Site Control',
        icon: 'bx-slider-alt',
        link: '#',
        items: [{
          label: 'Sub Company',
          link: 'sub-company',
          guid: '',
          roles: []
        },
        {
          label: 'Designation',
          link: 'designation',
          guid: '',
          roles: []
        },
        {
          label: 'Department',
          link: 'department',
          guid: '',
          roles: []
        },
        {
          label: 'Consultant Account',
          link: 'con-account',
          guid: '',
          roles: []
        }],
      },
      {
        label: 'Employee Control',
        icon: 'bxs-group',
        link: '#',
        items: [{
          label: 'Employees',
          link: 'employees',
          guid: '',
          roles: []
        },
        {
          label: 'BOQ Attendence',
          link: 'boq-attendence',
          guid: '',
          roles: []
        }
        // {
        //   label: 'Actual Attendence',
        //   link: 'global',
        //   guid: '',
        //   roles: []
        // }
      ],
      },
      {
        label: 'Inventory Control',
        icon: 'bxs-data',
        link: '#',
        items: [{
          label: 'Item(s)',
          link: 'items',
          guid: '',
          roles: []
        },
        {
          label: 'Site Inventory',
          link: 'inventory',
          guid: '',
          roles: []
        }],
      },
      {
        label: 'Vehicle Control',
        icon: 'bxs-car',
        link: '#',
        items: [{
          label: 'Vehicle',
          link: 'vehicles',
          guid: '',
          roles: []
        },
        {
          label: 'Log Details',
          link: 'vehicle-log',
          guid: '',
          roles: []
        },
        {
          label: 'Billing Details',
          link: 'vehicle-billing',
          guid: '',
          roles: []
        }],
      },
      
    
      {
        label: 'Letter Monitor',
        icon: 'bxs-file',
        link: 'letters',
        guid: '',
        roles: []
      },
      {
        label: 'Payments',
        icon: 'bx-rupee',
        link: '#',
        items: [{
          label: 'BOQ',
          link: 'boq-list',
          guid: '',
          roles: []
        },
        {
          label: 'Invoice',
          link: 'invoice',
          guid: '',
          roles: []
        }],
      },
      {
        label: 'Office Rent',
        icon: 'bxs-buildings',
        link: 'ofc-rent',
        guid: '',
        roles: []
      },
      // {
      //   label: 'Certification Access',
      //   icon: 'bxs-certification',
      //   link: 'invitation-list',
      //   guid: '',
      //   roles: []
      // },
      {
        label: 'Circular',
        icon: 'bxs-envelope-open',
        link: 'circular',
        guid: '',
        roles: []
      },      
      {
        label: 'Profit & Loss',
        icon: 'bx-money',
        link: 'profit-loss',
        guid: '',
        roles: []
      }, 
      {
        label: 'SiteOps Fund',
        icon: 'bx-rupee',
        link: '#',
        items: [{
          label: 'Imperest',
          link: 'imperest',
          guid: '',
          roles: []
          //Admin - Id, SuperAdmin -Id
        },
        {
          label: 'Expense',
          link: 'expense',
          guid: '',
          roles: []
        },
        {
          label: 'Office Rent',
          link: 'ofc-billing',
          guid: '',
          roles: []
        }], 
      },
      {
        label: 'Requests',
        icon: 'bx-rupee',
        link: '#',
        items: [{
          label: 'Office(es)',
          link: 'ofc-billing-request',
          guid: '',
          roles: []
          //Admin - Id, SuperAdmin -Id
        },
        {
          label: 'Imperest(s)',
          link: 'imperest-billing-request',
          guid: '',
          roles: []
        },
        {
          label: 'Expens(es)',
          link: 'exp-billing-request',
          guid: '',
          roles: []
        },
        {
          label: 'Vehicle(s)',
          link: 'veh-billing-request',
          guid: '',
          roles: []
        }], 
      },
      {
        label: 'Ticket',
        icon: 'bx-library',
        link: 'ticket',
        guid: '',
        roles: []
      },
      {
        label: 'Miscellaneous',
        icon: 'bx-library',
        link: 'misc',
        guid: '',
        roles: []
      }, 
      {
        label: 'Settings',
        icon: 'bxs-cog',
        link: 'invitation-list',
        items: [{
          label: 'Approvals',
          link: 'approval',
          guid: '',
          roles: []
        }]
      },
      {
        label: 'Manage User',
        icon: 'bx-money',
        link: 'user-project',
        guid: '',
        roles: []
      }, 
      
    ]
  }

  public displayItems() {
    return new Observable((sub) => {
      const displayeditems = this.menuItems();
      this.sessionService.userPriviligesSubject$.subscribe((priviliges) => {
        if (priviliges) {
          //log.debug(priviliges);
          displayeditems.forEach((firstelement: any) => {
            //firstelement.hidden = true;
            if (firstelement.items && firstelement.items.length) {
              firstelement.items.forEach((secondEle: any) => {
                secondEle.hidden = true;
                if (secondEle) {
                  secondEle.hidden = !this.checkPriviligies(priviliges, secondEle);
                  //  firstelement.hidden = secondEle.hidden ? firstelement.hidden : false;
                }
              });
              firstelement.hidden =this.anyItemVisible(firstelement.items);
            }
            else {
            //  firstelement.hidden =!this.checkPriviligies(priviliges, firstelement);
            }
            //log.debug(element);
          });
          // priviliges.forEach(element => {

          // });
        }
      });
      sub.next(displayeditems);
      sub.complete();
    });
  }
  private checkPriviligies(priviliges: any, item: any): boolean {
    // log.debug(priviliges, item);
    const menuelement = priviliges.filter((ele:any) => {
      return ele.module.toLowerCase() === item.label.toLowerCase();
    });
    //log.debug(menuelement);
    if (typeof (menuelement[0]) !== 'undefined' && menuelement[0] !== null)
      return true;
    else
      return false;
  }
  private anyItemVisible(items: any) :boolean{
    const menuelement = items.filter((ele:any) => {
      return ele.hidden == false;
    });
    //log.debug(menuelement);
    if (typeof (menuelement[0]) !== 'undefined' && menuelement[0] !== null)
      return false;
    else
      return true;
  }
}
