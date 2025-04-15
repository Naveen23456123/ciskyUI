import { Component } from '@angular/core';

@Component({
  selector: 'app-contractor-list',
  standalone: false,
  templateUrl: './contractor-list.component.html',
  styleUrl: './contractor-list.component.scss'
})
export class ContractorListComponent {
  isLoading = true;
  ngOnInit()
  {
  this.isLoading=false;
  }
}
