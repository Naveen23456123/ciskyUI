import { Component, Input, OnInit } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-status-icon',
  templateUrl: './status-icon.component.html',
  styleUrls: ['./status-icon.component.scss']
})
export class StatusIconComponent implements OnInit {
  @Input() success: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
