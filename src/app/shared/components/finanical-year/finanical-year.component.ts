import { Component ,EventEmitter,Output} from '@angular/core';

@Component({
  selector: 'app-finanical-year',
  standalone: false,
  templateUrl: './finanical-year.component.html',
  styleUrl: './finanical-year.component.scss'
})
export class FinanicalYearComponent {
  financialYears: any[] = [];
  selectedYear!: number;
  @Output() onValueChange: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    const startYear = 2000;
    const currentYear = new Date().getFullYear();
    this.selectedYear= currentYear;
    for (let year = startYear; year <= currentYear; year++) {
      this.financialYears.push({cyear:year,nyear:`${year + 1}`});
    }

    // Optionally, set the default selected value to current financial year
    this.selectedYear = currentYear;
    this.onValueChange.emit({value:this.selectedYear})
  }
  yearChange(){
    this.onValueChange.emit({value:this.selectedYear})
  }
}
