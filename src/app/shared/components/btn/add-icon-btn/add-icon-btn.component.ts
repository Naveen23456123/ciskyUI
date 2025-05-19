import { Component, EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-add-icon-btn',
  standalone: false,
  templateUrl: './add-icon-btn.component.html',
  styleUrl: './add-icon-btn.component.scss'
})
export class AddIconBtnComponent {

  @Input() toolTip:string='';
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  clicked(){
    this.clickEvent.emit();
  }
}
