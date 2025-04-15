import { Component, OnInit, Input } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-btn-loader',
  templateUrl: './btn-loader.component.html',
  styleUrls: ['./btn-loader.component.scss']
})
export class BtnLoaderComponent implements OnInit {

  @Input() IsLoading = false;
  @Input() size = 1.6;

  constructor() { }

  ngOnInit(): void {
  }

}
