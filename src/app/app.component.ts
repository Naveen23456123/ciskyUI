import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { environment } from '@env/environment';
import { StateDataService } from './shared/services/state-data.service';
import { InactivityService } from './shared/services/inactivity.service';
import { NotifyBarService } from './shared/services/notify-bar.service';
import { I18nService } from './core/i18n.service';
import { Router, NavigationEnd, ActivatedRoute, NavigationStart } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { SessionService } from './shared/services/session.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'almondz';
  menuItems = [{Text:'DashBoard', icon:'dashboard'}, 
    {Text:'Reports', icon:'insert_chart'}, 
    {Text:'Employees', icon:'people'},
    {Text:'Vehicles(s)', icon:'directions_car'},
    {Text:'Email(s)', icon:'email'},
    {Text:'Employees', icon:'people'},
    {Text:'Employees', icon:'people'}
  ];
  selectedItem: string | null = null;

  onItemClick(item: string) {
    this.selectedItem = item;
  }
  constructor( private translateService: TranslateService,
    private titleService: Title,private router: Router, private route: ActivatedRoute,
    private sessionService: SessionService,
    private stateDataService:StateDataService
  ){

  }
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (event.url !== '/projects/project-view' && !event.url.includes('/boq-invoice')) {
          this.sessionService.setProjectEntity(null); // Clear data only when leaving /specific
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
      //log.debug(data);
      const pageTitle = data['title'];
      if (pageTitle) {
        this.titleService.setTitle(this.translateService.instant(pageTitle));
      }
      //Handle Permission for pages and roles     
      if (this.router.getCurrentNavigation()?.extras.state)
        this.stateDataService.stateDataSubject.next(this.router.getCurrentNavigation()?.extras.state);

    });

    this.sessionService.getRunTimeConfig(`${environment.configBase}/config.json`).subscribe(() => {
      this.applicationsetup()
    
    });


  }
  applicationsetup(){
    this.sessionService.loadGlobalData();
    
  }
}
