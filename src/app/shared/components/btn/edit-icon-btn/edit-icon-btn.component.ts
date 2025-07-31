import { Component, EventEmitter,Input,Output } from '@angular/core';

@Component({
  selector: 'app-edit-icon-btn',
  standalone: false,
  templateUrl: './edit-icon-btn.component.html',
  styleUrl: './edit-icon-btn.component.scss'
})
export class EditIconBtnComponent {
  @Input() toolTip:string='';
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  clicked(){
    this.clickEvent.emit();
  }
}
