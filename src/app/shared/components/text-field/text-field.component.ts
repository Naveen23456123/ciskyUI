import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Logger } from '@app/core/logger.service';
import { debounce, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';

const log= new Logger('TextField');
@Component({
  standalone:false,
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.scss']
})
export class TextFieldComponent implements OnInit {
  
  @Output() onValueChange:EventEmitter<string>= new EventEmitter();
  debouncer: Subject<string> = new Subject<string>();
  constructor() {

    this.debouncer.pipe(debounceTime(500)).subscribe((value)=>{
      this.onValueChange.emit(value);
    });
   }

  ngOnInit(): void {

  }

  change(data:any)
  {
    this.debouncer.next(data.target.value);
  }
}
