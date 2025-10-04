import { Component ,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras,  Router } from '@angular/router';
import { ManageViewImperestComponent } from '@app/shared/components/siteops/imperest/manage-view-imperest/manage-view-imperest.component';

@Component({
  selector: 'app-view-imperest',
  standalone: false,
  templateUrl: './view-imperest.component.html',
  styleUrl: './view-imperest.component.scss'
})
export class ViewImperestComponent {
  readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private route: ActivatedRoute) {    
  }

  ngOnInit(): void {
    this.openDialog();
  }
  
  private defaultdialogoptions:  MatDialogConfig = {   
    disableClose: false,
    data: {},
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element:window.history.state
    };
    config.minWidth= '65vw';
    const dialogRef = this.dialog.open(ManageViewImperestComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      this.router.navigate(['../../'], { relativeTo: this.route });
    });
  }


}
