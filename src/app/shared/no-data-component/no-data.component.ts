import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-no-data',
  standalone: false,
  templateUrl: './no-data.component.html',
  styleUrl: './no-data.component.scss'
})
export class NoDataComponent {

  @Input() message='No Data Found';
  @Input() icon="";
}
