import { Component, EventEmitter, Input,Output } from '@angular/core';

@Component({
  selector: 'app-submit-load-btn',
  standalone: false,
  templateUrl: './submit-load-btn.component.html',
  styleUrl: './submit-load-btn.component.scss'
})
export class SubmitLoadBtnComponent {

  @Input() isValid=true;
  @Input() isClicked=false;
  @Input() text='Submit';
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
  
  clicked(){
    this.clickEvent.emit();
  }
}
