import { Component, OnInit, Input } from '@angular/core';

@Component({
  standalone:false,
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() IsLoading = false;
  @Input() size = 1.5;
  @Input() message: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
