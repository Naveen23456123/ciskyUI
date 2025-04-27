import { Component ,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras,  Router } from '@angular/router';
import { ManageImperestComponent } from '@app/shared/components/siteops/manage-imperest/manage-imperest.component';

@Component({
  selector: 'app-add-imperest',
  standalone: false,
  templateUrl: './add-imperest.component.html',
  styleUrl: './add-imperest.component.scss'
})
export class AddImperestComponent {
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
      type: this.route.snapshot.data['type']
    };
    config.minWidth= '60vw';
    const dialogRef = this.dialog.open(ManageImperestComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'impadd', valid: true, msg: 'The Imperest created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }


}



