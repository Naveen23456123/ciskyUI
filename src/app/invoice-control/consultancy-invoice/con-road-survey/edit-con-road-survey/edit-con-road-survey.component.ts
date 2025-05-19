import { Component ,inject} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { ManageConsultancyRoadSurveyComponent } from '@app/shared/components/invoices/consultancy/manage-consultancy-road-survey/manage-consultancy-road-survey.component';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

@Component({
  selector: 'app-edit-con-road-survey',
  standalone: false,
  templateUrl: './edit-con-road-survey.component.html',
  styleUrl: './edit-con-road-survey.component.scss'
})
export class EditConRoadSurveyComponent {

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
    minWidth: '1000px',
    disableClose: false,
    data: {},
  };

  openDialog(): void {
    const config = this.defaultdialogoptions;
    config.data = {
      pageGuid: this.route.snapshot.data['pageGuid'],
      type: this.route.snapshot.data['type'],
      element: {
        pid:window.history.state.invoiceid,
        description:window.history.state.description,
        id:window.history.state.id,
        currentbillkm:window.history.state.currentbillkm
      }
    };
    const dialogRef = this.dialog.open(ManageConsultancyRoadSurveyComponent, config);
    dialogRef.afterClosed().subscribe((data) => {
      if (data && data.valid) {
        let navigationExtras: NavigationExtras = {
          relativeTo: this.route,
          state: { value: data.value, event: 'conrsedit', valid: true, msg: 'The Road Survey invoice details updated successfully.' }
        };
        this.router.navigate(['../../'], navigationExtras);
      }
      else {
        this.router.navigate(['../../'], { relativeTo: this.route, });
      }
    });
  }


}







