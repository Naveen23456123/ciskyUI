import { Component ,EventEmitter,Input,Output} from '@angular/core';

@Component({
  selector: 'app-cancel-btn',
  standalone: false,
  templateUrl: './app-cancel-btn.component.html',
  styleUrl: './app-cancel-btn.component.scss'
})
export class AppCancelBtnComponent {
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
  
  clicked(){
    this.clickEvent.emit();
  }
}
