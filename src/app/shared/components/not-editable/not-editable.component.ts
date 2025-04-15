import { Component, OnInit } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-not-editable',
  templateUrl: './not-editable.component.html',
  styleUrls: ['./not-editable.component.scss']
})
export class NotEditableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
