import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { AttachLetterComponent } from '@app/shared/components/letters/attach-letter/attach-letter.component';
import { LetterEntity, LetterType } from '@app/shared/models/constant.config';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-add-letter',
  standalone: false,
  templateUrl: './add-letter.component.html',
  styleUrl: './add-letter.component.scss'
})
export class AddLetterComponent {
readonly dialog = inject(MatDialog);

  constructor(
    private router: Router,
    private route: ActivatedRoute, private formbuilder: FormBuilder,
    private notifybar: NotifyBarService) {    
  }

  ngOnInit(): void {
   
    this.openDialog();
  }
  
  private defaultdialogoptions:  MatDialogConfig = {
    minWidth: '1100px',
    disableClose: false,
    data: {},
    //scrollStrategy: this.scrollStrategy.noop()
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      letter_entity: LetterEntity.ANY    
    };
    config.data.separate = true;
     
    const dialogRef = this.dialog.open(AttachLetterComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'letteradd', valid: true, msg: 'The Letter created successfully.' }
        };
        this.router.navigate(['../'], navigationExtras);
      }
      else {
        this.router.navigate(['../'], { relativeTo: this.route });
      }
    });
  }


}

