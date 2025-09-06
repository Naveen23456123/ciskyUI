import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-file-icon',
  standalone: false,
  templateUrl: './file-icon.component.html',
  styleUrl: './file-icon.component.scss'
})
export class FileIconComponent {
  @Input() link=false;
  @Output() clickEvent: EventEmitter<any> = new EventEmitter();
  
  clicked(){
    this.clickEvent.emit();
  }
  ngOnInit(){
    
  }
}
