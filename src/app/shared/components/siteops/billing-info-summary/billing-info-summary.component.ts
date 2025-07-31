import { ChangeDetectorRef, Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-billing-info-summary',
  standalone: false,
  templateUrl: './billing-info-summary.component.html',
  styleUrl: './billing-info-summary.component.scss'
})
export class BillingInfoSummaryComponent {
  summaryInfo:any={};
  @Input() summary:any;

 constructor(private cd: ChangeDetectorRef){}

  ngOnChanges() {
    if (this.summary && Array.isArray(this.summary)) {
      this.summaryInfo = this.summary.reduce((acc: any, curr: any) => {
        acc[curr.status] = curr.totalamount;
        return acc;
      }, {} as Record<string, number>);

      this.summaryInfo.total = this.summary.reduce(
        (sum: number, curr: any) => sum + curr.totalamount,
        0
      );
    }
    this.cd.markForCheck(); 
  }
}
