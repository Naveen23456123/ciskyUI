import { Component,EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-delete-btn',
  standalone: false,
  templateUrl: './delete-btn.component.html',
  styleUrl: './delete-btn.component.scss'
})
export class DeleteBtnComponent {
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
  
  clicked(){
    this.clickEvent.emit();
  }
}
