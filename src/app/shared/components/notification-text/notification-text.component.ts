import { Component, OnInit, Inject } from '@angular/core';
import { inject } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Logger } from '@app/core/logger.service';
//import { OrganizationInterfaceService } from '@app/shared/services/external/organization-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { finalize } from 'rxjs/operators';

const log = new Logger('Notification Text');
@Component({
  standalone:false,
  selector: 'app-notification-text',
  templateUrl: './notification-text.component.html',
  styleUrls: ['./notification-text.component.css']
})
export class NotificationTextComponent implements OnInit {
  isLoading = true;
  public data: any;
  NotificationForm: FormGroup = new FormGroup({});
  textform: FormGroup= new FormGroup({});
  variableList = [
    { text: 'Host Name', value: 'hostName' },
    { text: 'Company Name', value: 'companyName' },
    { text: 'Location Name', value: 'locationName' },
    { text: 'Visitor Name', value: 'visitorName' },
    { text: 'Purpose', value: 'purpose' },
  ];
  dialogTitle: string='';
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private formbuilder: FormBuilder,
    //private orgnotificationservice: OrganizationInterfaceService, 
    private notifybarservice: NotifyBarService,
    private dialogRef: MatDialogRef<NotificationTextComponent>) {
    this.data = data || {};
  }

  ngOnInit(): void {
    this.textform = this.formbuilder.group({
      variable: [''],
      notificationtext: ['']
    });
    this.NotificationForm = this.data.form;
   
    this.setTitleandText(this.data.type);

    this.isLoading = false;
  }
  setTitleandText(type: string) {
    switch (type) {
      case 'visitor':
        this.dialogTitle = 'Visitor Notification';
        this.textform.controls['notificationtext'].setValue(this.NotificationForm.controls['InvitationNotificationText'].value);
        break;
      case 'invitation':
        this.dialogTitle = 'Invitation Notification';
        this.textform.controls['notificationtext'].setValue(this.NotificationForm.controls['InvitationNotificationText'].value);
        break;
      case 'host':
        this.dialogTitle = 'Host Notification';
        this.textform.controls['notificationtext'].setValue(this.NotificationForm.controls['InvitationNotificationText'].value);
        break;

    }
  }
  setdefault() {
    this.setTitleandText(this.data.type);
  }
  settextvalue(type: string) {
    switch (type) {
      case 'visitor':
        this.NotificationForm.controls['InvitationNotificationText'].setValue(this.textform.controls['notificationtext'].value);
        break;
     
    }
  }
  submit() {
    this.isLoading = true;
    this.settextvalue(this.data.type);
    
      // this.orgnotificationservice.updateOrgNotificationText(this.NotificationForm.value, '')
      //   .pipe(finalize(() => { this.isLoading = false; this.dialogRef.close() })).subscribe((data) => {
      //     if (data) {
      //       this.notifybarservice.showsnackbar("Notification Text details updated successfully.");
      //     }
      //   });   
  }
  variablechange(event: any) {
    let text = this.textform.controls['notificationtext'].value;
    text = text ? text + ' ' + '{{' + event.value + '}}' : '{{' + event.value + '}}';
    this.textform.controls['notificationtext'].setValue(text);
  }
}
