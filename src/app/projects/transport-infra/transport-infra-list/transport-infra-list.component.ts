import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ManageDprListComponent } from '@app/shared/components/projects/transport-infra/dpr/manage-dpr-list/manage-dpr-list.component';
import { ManageSupervisionListComponent } from '@app/shared/components/projects/transport-infra/supervision/manage-supervision-list/manage-supervision-list.component';

@Component({
  selector: 'app-transport-infra-list',
  standalone: false,
  templateUrl: './transport-infra-list.component.html',
  styleUrl: './transport-infra-list.component.scss'
})
export class TransportInfraListComponent {
  ConstructionComponent = ManageSupervisionListComponent;
  dprComponent= ManageDprListComponent;
  pageGuid:any;
  constructor(private route: ActivatedRoute){}

  ngOnInit(){
    this.pageGuid = this.route.snapshot.data['pageGuid'];
    
  }
}
