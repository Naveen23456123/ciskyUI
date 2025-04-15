import { Component, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-view-btn',
  standalone: false,
  templateUrl: './view-btn.component.html',
  styleUrl: './view-btn.component.scss'
})
export class ViewBtnComponent {

  @Output() clickEvent: EventEmitter<any> = new EventEmitter();

  clicked(){
    this.clickEvent.emit();
  }
}
