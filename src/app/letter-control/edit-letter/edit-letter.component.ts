import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AttachLetterComponent } from '@app/shared/components/letters/attach-letter/attach-letter.component';
import { LetterType } from '@app/shared/models/constant.config';

@Component({
  selector: 'app-edit-letter',
  standalone: false,
  templateUrl: './edit-letter.component.html',
  styleUrl: './edit-letter.component.scss'
})
export class EditLetterComponent {
constructor(private route: ActivatedRoute, private dialog: MatDialog,
    private router: Router) { }

  defaultdialogOptionConfig: MatDialogConfig = {
    minWidth: '1100px',
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
      element: window.history.state,
      letter_type:LetterType.allLetter
    };

    const dialogRef = this.dialog.open(AttachLetterComponent, this.defaultdialogOptionConfig);
    dialogRef.afterClosed().subscribe((data) => {
      if (data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'letteredit', valid: true, msg: 'The Letter updated successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });

  }
}



