import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '@app/shared/services/common.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { EChartsCoreOption } from 'echarts/core';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-expense-chart-view',
  standalone: false,
  templateUrl: './expense-chart-view.component.html',
  styleUrl: './expense-chart-view.component.scss'
})
export class ExpenseChartViewComponent {
  public data: any;
  finance: any = {};
  totalAmount: any;
  totalEntity: any;
  isEmpty = false;
  private monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  getDataObj: any;
  apiObj: any;
  isexpenseLoading = true;
  expenseoption!: EChartsCoreOption;
  emptyChartOptions: EChartsCoreOption = {};
  year: number = new Date().getFullYear();
  ECHART_COLORS = [
    '#5470C6',
    '#91CC75',
    '#FAC858',
    '#EE6666',
    '#73C0DE',
    '#3BA272',
    '#FC8452',
    '#9A60B4',
    '#EA7CCC',
    //'#190072','#00c45e','#00d9ff','#5656ff','#EE6666','#000'
  ];
  constructor(@Inject(MAT_DIALOG_DATA) data: any, private commonService: CommonService, private projectService: ProjectInterfaceService) {
    this.data = data || {};
  }
  ngOnInit() {
    this.data.element.expired = 23232321212;
    this.apiObj = this.data.element.pid == '' ? { datetime: new Date() } : { projectid: this.data.element.pid, datetime: new Date() };
    this.apiObj = { isfinancial: true, year: this.year, ...this.apiObj };
  }

  getExenseData() {
    this.isexpenseLoading = true;
    forkJoin({
      expenseAPI: this.projectService.getProjectExpenseSummary(this.apiObj, '')
    }).pipe(finalize(() => { this.isexpenseLoading = false })).subscribe((response: any) => {
      const prevMonth = this.commonService.getFinancialYearMonths(this.year);
      //this.calculateTotals(response.expenseAPI.data);
      this.totalAmount = response.expenseAPI.data.find((x: any) => x.type.toLowerCase() === 'total')?.totalamount;
      console.log(this.totalAmount);
      this.isEmpty = this.totalAmount == 0;
      if (!this.isEmpty) {
        this.expenseoption = {
          color: this.ECHART_COLORS,
          // legend: {
          //   orient: 'horizontal',
          //   bottom: '5%'
          // },
          title: {
            text: `Total: ${this.totalAmount}`,
            right: 10,
            top: '5%',
            textStyle: {
              fontSize: 18,
              fontWeight: 'bold',
              color: '#333'
            }
          },
          legend: {
            orient: 'vertical', // vertical for stacked view on right
            right: 0,
            top: 'middle',
            align: 'left',
            itemWidth: 14,
            itemHeight: 10,
            formatter: (name: string) => {
              const seriesList = (this.expenseoption as any)['series'] || [];
              const series = seriesList.find((s: any) => s.name === name);
              if (!series || !series.data) return name;

              const total = series.data.reduce((sum: number, val: number) => sum + val, 0);
              const formattedTotal =
                total >= 10000000 ? (total / 10000000).toFixed(2) + ' Cr' :
                  total >= 100000 ? (total / 100000).toFixed(2) + ' L' :
                    total >= 1000 ? (total / 1000).toFixed(2) + ' K' :
                      total.toFixed(0);

              return `{name|${name}}\n{value|${total.toFixed(2)}}\n{line|────────────}`;
            },
            textStyle: {
              rich: {
                value: { fontSize: 15, color: '#333', fontWeight: 600 },
                name: { fontSize: 12, color: '#666', padding: [0, 0, 5, 0] },
                line: { fontSize: 5, color: '#aaa' }
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // Use axis to trigger tooltip
              type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '15%',
            bottom: '0%',
            top: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'value',
            axisLabel: {
              formatter: function (value: number) {
                if (value >= 10000000) return value / 10000000 + 'Cr.';
                if (value >= 1000000) return value / 1000000 + 'M';
                if (value >= 1000) return value / 1000 + 'K';
                return value;
              }
            }
          },
          yAxis: {
            type: 'category',
            data: prevMonth.map((m: any) =>
              this.monthNames[m.month - 1] + "-" + m.year
            )
          },
          series: []
        };

        const monthsFY = this.commonService.getAllFinancialYearMonths(this.year);
        // Group data by type
        const groupedData = response.expenseAPI.data
          .filter((x: any) => x.type.toLowerCase() !== 'month' && x.type.toLowerCase() !== 'total')
          .reduce((acc: any, curr: any) => {
            if (!acc[curr.type]) acc[curr.type] = [];
            acc[curr.type].push(curr);
            return acc;
          }, {} as { [key: string]: typeof response.expenseAPI.data });

        // Build series for chart
        const expenseObj: any[] = [];
        Object.entries(groupedData).forEach(([type, items]) => {
          const typedItems = items as Array<any>; // Cast to array

          const dataPerMonth = monthsFY.map((m: any) => {
            const [month, year] = m.split('-').map(Number);
            const found = typedItems.filter(x => x.month === month && x.year === year);
            return found.reduce((sum, x) => sum + x.totalamount, 0);
          });
          expenseObj.push({
            name: type,
            type: 'bar',
            stack: 'total',
            barHeight: '20%',
            label: {
              show: true,
              formatter: function (params: any) {
                const value = params.value;
                if (value === 0) return '';
                if (value >= 10000000) return (value / 10000000).toFixed(1) + ' Cr.';
                if (value >= 1000000) return (value / 1000000).toFixed(1) + ' M';
                if (value >= 1000) return (value / 1000).toFixed(1) + ' K';
                return value;
              }
            },
            emphasis: { focus: 'series' },
            data: dataPerMonth
          });
        });
        this.expenseoption['series'] = expenseObj;
      }
      else {
        this.emptyChartOptions = {
          xAxis: { show: false },
          yAxis: { show: false },
          series: [],
          graphic: [
            {
              type: 'text',
              left: 'center',
              top: 'middle',
              style: {
                text: 'No Expense Details are available at this moment !!.',
                fill: '#999',
                font: '25px sans-serif',
                //opacity: 0.7
              }
            }
          ]
        };
      }
    });
  }
  onChartClick(event: any): void {
    console.log('Bar clicked:', event);
    console.log('Clicked value:', event.value);
    console.log('Clicked name:', event.name);
  }

  dateChange(data: any) {
    if (data) {
      this.apiObj.startdate = data.value.startDate;
      this.apiObj.enddate = data.value.endDate;
      this.year = data.value.year;
      this.getExenseData();
    }
  }
  projectChange(data: any = null) {
    if (data && data.value) {
      this.apiObj.projectid = data.value.id;
      this.getExenseData();
    }
  }
  calculateTotals(expensedata: any) {
    // Filter out 'Total' and 'Month' types
    const filteredData = expensedata.filter((item: any) => item.type !== 'Month');

    // Use a map to accumulate totals per type
    const totalsMap: { [key: string]: number } = {};

    filteredData.forEach((item: any) => {
      if (!totalsMap[item.type]) {
        totalsMap[item.type] = 0;
      }
      totalsMap[item.type] += item.totalamount;
    });

    // Convert to an array if you want
    const totalsArray = Object.keys(totalsMap).map(type => ({
      type,
      totalAmount: totalsMap[type]
    }));

    this.totalEntity = totalsArray;
  }
}
