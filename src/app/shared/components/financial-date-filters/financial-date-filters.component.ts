import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-financial-date-filters',
  standalone: false,
  templateUrl: './financial-date-filters.component.html',
  styleUrl: './financial-date-filters.component.scss'
})
export class FinancialDateFiltersComponent {
  selectedType: 'financial' | 'quarterly' | 'custom' = 'financial';
  @Input() showFinancial: boolean = true;
  @Input() showQuarterly: boolean = true;
  @Input() showCustom: boolean = true;
  @Input() initialEmit: boolean = false;
  financialYears: { label: string; startYear: number; endYear: number }[] = [];
  quarters: { label: string; start: Date; end: Date }[] = [];

  selectedFinancialYear: any;
  selectedQuarter: any;
  @Output() onValueChange: EventEmitter<any> = new EventEmitter();
  customStartDate: Date | null = null;
  customEndDate: Date | null = null;

  ngOnInit(): void {
    this.generateFinancialYears();
    this.setDefaultFinancialYear();

    // Auto-select default type based on visible flags
    if (this.showFinancial) this.selectedType = 'financial';
    else if (this.showQuarterly) this.selectedType = 'quarterly';
    else if (this.showCustom) this.selectedType = 'custom';
    if(this.initialEmit)
       this.emitDateRange();
  }

  /** Generate all financial years from 2000 till current */
  generateFinancialYears() {
    const startYear = 2000;
    const currentYear = new Date().getFullYear();

    for (let year = startYear; year <= currentYear; year++) {
      const nextYear = year + 1;
      this.financialYears.push({
        label: `${year}-${nextYear}`,
        startYear: year,
        endYear: nextYear
      });
    }
    this.financialYears.reverse();
  }

  /** Automatically detect current financial year */
  setDefaultFinancialYear() {
    const today = new Date();
    const year = today.getMonth() + 1 >= 4 ? today.getFullYear() : today.getFullYear() - 1;
    this.selectedFinancialYear = this.financialYears.find(fy => fy.startYear === year);
    this.onFinancialYearChange();
  }

  /** Reset selections on type change */
  onTypeChange() {
    this.selectedFinancialYear = null;
    this.selectedQuarter = null;
    this.customStartDate = null;
    this.customEndDate = null;
    this.quarters = [];
  }

  /** When user selects financial year, load its quarters */
  onFinancialYearChange() {
    if (!this.selectedFinancialYear) return;

    const fy = this.selectedFinancialYear;
    this.quarters = [
      {
        label: `Q1 (Apr–Jun ${fy.startYear})`,
        start: new Date(fy.startYear, 3, 1), // Apr 1
        end: new Date(Date.UTC(fy.startYear, 5, 30))   // Jun 30
      },
      {
        label: `Q2 (Jul–Sep ${fy.startYear})`,
        start: new Date(fy.startYear, 6, 1), // Jul 1
        end: new Date(Date.UTC(fy.startYear, 8, 30))   // Sep 30
      },
      {
        label: `Q3 (Oct–Dec ${fy.startYear})`,
        start: new Date(fy.startYear, 9, 1),  // Oct 1
        end: new Date(Date.UTC(fy.startYear, 11, 31))   // Dec 31
      },
      {
        label: `Q4 (Jan–Mar ${fy.endYear})`,
        start: new Date(fy.endYear, 0, 1),   // Jan 1
        end: new Date(Date.UTC(fy.endYear, 2, 31))     // Mar 31
      }
    ];
  }

  /** When user selects quarter, set the date range */
  onQuarterChange() {
    if (this.selectedQuarter) {
      this.customStartDate = this.selectedQuarter.start;
      this.customEndDate = this.selectedQuarter.end;
    }
  }

  /** Get final selected payload */
  getSelectedDateRange() {
    let payload: any = {};

    if (this.selectedType === 'financial' && this.selectedFinancialYear) {
      const fy = this.getFinancialYearCustomISO(this.selectedFinancialYear.startYear);
      payload = {
        type: 'financial',
        startDate: fy.startDateISO,
        endDate: fy.endDateISO,
        year: this.selectedFinancialYear.startYear
      };
    } else if (this.selectedType === 'quarterly' && this.selectedQuarter) {
      payload = {
        type: 'quarterly',
        startDate: this.selectedQuarter.start.toISOString(),
        endDate: this.subtractOneMonth(this.selectedQuarter.end).toISOString(),
        year: this.selectedFinancialYear.startYear
      };
    } else if (this.selectedType === 'custom' && this.customStartDate && this.customEndDate) {
      payload = {
        type: 'custom',
        startDate: this.customStartDate.toISOString(),
        endDate: this.customEndDate.toISOString(),
        year: this.selectedFinancialYear.startYear
      };
    }

    console.log('Selected Filter:', payload);
    return payload;
  }
  getFinancialYearCustomISO(selectedYear: number) {
    // Start date = 31st March of the selected year
    const startDate = new Date(Date.UTC(selectedYear, 2, 31, 0, 0, 0)); // March = 2
    // End date = last day of February of next year
    const endDate = new Date(Date.UTC(selectedYear + 1, 1, 28, 0, 0, 0)); // Feb = 1

    return {
      startDateISO: startDate.toISOString(),
      endDateISO: endDate.toISOString()
    };
  }

  subtractOneMonth(date: Date): Date {
    const newDate = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth() - 1, date.getUTCDate(), 0, 0, 0));

    // Adjust for cases like March 31 → February (which has fewer days)
    if (newDate.getUTCDate() !== date.getUTCDate()) {
      // Set to the last valid day of the new month
      newDate.setUTCDate(0);
    }

    return newDate;
  }
  /** Called on Apply button */
  emitDateRange() {
    const result = this.getSelectedDateRange();
    this.onValueChange.emit({ value: result })
    // send to backend or emit event
  }
}
