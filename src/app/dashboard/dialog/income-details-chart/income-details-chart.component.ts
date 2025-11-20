import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '@app/shared/services/common.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { EChartsCoreOption } from 'echarts/core';
import { finalize, forkJoin } from 'rxjs';

@Component({
  selector: 'app-income-details-chart',
  standalone: false,
  templateUrl: './income-details-chart.component.html',
  styleUrl: './income-details-chart.component.scss'
})
export class IncomeDetailsChartComponent {
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
  totalactual:number=0;
  isexpenseLoading = true;
  expenseoption!: EChartsCoreOption;
  incomeoption!: EChartsCoreOption;
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
      incomeApi: this.projectService.getProjectIncomeDetailedSummary(this.apiObj, '')
    }).pipe(finalize(() => { this.isexpenseLoading = false })).subscribe((response: any) => {
      const prevMonth = this.commonService.getFinancialYearMonths(this.apiObj.year);
      const totalExpected = response.incomeApi.data
        .reduce((sum: number, x: any) => sum + (x.expected || 0), 0);
      this.totalactual = response.incomeApi.data
        .reduce((sum: number, x: any) => sum + (x.actual || 0), 0);
      const totalMargin = response.incomeApi.data
        .reduce((sum: number, x: any) => sum + ((x.actual - x.expected) || 0), 0);
      this.isEmpty = (totalExpected+this.totalactual) == 0;
      if (!this.isEmpty) {
        const monthsFY = this.commonService.getAllFinancialYearMonths(this.year);
        const incomeObj: any[] = [];
        const expectedData = response.incomeApi.data.map((x: any) => x.expected);
        const actualData = response.incomeApi.data.map((x: any) => x.actual);
        const balanceData = response.incomeApi.data.map((x: any) => x.actual - x.expected);

        const series = [
          {
            name: 'Expected',
            type: 'bar',
            label: {
              show: true,
              position: 'right',
              formatter: (params: any) => this.amountFormat(params.value)
            },
            stack: 'ExpectedStack',
            emphasis: {
              focus: 'series'
            },
            data: expectedData,
          },
          {
            name: 'Actual',
            type: 'bar',
            data: actualData,
            stack: 'Total',
            label: {
              show: true,
              position: 'right',
              formatter: (params: any) => this.amountFormat(params.value)
            },
            emphasis: {
              focus: 'series'
            },
          },
          {
            name: 'Margin',
            type: 'bar',
            data: balanceData,
            //smooth: true,
            stack: 'Total',
            itemStyle: {
              color: 'red'
            },
            label: {
              show: true,
              position: 'left',
              formatter: (params: any) => this.amountFormat(params.value)
            },
            emphasis: {
              focus: 'series'
            },
          }
        ];

        this.incomeoption = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            textStyle: {
              fontSize: 16,
              fontWeight: 'bold',
              color: '#000'
            },
            formatter: (name: string) => {
              if (name === 'Expected') return `${name} (${this.amountFormat(totalExpected) ?? 0})`;
              if (name === 'Actual') return `${name} (${this.amountFormat(this.totalactual) ?? 0})`;
              if (name === 'Margin') return `${name} (${this.amountFormat(totalMargin) ?? 0})`;
              return name;
            }
          },
          xAxis: [
            {
              type: 'value'
            }
          ],
          yAxis: [
            {
              type: 'category',
              axisTick: {
                show: false
              },
              data: prevMonth.map((m: any) =>
                this.monthNames[m.month - 1] + "-" + m.year
              )
            }
          ],

        };
        this.incomeoption['series'] = series;
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
                text: 'No Income Details are available at this moment !!.',
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
      this.apiObj.year = data.value.year;
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
  amountFormat(value: any) {
    if (value === 0) return '';
    if (value >= 10000000) return (value / 10000000).toFixed(1) + ' Cr.';
    if (value >= 1000000) return (value / 1000000).toFixed(1) + ' M';
    if (value >= 1000) return (value / 1000).toFixed(1) + ' K';
    return value;

  }
}
