import { Injectable } from '@angular/core';
import { Logger } from '@app/core/logger.service';
import { untilDestroyed } from '@app/core/until-destroyed';
import { SessionService } from '@app/shared/services/session.service';
import { Observable, Subject, takeUntil } from 'rxjs';

const log = new Logger('Menu Service');
@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private destroy$ = new Subject<void>();
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
        guid: '680dd1bd3682904bdd6e9aa1',
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
            guid: '691ac28c49a626388723641e',
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
        guid: '680dd1bd3682904bdd6e9aa2',
        roles: []
      },
      {
        label: 'Site Control',
        icon: 'bx-slider-alt',
        link: '#',
        items: [{
          label: 'Sub Company',
          link: 'sub-company',
          guid: '680dd2733682904bdd6e9aa4',
          roles: []
        },
        {
          label: 'Designation',
          link: 'designation',
          guid: '680dd2933682904bdd6e9aa5',
          roles: []
        },
        {
          label: 'Department',
          link: 'department',
          guid: '680dd2933682904bdd6e9aa6',
          roles: []
        },
        {
          label: 'Consultant Account',
          link: 'con-account',
          guid: '680dd2933682904bdd6e9aa7',
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
          guid: '680dd2733682904bdd6e9aa9',
          roles: []
        },
        {
          label: 'BOQ Attendence',
          link: 'boq-attendence',
          guid: '680dd2933682904bdd6e9ab1',
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
          guid: '680dd2733682904bdd6e9ab4',
          roles: []
        },
        {
          label: 'Site Inventory',
          link: 'inventory',
          guid: '680dd2933682904bdd6e9ab5',
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
          guid: '680dd2733682904bdd6e9ab7',
          roles: []
        },
        {
          label: 'Log Details',
          link: 'vehicle-log',
          guid: '680dd2933682904bdd6e9ab8',
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
        guid: '680dd1bd3682904bdd6e9ac1',
        roles: []
      },
      {
        label: 'Payments',
        icon: 'bx-rupee',
        link: '#',
        items: [{
          label: 'BOQ',
          link: 'boq-list',
          guid: '680dd2733682904bdd6e9ac3',
          roles: []
        },
        {
          label: 'Invoice',
          link: 'invoice',
          guid: '680dd2933682904bdd6e9ac4',
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
        guid: '680dd1bd3682904bdd6e9ac7',
        roles: []
      },
      {
        label: 'Profit & Loss',
        icon: 'bx-money',
        link: 'profit-loss',
        guid: '680dd1bd3682904bdd6e9ac8',
        roles: []
      },
      {
        label: 'SiteOps Fund',
        icon: 'bx-rupee',
        link: '#',
        items: [{
          label: 'Imperest',
          link: 'imperest',
          guid: '680dd2733682904bdd6e9afb',
          roles: []
          //Admin - Id, SuperAdmin -Id
        },
        {
          label: 'Expense',
          link: 'expense',
          guid: '680dd2933682904bdd6e9afc',
          roles: []
        },
        {
          label: 'Office Rent',
          link: 'ofc-billing',
          guid: '680dd2933682904bdd6e9afd',
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
          guid: '680dd2733682904bdd6e9aac',
          roles: []
          //Admin - Id, SuperAdmin -Id
        },
        {
          label: 'Imperest(s)',
          link: 'imperest-billing-request',
          guid: '680dd2733682904bdd6e9aaa',
          roles: []
        },
        {
          label: 'Expens(es)',
          link: 'exp-billing-request',
          guid: '680dd2733682904bdd6e9aab',
          roles: []
        },
        {
          label: 'Vehicle(s)',
          link: 'veh-billing-request',
          guid: '680dd2733682904bdd6e9aad',
          roles: []
        }],
      },
      {
        label: 'Ticket',
        icon: 'bx-library',
        link: 'ticket',
        guid: '680dd1bd3682904bdd6e9ad9',
        roles: []
      },
      {
        label: 'Miscellaneous',
        icon: 'bx-library',
        link: 'misc',
        guid: '680dd1bd3682904bdd6e9ac9',
        roles: []
      },
      {
        label: 'Settings',
        icon: 'bxs-cog',
        link: 'invitation-list',
        items: [{
          label: 'Approvals',
          link: 'approval',
          guid: '680dd2733682904bdd6e9abb',
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
      {
        label: 'Permissions',
        icon: 'bx-money',
        link: 'permission',
        guid: '',
        roles: []
      },

    ]
  }

  public displayItems() {
    return new Observable((sub) => {
      const displayeditems = this.menuItems();
      this.sessionService.userPriviligesSubject$.pipe(takeUntil(this.destroy$)).subscribe((priviliges) => {
        console.log(priviliges);
        console.log(displayeditems);
        if (priviliges) {
          //log.debug(priviliges);
          displayeditems.forEach((firstelement: any) => {
            //firstelement.hidden = true;
            if (firstelement.items && firstelement.items.length) {
              firstelement.items.forEach((secondEle: any) => {
                secondEle.hidden = true;
                if (secondEle) {
                  secondEle.hidden = !this.checkPriviligies(priviliges.Modules, secondEle);
                  firstelement.hidden = secondEle.hidden ? firstelement.hidden : false;
                }
              });
              firstelement.hidden = this.anyItemVisible(firstelement.items);
            }
            else {
              firstelement.hidden = !this.checkPriviligies(priviliges.Modules, firstelement);
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
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  private checkPriviligies(priviliges: any, item: any): boolean {
    console.log(priviliges, item);
    const menuelement = priviliges?.filter((ele: any) => {
      return ele.Name.toLowerCase() === item.label.toLowerCase();
    });
    //log.debug(menuelement);
    if (typeof (menuelement[0]) !== 'undefined' && menuelement[0] !== null)
      return true;
    else
      return false;
  }
  private anyItemVisible(items: any): boolean {
    const menuelement = items.filter((ele: any) => {
      return ele.hidden == false;
    });
    //log.debug(menuelement);
    if (typeof (menuelement[0]) !== 'undefined' && menuelement[0] !== null)
      return false;
    else
      return true;
  }
}
