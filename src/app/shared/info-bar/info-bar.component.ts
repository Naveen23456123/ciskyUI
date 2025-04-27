import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
//import { VisitorDetailsComponent } from '@app/catalogue/visitors/visitor-details/visitor-details.component';
import { Logger } from '@app/core/logger.service';
import { untilDestroyed } from '@app/core/until-destroyed';
import { filter, map, mergeMap, take, takeLast } from 'rxjs/operators';
import { SessionService } from '../services/session.service';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

const log = new Logger('info-bar');
@Component({
  standalone:false,
  selector: 'app-info-bar',
  templateUrl: './info-bar.component.html',
  styleUrls: ['./info-bar.component.scss']
})
export class InfoBarComponent implements OnInit {
  orgList: any[] = [];
  selectedOrg: string='';
  location: FormControl = new FormControl('');
  pageTitle:string='';
  constructor( private translateService: TranslateService,
      private titleService: Title,private router: Router, private route: ActivatedRoute,
      private sessionService: SessionService,) { }

  ngOnInit(): void {
    // this.sessionService.workingLocationSubject$.pipe(take(1)).subscribe((org) => {
    //   if (org && org.organization.id) {
    //     this.selectedOrg = org.organization.id;
    //   }
    // });
    this.sessionService.allLocationSubject$.pipe(take(1)).subscribe((org) => {
     // log.debug(org);
      if (org && org.organizations.length > 0) {
        this.orgList = org.organizations;
        // org.organizations.forEach(element => {
        //   this.orgList.push({ text: element.name, value: element.orgId });
        // });

        log.debug(this.selectedOrg);
        this.location.setValue(this.selectedOrg);
      }
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url == '/projects/project-view') {
         this.sessionService.workOwnerSubject$.subscribe((response:any)=>{
          if(response)
            this.pageTitle= response.projectname;
         })
        
        }
      }
    });
    this.router.events.pipe(
          filter(event => event instanceof NavigationEnd),
          map(() => this.route),
          map(route => {
            while (route.firstChild) route = route.firstChild
            return route
          }),
          filter(route => route.outlet === 'primary'),
          mergeMap(route => route.data)
        ).subscribe(data => {
          if(typeof data['title']!= 'undefined'){
            this.pageTitle = data['title'];
          }
    });

  }
  locChange(event: any) {
    this.sessionService.setWorkingLocation(this.orgList.find(x => x.orgId == event.value));
  }
  ngOnDestroy() {

  }
  logout(){
    this.router.navigate(['/login']);
  }
  openbottom(){
    //this.bottomService.open(VisitorDetailsComponent);
  }
}
