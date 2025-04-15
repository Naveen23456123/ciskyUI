import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  standalone:false,
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {

  @Input() page: string='';
  @Input() help: TemplateRef<any> | any;

  constructor(public matdialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialog() {
    this.matdialog.open(this.help);
  }

}
