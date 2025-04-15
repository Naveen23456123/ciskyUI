import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ViewLetterDetailsComponent } from '@app/shared/components/letters/view-letter-details/view-letter-details.component';
import { LetterType } from '@app/shared/models/constant.config';

@Component({
  selector: 'app-letter-details',
  standalone: false,
  templateUrl: './letter-details.component.html',
  styleUrl: './letter-details.component.scss'
})
export class LetterDetailsComponent {
constructor(private route: ActivatedRoute, private dialog: MatDialog,
    private router: Router) { }

  defaultdialogOptionConfig: MatDialogConfig = {
    minWidth: '1100px',
    minHeight: '90vh',
    disableClose: true,
    data: {}
  }

  ngOnInit(): void {
    this.openDialog();
  }
  openDialog() {
    this.defaultdialogOptionConfig.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element: window.history.state     
    };
    const dialogRef = this.dialog.open(ViewLetterDetailsComponent, this.defaultdialogOptionConfig);  
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {       
        this.router.navigate(['../../']);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });
  }
}



