import { Component, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-document-manage-btn',
  standalone: false,
  templateUrl: './document-manage-btn.component.html',
  styleUrl: './document-manage-btn.component.scss'
})
export class DocumentManageBtnComponent {
 @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  clicked(){
    this.clickEvent.emit();
  }
}
