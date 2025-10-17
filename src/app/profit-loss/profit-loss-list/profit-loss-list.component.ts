import { Component, ViewChild, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { untilDestroyed } from '@app/core/until-destroyed';
import { PaymentService } from '@app/payments/payment.service';
import { ProfitLossCommulativeComponent } from '@app/shared/components/profit-and-loss/profit-loss-commulative/profit-loss-commulative.component';
import { ProfitLossInvListComponent } from '@app/shared/components/profit-and-loss/profit-loss-inv-list/profit-loss-inv-list.component';
import { DialogOperation, TOTAL_PROFIT_LOSS_HEADING } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { ProfitLossInterfaceService } from '@app/shared/services/external/profit-loss-interface.service';
import { HelperService } from '@app/shared/services/helper.service';
import { StateDataService } from '@app/shared/services/state-data.service';
import { SessionService } from '@app/shared/services/session.service';
import { delay, finalize, forkJoin, of, Subscription, switchMap, take } from 'rxjs';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';

export type Row = { type: 'group'; label: string } | {
  id?: string;
  type?: 'data' | 'totalinfo' | 'totalfooter' | 'spacer';
  name?: string;
  currentexpenditure?: number;
  previousexpenditure?: number;
  group?: string;
  isincome?: boolean;
  noteno?: string;
  order?: number;
};

@Component({
  selector: 'app-profit-loss-list',
  standalone: false,
  templateUrl: './profit-loss-list.component.html',
  styleUrl: './profit-loss-list.component.scss'
})
export class ProfitLossListComponent {
  itemsList: any[] = [];
  isLoading = true;
  pwdisplayedColumns: string[] = ['serial', 'projectid', 'name', 'monthly', 'commulative'];
  dataSource!: MatTableDataSource<any[]>;
  @ViewChild(MatPaginator) set matPaginator(paginator: MatPaginator) {
    this.dataSource.paginator = paginator;
  }
  @ViewChild(MatSort) sort!: MatSort;
  pagination: any;
  pageSize!: number;
  resultsLength!: number;
  detailsObj: any = { today: new Date() };
  scopes: any[] = [];

  private defaultdialogoptions: MatDialogConfig = {
    disableClose: false,
    data: {},
  };
  footerRow: string = 'totalfooter';
  constructor(private profitLossService: ProfitLossInterfaceService, private sessionService: SessionService,
    private commonService: CommonService, private paymentService: PaymentService, private helperService: HelperService,
    private stateDataService: StateDataService, private notifyBarService: NotifyBarService) {
    this.dataSource = new MatTableDataSource(this.itemsList);
  }
  ngOnInit() {
    this.subscription = this.stateDataService.stateDataSubject.subscribe((data: any) => {
      if (data.event == 'pfladd' && data.valid && data.value) {
        this.notifyBarService.showsnackbar(data.msg);
        this.stateDataService.stateDataSubject.next({});
      }
    });

    //this.isLoading=true;
    this.subscription = this.paymentService.getAllProjectPartialDetailsByOrdIg({}, '')
      .pipe(untilDestroyed(this), finalize(() => this.isLoading = false))
      .subscribe((response: any) => {
        if (response && response.success) {
          this.itemsList = response.data;
          this.updateTable(this.itemsList);
        }
      });

  }
  viewClick(data: any) {
    const config = this.defaultdialogoptions;
    config.minWidth = '60vw';
    config.minHeight = "10vh";
    config.data = {
      element: data
    };
    this.dialog.open(ProfitLossInvListComponent, config);
  }
  viewCommulative(data: any) {
    const config = this.defaultdialogoptions;
    config.minWidth = '80vw';
    config.minHeight = "90vh";
    config.data = {
      element: data
    };
    this.dialog.open(ProfitLossCommulativeComponent, config);
  }

  isGroup = (_: number, row: Row) => row.type === 'group';
  isData = (_: number, row: Row) => row.type === 'data';
  isTotalInfo = (_: number, row: Row) => row.type === 'totalinfo';
  isFooterInfo = (_: number, row: Row) => row.type === 'totalfooter';

  private subscription: Subscription = new Subscription();

  readonly dialog = inject(MatDialog);






  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  private updateTable(info: any) {
    this.itemsList = info;
    this.dataSource = new MatTableDataSource<any>(info);
    this.pagination = this.helperService.paginationOptionGeneration(info, info.length);
    this.pageSize = this.helperService.getPageSize();
    this.resultsLength = this.itemsList.length;
  }

  // financial year
  monthlyData: any[] = [];
  scopeRows: any[] = [];
  isfinancialLoading = true;
  isNoRecordForFY = false;
  getReport: any = {
    projectid: '',
    year: '',
  }
  months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

  // Rows with key name and per-month values
  rows = [
    {
      key: 'Amount',
      values: ['', '', '', '', '', '', '', '', '', '', '', ''] // one value per month
    },
    {
      key: 'Remarks',
      values: ['', '', '', '', '', '', '', '', '', '', '', '']
    }
  ];
  totaldisplayedColumns: string[] = ['srno', 'name', ...this.months, 'total'];

  yearChange(data: any) {
    if (data)
      this.getReport.year = +data.value;
    this.getReports();
    this.detailsObj.financialyear = (+data.value) + "-" + (+data.value + 1);
  }

  projectChange(data: any = null) {

    if (data && data.value) {
      this.getReport.projectid = data.value.id;
      this.detailsObj.projectname = data.value.projectshortname;
    }
    else
      this.getReport.projectid = '';
    this.getReports();

  }
  monthDataRecords: any[] = [];
  monthlyScopes: any[] = [];
  getReports() {
    this.isfinancialLoading = true;
    this.sessionService.profileLossScopeSubject$
      .pipe(
        take(1), // get the current snapshot
        switchMap((cachedScopes: any) => {
          let scopes$;
          if (cachedScopes && cachedScopes.length > 0) {
            scopes$ = of({ success: true, data: cachedScopes });
          } else {
            scopes$ = this.profitLossService.getProfitLossScopes({}, '');
          }
          return forkJoin({
            scopes: scopes$,
            financial: this.profitLossService.getProfitLossFinancial(this.getReport, '')
          });
        }),
        finalize(() => {
          this.isLoading = false;
          this.isfinancialLoading = false;
        })
      ).subscribe({
        next: (results: any) => {
          const { scopes, financial } = results;
          if (scopes && scopes.success) {
            this.scopes = scopes.data;
            this.sessionService.setProfileLossScope(scopes.data);
          }
          if (financial && financial.success) {
            this.monthlyScopes = financial.data;

            this.isNoRecordForFY = this.monthlyScopes.every(month => month.scopes.length === 0);

            this.monthDataRecords = [];
            for (let entry of this.monthlyScopes) {
              if (entry.scopes.length > 0) {
                this.monthDataRecords.push(entry.scopes.map((item: any) => ({
                  type: 'data',
                  name: item.name,
                  actualamount: this.commonService.roundValue(+item.total),
                  isadmin: item.isadmin,
                  ispersonal: item.ispersonal,
                  group: item.isincome ? 'Income' : 'Expense',
                  isincome: item.isincome,
                  groupkey: this.scopes.find(x => x.key == item.key)?.group,
                  month: entry.month
                })));
              }
            }

            console.log(this.monthDataRecords);
            this.scopeRows = this.buildGroupedRowsByMonth(this.monthDataRecords);

            this.detailsObj.percentage = this.commonService.netPercentage(
              this.detailsObj.totalincome,
              this.detailsObj.totalexpense,
              this.detailsObj.totalincome - this.detailsObj.totalexpense
            );
          }
        },
        error: (err: any) => {
          console.error('Error loading profit loss data', err);
          this.isLoading = false;
          this.isfinancialLoading = false;
        }
      });
  }
  rowTotal = 0;

  keyToGroup = TOTAL_PROFIT_LOSS_HEADING;
  buildGroupedRowsByMonth(data: any[]): Row[] {
    let result: Row[] = [];
    const months = ['Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'total'];

    this.rowTotal = 0;
    let expenseSumByMonth: any = {}; // holds expense totals before overhead
    let expenseGroupRomans: string[] = []; // holds roman numerals of expense groups (for label)

    this.keyToGroup.forEach((groupName, index) => {
      const sectionNumber = this.commonService.toRoman(index + 1);
      const sectionNumberLabel = `${sectionNumber} - `;
      const groupHeader:any = {
        type: 'group',
        label: `${sectionNumberLabel}${groupName.Name}`
      };

      const groupItems = data.flat().filter(d => d.groupkey == groupName.key);
      const nameSet = [...new Set(groupItems.map(x => x.name))];

      // ✅ If this is "Overhead Expenses", insert total of all previous expenses first
      if (groupName.key === 'OVERHEAD_DEDUCTIONS' && Object.keys(expenseSumByMonth).length > 0) {
        const romanLabel = expenseGroupRomans.join(' + '); // e.g., "II + III"
        const beforeOverheadRow: any = {
          type: 'totalinfo',
          name: `Total Expenses (${romanLabel})`,
          isincome: false
        };

        months.forEach((m) => {
          const totalVal = this.commonService.roundValue(expenseSumByMonth[m] || 0);
          beforeOverheadRow[m] = totalVal;
        });

        const totalSum = months
          .filter(m => m !== 'total')
          .reduce((sum, m) => sum + (expenseSumByMonth[m] || 0), 0);

        beforeOverheadRow['total'] = '(-)' + this.commonService.roundValue(totalSum);

        result.push({ type: 'spacer', name: ''});
        result.push(beforeOverheadRow);

        // Reset accumulators
        expenseSumByMonth = {};
        expenseGroupRomans = [];
      }

      // Add group header
      result.push(groupHeader);

      // Process rows...
      nameSet.forEach((itemName, i) => {
        const row: any = {
          type: 'data',
          srno: i + 1,
          name: itemName
        };

        this.rowTotal = 0;
        months.forEach((m, mi) => {
          if (m !== 'total') {
            const matching = groupItems.find(
              x => x.name === itemName && x.month === (mi < 9 ? mi + 4 : mi - 8)
            );
            const value = matching ? +matching.actualamount : 0;
            row[m] = matching ? matching.actualamount : '-';
            this.rowTotal += value;
          }
        });

        row['total'] = this.commonService.roundValue(this.rowTotal);
        result.push(row);
      });

      // Total per group
      this.rowTotal = 0;
      const totalRow: any = {
        type: 'totalinfo',
        name: 'Total ' + groupName.Name,
        isincome: groupName.isincome
      };

      months.forEach((m, mi) => {
        const monthlySum = groupItems
          .filter(x => x.month === (mi < 9 ? mi + 4 : mi - 8))
          .reduce((sum, x) => sum + (+x.actualamount || 0), 0);

        totalRow[m] = this.commonService.roundValue(monthlySum);
        if (m !== 'total') {
          this.rowTotal += this.commonService.roundValue(monthlySum);
        }
      });

      if (this.rowTotal !== 0)
        totalRow['total'] = (groupName.isincome ? '(+)' : '(-)') + this.commonService.roundValue(this.rowTotal);

      result.push(totalRow);

      // ✅ Only accumulate totals from expense groups before overhead
      if (!groupName.isincome && groupName.key !== 'OVERHEAD_DEDUCTIONS') {
        months.forEach(m => {
          if (m !== 'total') {
            expenseSumByMonth[m] = (expenseSumByMonth[m] || 0) + (totalRow[m] || 0);
          }
        });
        expenseGroupRomans.push(sectionNumber); // track its roman numeral for label
      }
    });




    const incomeTotalRow: any = {
      type: 'summary',
      name: 'Total Income'
    };

    const expenseTotalRow: any = {
      type: 'summary',
      name: 'Total Expense'
    };
    console.log(data.flat());
    // Step 3: Month-wise totals
    let incomeRowTotal = 0;
    let expenseRowTotal = 0;

    months.forEach((m, mi) => {
      console.log(m, mi);

      //const monthNum = (mi < 9 ? mi + 4 : mi - 8); // Apr = 4 ... Mar = 3
      const monthNum = (m === 'total') ? null : (mi < 9 ? mi + 4 : mi - 8); // Apr = 4 ... Mar = 3
      if (monthNum !== null) {
        const incomeSum = data.flat()
          .filter(x => x.month === monthNum && x.isincome === true)
          .reduce((sum, x) => sum + (+x.actualamount || 0), 0);

        const expenseSum = data.flat()
          .filter(x => x.month === monthNum && x.isincome === false)
          .reduce((sum, x) => sum + (+x.actualamount || 0), 0);

        const roundedIncome = this.commonService.roundValue(incomeSum);
        const roundedExpense = this.commonService.roundValue(expenseSum);

        incomeTotalRow[m] = roundedIncome;
        expenseTotalRow[m] = roundedExpense;

        incomeRowTotal += roundedIncome;
        expenseRowTotal += roundedExpense;
      }
    });
    incomeTotalRow['total'] = this.commonService.roundValue(incomeRowTotal);
    expenseTotalRow['total'] = this.commonService.roundValue(expenseRowTotal);

    // Step 4: Push summary rows
    result.push(expenseTotalRow);
    result.push(incomeTotalRow);
    result.push({
      type: 'spacer',
      name: '',
    });

    const netTotalRow: any = {
      type: 'netsummary',
      name: 'Profit / Loss',
      total: this.commonService.roundValue(incomeRowTotal - expenseRowTotal)
    };

    months.forEach((m) => {
      if (m !== 'total') {
        const netValue = (incomeTotalRow[m] || 0) - (expenseTotalRow[m] || 0);
        netTotalRow[m] = this.commonService.roundValue(netValue);
      }
    });

    result.push(netTotalRow);

    this.detailsObj.totalincome = this.commonService.roundValue(incomeRowTotal);
    this.detailsObj.totalexpense = this.commonService.roundValue(expenseRowTotal);
    return result;
  }

}
