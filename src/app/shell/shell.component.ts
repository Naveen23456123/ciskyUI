import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Observable, Subject, Subscriber, fromEvent } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { CoreAPIService } from '@app/shared/services/external/coreapi.service';
import { ServiceAttributeModel } from '@app/shared/models/http/ServiceAttributeModel';
import { Operation } from '@app/shared/models/http/ActionModel';
import { MenuService } from './menu.service';
import { untilDestroyed } from '@app/core/until-destroyed';
//import { ThrowStmt } from '@angular/compiler';
import { map, debounceTime, startWith, take, takeUntil } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { InactivityService } from '@app/shared/services/inactivity.service';
import { SessionService } from '@app/shared/services/session.service';
import { FormControl } from '@angular/forms';

@Component({
  standalone: false,
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.scss']
})
export class ShellComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  @ViewChild('sidenav') sidenav: MatSidenav | undefined;
  lastSignedOn: string = '';
  userName: string = 'Sharwan Lal';
  sessionEnded: string = '/session-end';
  orgList: any[] = [];
  selectedOrg: string = '';
  location: FormControl = new FormControl('');
  selectedItem: any;
  constructor(private _httpClient: HttpClient, private _servicehelper: CoreAPIService,
    private _menuservice: MenuService,
    private router: Router,
    private inactivityService: InactivityService,
    private sessionService: SessionService,
    private el: ElementRef, private renderer: Renderer2) { }


  public sidebarConfig = {
    paddingAtStart: true,
    // interfaceWithRoute: true,
    // classname: 'my-custom-class',
    listBackgroundColor: 'transparent',
    fontColor: '#F5F5F5',
    backgroundColor: 'transparent',
    selectedListFontColor: '#F5F5F5',
    highlightOnSelect: false,
    collapseOnSelect: true,
    // rtlLayout: false
  };
  public sidebarLinks = [{
    label: 'Loading...',
    link: '',
    icon: '',
    hidden: true,
    items: [{
      label: '',
      link: '',
      hidden: true
    }]
  }];
  public expanded = true;
  public isSession = false;
  public showTabletSlidebar = false;
  private isTablet$: any;

  ngOnInit(): void {
    this.isSession = this.router.url === this.sessionEnded;
    this.checkSessionEnd();
    this._menuservice.displayItems().pipe(takeUntil(this.destroy$)).subscribe((data: [] | any) => {
      this.sidebarLinks = data;
    });
    this.sessionService.userSubject$.subscribe((user) => {
      if (user) {
        this.userName = user.firstName + ' ' + user.lastName;
        this.lastSignedOn = user.lastSignedOn;
      }
    });

    this.sessionService.allLocationSubject$.pipe(take(1)).subscribe((org) => {
      // log.debug(org);
      if (org && org.organizations.length > 0) {
        // this.sessionService.workingLocationSubject$.pipe(take(1)).subscribe((org) => {
        //   if (org && org.organization.id) {
        //     this.selectedOrg = org.organization.id;
        //     this.location.setValue(this.selectedOrg);
        //   }
        // });
        this.orgList = org.organizations;
      }
    });
    // this.showTabletSlidebar = document.body.offsetWidth < 994;
    // const checkScreenSize = () => document.body.offsetWidth < 994;
    // const changedScreenSize$ = fromEvent(window, 'resize').pipe(debounceTime(500)).pipe(map(checkScreenSize));

    // this.isTablet$ = changedScreenSize$.pipe(startWith(checkScreenSize()));
    // this.isTablet$.subscribe((value:any) => {
    //   this.showTabletSlidebar = value;
    // });
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  locChange(event: any) {
    this.sessionService.setWorkingLocation(this.orgList.find(x => x.orgId == event.value));
  }
  // selectedItem(event: any) {
  //   if (this.sidenav && this.sidenav.close) {
  //     this.sidenav.close();
  //   }
  //   this.router.navigate([event.link]).then(() => {
  //     window.scroll(0, 0);
  //   });
  // }

  toggleSlidebar() {
    this.expanded = !this.expanded;
  }
  checkSessionEnd() {
    this.router.events.subscribe((eventdata) => {
      if (eventdata instanceof NavigationEnd) {
        this.isSession = this.router.url === this.sessionEnded;
      }
    });
  }

  logout() {
    this.inactivityService.logout();
  }
  ngAfterViewInit(): void {
    const elements = this.el.nativeElement.querySelectorAll('.div-arrow');

    elements.forEach((element: HTMLElement) => {
      element.addEventListener("click", (e) => {
        let arrowParent = element.parentElement;
        this.el.nativeElement.querySelectorAll('.nav-links >li').forEach((element: HTMLElement) => {
          if (element != arrowParent)
            element?.classList.remove("showMenu");
        });
        console.log(arrowParent);
        if (arrowParent?.classList.contains("showMenu")) {
          arrowParent?.classList.remove("showMenu");
        }
        else
          arrowParent?.classList.add("showMenu");
      });
    });
  }
  toggle() {
    let sidebar = this.el.nativeElement.querySelector('.sidebar');
    this.expanded = sidebar?.classList.contains("close");
    if (sidebar?.classList.contains("close")) {
      sidebar?.classList.remove("close");
    }
    else
      sidebar?.classList.add("close");
  }

  selectItem(item: any) {
    this.selectedItem = item;
  }
}
