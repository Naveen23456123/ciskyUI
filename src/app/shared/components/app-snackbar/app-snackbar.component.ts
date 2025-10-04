import { Component, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-app-snackbar',
  standalone: false,
  templateUrl: './app-snackbar.component.html',
  styleUrl: './app-snackbar.component.scss'
})
export class AppSnackbarComponent {
  dataMessage:any;
  isError=false;
 constructor(@Inject(MAT_SNACK_BAR_DATA) public data: { message: string, iserror:boolean }) {
  this.dataMessage= data;
 }
}
