import { Component ,inject} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageUploadLettersComponent } from '@app/shared/components/letters/manage-upload-letters/manage-upload-letters.component';
import { LetterEntity, LetterType } from '@app/shared/models/constant.config';
import { TemplateType } from '@app/shared/models/CSVTemplate';

@Component({
  selector: 'app-upload-letter',
  standalone: false,
  templateUrl: './upload-letter.component.html',
  styleUrl: './upload-letter.component.scss'
})
export class UploadLetterComponent {
readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private route: ActivatedRoute) {    
  }

  ngOnInit(): void {   
    this.openDialog();
  }
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '80vw',
    disableClose: false,
    data: {}
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      template_type: TemplateType.LETTERS     
    };
    config.data.separate = true;
     
    const dialogRef = this.dialog.open(ManageUploadLettersComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'uploadlet', valid: true, msg: 'The Letter(s) created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }
}

