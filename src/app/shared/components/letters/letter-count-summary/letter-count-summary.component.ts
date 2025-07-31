import { ChangeDetectorRef, Component, Input } from '@angular/core';

@Component({
  selector: 'app-letter-count-summary',
  standalone: false,
  templateUrl: './letter-count-summary.component.html',
  styleUrl: './letter-count-summary.component.scss'
})
export class LetterCountSummaryComponent {

  summaryInfo:any={};
  @Input() statusCounts:any;

 constructor(private cd: ChangeDetectorRef){}

  ngOnChanges() {    
    this.cd.markForCheck();
    this.summaryInfo=this.statusCounts; 
  }
}
