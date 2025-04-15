import { Component ,EventEmitter,Input,Output} from '@angular/core';

@Component({
  selector: 'app-edit-btn',
  standalone: false,
  templateUrl: './edit-btn.component.html',
  styleUrl: './edit-btn.component.scss'
})
export class EditBtnComponent {
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
  
  clicked(){
    this.clickEvent.emit();
  }
}
