import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert-badge',
  standalone: false,
  templateUrl: './alert-badge.component.html',
  styleUrl: './alert-badge.component.scss'
})
export class AlertBadgeComponent {

  @Input() message='';
  @Input() isError=false;
  alertClass='';

  ngOnInit(){
    if(this.isError){
     this.alertClass='alert-danger';
    }
    else{
      this.alertClass='alert-success';
    }
  }
}
