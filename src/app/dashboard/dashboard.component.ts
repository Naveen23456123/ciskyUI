import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { ECharts, EChartsCoreOption } from 'echarts/core';
import { CommonService } from '../shared/services/common.service';
import { EmployeeInterfaceService } from '@app/shared/services/external/employee-interface.service';
import { EotInterfaceService } from '@app/shared/services/external/eot-interface.service';
import { CosInterfaceService } from '@app/shared/services/external/cos-interface.service';
import { ProjectInterfaceService } from '@app/shared/services/external/project-interface.service';
import { LetterInterfaceService } from '@app/shared/services/external/letter-interface.service';
import { finalize, forkJoin, Subject, takeUntil } from 'rxjs';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConsultentListSummaryComponent } from '@app/shared/components/consultant/consultent-list-summary/consultent-list-summary.component';
import { SessionService } from '@app/shared/services/session.service';
import { LetterInfoSummaryComponent } from '@app/shared/components/letters/letter-info-summary/letter-info-summary.component';
import { EotInfoSummaryComponent } from '@app/shared/components/eot/eot-info-summary/eot-info-summary.component';
import { CosInfoSummaryComponent } from '@app/shared/components/cos/cos-info-summary/cos-info-summary.component';
import { EmployeeInfoSummaryComponent } from '@app/shared/components/employee/employee-info-summary/employee-info-summary.component';
import * as echarts from 'echarts/core';
import { ExpenseChartViewComponent } from '@app/shared/components/expenses/expense-chart-view/expense-chart-view.component';
import moment from 'moment';
import { ProfitLossInterfaceService } from '@app/shared/services/external/profit-loss-interface.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  eotStatusData: any[] = [];
  cosStatusData: any[] = [];
  letterStatusData: any[] = [];
  letterTypeCountData: any[] = [];
  empTypeCounts: any[] = [];
  projectCountData: any[] = [];
  ourRoleData: any[] = [];
  isLoading = false;
  isletterStatusLoading = true;
  isLetterCountLoading = true;
  isEotLoading = true;
  isCosLoading = true;
  isEmpTypeLoading = true;
  isProjectCountLoading = true;
  isOurRoleLoading = true;
  isProjectDataLoading = true;
  isVehicleDataLoading = true;
  isfinanceLoading = true;
  isexpenseLoading = true;
  finance: any = {};
  activeProjectId: any = null;
  getDataObj: any = {};
  private monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  @ViewChild('eotChartInstance') eotChart: any;
  single: any[] = [
    {
      "name": "Germany",
      "value": 23
    },
    {
      "name": "USA",
      "value": 423
    },
    {
      "name": "France",
      "value": 23
    }
  ]
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
    //'#190072','#00c45e','#00d9ff','#5656ff','#e1ff00','#000'
  ];
  eotoption: any;
  cosoption: any;
  empTypeOption!: EChartsCoreOption;
  letterStatusOption: any;
  letterCountOptions: any;
  projectCountOption!: EChartsCoreOption;
  ourRoleOption!: EChartsCoreOption;
  incomeoptions!: EChartsCoreOption;
  expenseoption!: EChartsCoreOption;
  @ViewChild('chartRef') chartRef!: ElementRef;
  chartInstance: echarts.ECharts | null = null;
  view: [number, number] = [200, 220];
  readonly dialog = inject(MatDialog);
  private defaultdialogoptions: MatDialogConfig = {
    minWidth: '75vw',
    disableClose: false,
    data: {},
  };
  projects: any[] = [];
  vehicles: any[] = [];
  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#7aa3e5', '#CFC0BB', '#E44D25', '#a8385d', '#aae3f5']
  };
  private destroy$ = new Subject<void>();
  cardColor: string = '#000';
  constructor(private commonService: CommonService, private employeeService: EmployeeInterfaceService,
    private eotService: EotInterfaceService, private cosService: CosInterfaceService,
    private projectService: ProjectInterfaceService, private letterService: LetterInterfaceService,
    private vehicleService: VehicleInterfaceService, private sessionService: SessionService,
    private profitLossService: ProfitLossInterfaceService
  ) {
    Object.assign(this, { single: this.single });

  }

  ngOnInit() {
    // this.projects = [
    //   { id: 1, name: 'Jaiput Four Lane Highway', cost: this.commonService.costFormatter(8582723434) },
    //   { id: 2, name: 'Delhi Jaipur 8 lane highway', cost: this.commonService.costFormatter(2323232323) },
    //   { id: 3, name: 'Jaiput Four Lane Highway Jaiput Four Lane Highway', cost: this.commonService.costFormatter(23232323) }
    // ];
    this.vehicles = [
      { id: 1, projectcode: 'PJ-1234', name: 'HR10AL6756', km: 23 },
      { id: 2, projectcode: 'PJ-5367', name: 'DL10AL4236', km: 98 },
      { id: 3, projectcode: 'PJ-975445', name: 'RJ10AL9623', km: 56 }
    ];
    if (this.activeProjectId == null) {
      this.updateChartData();

    }
    this.sessionService.dashBoardProjectSubject$.pipe(takeUntil(this.destroy$)).subscribe((response: any) => {

      if (response && response.value)
        this.getDataObj.pid = response.value.id;
      else
        this.getDataObj.pid = '';
      this.activeProjectId = this.getDataObj.pid;
      this.updateChartData();
    })

  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  ngAfterViewInit() {
    this.chartInstance = echarts.init(this.chartRef.nativeElement);

  }
  updateChartData() {
    this.isletterStatusLoading = true;
    this.isLetterCountLoading = true;
    this.isEotLoading = true;
    this.isCosLoading = true;
    this.isEmpTypeLoading = true;
    this.isProjectCountLoading = true;
    this.isOurRoleLoading = true;
    this.isProjectDataLoading = true;
    this.isVehicleDataLoading = true;
    this.isfinanceLoading = true;
    this.isexpenseLoading = true;
    this.employeeService.geEmployeeTypeCount(this.getDataObj, '').pipe(finalize(() => this.isEmpTypeLoading = false)).subscribe((response: any) => {
      if (response && response.success) {
        this.empTypeCounts = response.data.map((element: any) => ({
          name: element.name,
          value: element.count,
          id: element.id
        }));
        this.empTypeOption = {
          title: {
            text: '',
            left: 'center',        // center the title
            top: 0,               // distance from top (you can adjust)
            textStyle: {
              fontSize: 18,
              fontWeight: 'bold'
            }
          },
          color: this.ECHART_COLORS,
          tooltip: {
            trigger: 'item'
          },
          legend: {
            bottom: 0
          },
          series: [
            {
              name: 'Count',
              type: 'pie',
              radius: ['45%', '65%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 3,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'outside',
                fontWeight: 'bold',
                fontSize: 15,
                formatter: '{c}',
              },

              labelLine: {
                show: true
              },
              data: this.empTypeCounts,
            }
          ],
          graphic: [
            {
              type: 'text',
              left: 'center',
              top: 'center',
              style: {
                text: `Total: ` + this.empTypeCounts.reduce((sum, item) => sum + item.value, 0),
                textAlign: 'center',
                fill: '#000',
                fontSize: 20,
                fontWeight: 'bold'
              }
            }
          ]
        };
      }
    })
    this.cosService.getCOSStatusCount(this.getDataObj, '').pipe(finalize(() => this.isCosLoading = false)).subscribe((response: any) => {
      if (response && response.success) {
        this.cosStatusData = response.data.map((element: any) => ({
          name: element.name,
          value: element.count,
          id: element.id
        }));
        this.cosoption = {

          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'horizontal',
            bottom: 'bottom'
          },
          color: this.ECHART_COLORS,
          series: [
            {
              name: 'Count',
              type: 'pie',
              radius: '60%',
              center: ['50%', '50%'],
              data: this.cosStatusData,
              label: {
                show: true,
                position: 'inside',
                fontWeight: 'bold',
                fontSize: 15,
                formatter: '{c}',
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
      }
    })
    this.eotService.geEOTStatusCount(this.getDataObj, '').pipe(finalize(() => this.isEotLoading = false)).subscribe((response: any) => {
      if (response && response.success) {
        this.eotStatusData = response.data.map((element: any) => ({
          name: element.name,
          value: element.count,
          id: element.id
        }));
        this.eotoption = {

          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'horizontal',
            bottom: 'bottom'
          },
          color: this.ECHART_COLORS,
          series: [
            {
              name: 'Count',
              type: 'pie',
              radius: '60%',
              center: ['50%', '50%'],
              data: this.eotStatusData,
              label: {
                show: true,
                position: 'inside',
                fontWeight: 'bold',
                fontSize: 15,
                formatter: ' {c}',
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
      }
    })
    this.letterService.getLetterStatusCountSummary(this.getDataObj, '').pipe(finalize(() => this.isletterStatusLoading = false)).subscribe((response: any) => {
      if (response && response.success) {
        this.letterStatusData = response.data.map((element: any) => ({
          name: element.name,
          value: element.count,
          id: element.id
        }));
        this.letterStatusOption = {
          title: {
            text: 'Letter Status',
            left: 'center',        // center the title
            top: 0,               // distance from top (you can adjust)
            textStyle: {
              fontSize: 18,
              fontWeight: 'bold'
            }
          },
          grid: {
            bottom: '10%',
            top: '10%',
            containLabel: true
          },
          tooltip: {
            trigger: 'item'
          },
          legend: {
            bottom: 0
          },
          series: [
            {
              name: 'status',
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: false,
              itemStyle: {
                borderRadius: 3,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'outside',
                fontWeight: 'bold',
                fontSize: 15,
                formatter: '{c}',
              },

              labelLine: {
                show: true
              },
              data: this.letterStatusData,
            }
          ],
          graphic: [
            {
              type: 'text',
              left: 'center',
              top: 'center',
              style: {
                text: `Total: ` + this.letterStatusData.reduce((sum, item) => sum + item.value, 0),
                textAlign: 'center',
                fill: '#000',
                fontSize: 20,
                fontWeight: 'bold'
              }
            }
          ]
        };
      }
    })
    this.letterService.getLetterTypeCountSummary(this.getDataObj, '').pipe(finalize(() => this.isLetterCountLoading = false)).subscribe((response: any) => {
      if (response && response.success) {
        this.letterTypeCountData = response.data;
        const names = response.data.map((x: any) => x.name);
        const consultant = response.data.map((x: any) => ({ value: x.count.consultant, id: x.id }));
        const contractor = response.data.map((x: any) => ({ value: x.count.contractor, id: x.id }));
        this.letterCountOptions = {
          title: {
            text: `Total Letter(s) : ` + this.letterTypeCountData.map(x => (x.count?.consultant || 0) + (x.count?.contractor || 0))
              .reduce((a, b) => a + b, 0),
            left: 'center',        // center the title
            top: 10,               // distance from top (you can adjust)
            textStyle: {
              fontSize: 18,
              fontWeight: 'bold'
            }
          },
          color: this.ECHART_COLORS,
          tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
          },
          legend: {
            data: ['Consultant', 'Contractor'],
            orient: 'horizontal',
            bottom: 'bottom',

          },
          xAxis: {
            type: 'category',
            data: names,
            axisLabel: { rotate: 30 }
          },
          yAxis: {
            type: 'value',

          },
          grid: {
            bottom: '10%', // Give enough space for the legend
            top: '15%',
            left: '3%',
            right: '4%',
            containLabel: true
          },
          series: [
            {
              name: 'Consultant',
              type: 'bar',
              //color:'#000',
              label: this.labelOption,
              data: consultant,
              emphasis: {
                focus: 'series'
              },
            },
            {
              name: 'Contractor',
              type: 'bar',
              label: this.labelOption,
              emphasis: {
                focus: 'series'
              },
              //data: [5,11,4,2,6,1,9]
              data: contractor
            }
          ]
        };
      }
    })
    this.projectService.getProjectCountSummary(this.getDataObj, '').pipe(finalize(() => this.isProjectCountLoading = false)).subscribe((response: any) => {
      if (response && response.success) {
        this.projectCountData = response.data.map((element: any) => ({
          name: element.name,
          value: element.count,
          id: element.id
        }));
        this.projectCountOption = {
          legend: {
            orient: 'horizontal',
            bottom: 0
          },
          color: this.ECHART_COLORS,
          title: {
            text: 'Project(s)',
            left: 'center',        // center the title
            top: 0,               // distance from top (you can adjust)
            textStyle: {
              fontSize: 18,
              fontWeight: 'bold'
            }
          },
          tooltip: {
            trigger: 'item'
          },

          series: [
            {
              name: 'Projects',
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['50%', '50%'],
              avoidLabelOverlap: true,
              top: 20,
              itemStyle: {
                borderRadius: 3,
                borderColor: '#fff',
                borderWidth: 2
              },
              label: {
                show: true,
                position: 'outside',
                fontWeight: 'bold',
                fontSize: 15,
                formatter: '{c}',
              },
              labelLine: {
                show: true,

              },
              data: this.projectCountData,
            }
          ],
          graphic: [
            {
              type: 'text',
              left: 'center',
              top: 'center',
              style: {
                text: `Total: ` + this.projectCountData.reduce((sum, item) => sum + item.value, 0),
                textAlign: 'center',
                fill: '#000',
                fontSize: 20,
                fontWeight: 'bold'
              }
            }
          ]
        };
      }
    });
    this.projectService.getProjectRoleCountSummary(this.getDataObj, '').pipe(finalize(() => this.isOurRoleLoading = false)).subscribe((response: any) => {
      if (response && response.success) {
        this.ourRoleData = response.data.map((element: any) => ({
          name: element.name,
          value: element.count,
          id: element.id
        }));
        this.ourRoleOption = {
          title: {
            text: 'Our Role',
            subtext: 'Status',
            left: 'center'
          },
          color: this.ECHART_COLORS,
          tooltip: {
            trigger: 'item'
          },
          legend: {
            orient: 'horizontal',
            //  bottom:'bottom',
            bottom: 0
          },
          series: [
            {
              name: 'Our Role',
              type: 'pie',
              radius: '75%',
              //radius: ['50%', '70%'],
              data: this.ourRoleData,
              label: {
                show: true,
                position: 'inside',
                fontWeight: 'bold',
                fontSize: 15,
                formatter: ' {c}',
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
      }
    });
    this.projectService.getProjectInfoSummary(this.getDataObj, '').pipe(finalize(() => this.isProjectDataLoading = false)).subscribe((response: any) => {
      if (response && response.success) {
        this.projects = response.data.map((element: any) => ({
          name: element.projectname,
          cost: this.commonService.costFormatter(element.cost),
          id: element.id,
          duration: element.duration
        }));
      }
    });
    this.vehicleService.getVehicleInfoSummary(this.getDataObj, '').pipe(finalize(() => this.isVehicleDataLoading = false)).subscribe((response: any) => {
      if (response && response.success) {
        this.vehicles = response.data;
      }
    });
    let apiObj = this.getDataObj.pid == '' ? { datetime: moment().startOf('month').utc() } : { projectid: this.getDataObj.pid, datetime: moment().startOf('month').utc() };
    const lastTwoMonths = this.commonService.getLastNMonthsEndISO(2);
    let summaryObj = {
      startdate: lastTwoMonths[1],
      enddate: lastTwoMonths[0],
      projectid: this.getDataObj.pid
    }
    const lastthreeMonths = this.commonService.getLastNMonthsEndISO(3);
    let expenseObj = {...apiObj,
      startdate: lastthreeMonths[2],
      enddate: lastthreeMonths[0]
    }
    forkJoin({
      incomeAPI: this.projectService.getProjectIncomeSummary(apiObj, ''),
      expenseAPI: this.projectService.getProjectExpenseSummary(expenseObj, ''),
      expenseSummaryAPI: this.profitLossService.getExpenseSummary(summaryObj, '')
    }).pipe(finalize(() => { this.isfinanceLoading = false; this.isexpenseLoading = false })).subscribe((response: any) => {
      const prevMonth = this.commonService.getLastMonths(8);
      if (response && response.incomeAPI.success) {
        //this.finance= response.data;
        this.finance.inc_latestMonth = this.monthNames[prevMonth[0].month - 1] + "-" + prevMonth[0].year;
        this.finance.inc_lastMonth = this.monthNames[prevMonth[1].month - 1] + "-" + prevMonth[1].year;
        this.finance.totalcost = response.incomeAPI.data.find((x: any) => x.month === -1)?.totalamount || 0;
        this.finance.totalincome = response.incomeAPI.data.find((x: any) => x.month === 0)?.totalamount || 0;
        this.finance.inc_latestTotal = response.incomeAPI.data.find((x: any) => x.month === prevMonth[0].month)?.totalamount || 0;
        this.finance.inc_lastTotal = response.incomeAPI.data.find((x: any) => x.month === prevMonth[1].month)?.totalamount || 0;

      }
      if (response && response.expenseSummaryAPI.success) {
        this.finance.expenseTotal = response.expenseSummaryAPI.data.find((x: any) => x.type === 'Total')?.totalamount || 0;
        this.finance.exp_latestMonth = this.monthNames[prevMonth[0].month - 1] + "-" + prevMonth[0].year;
        this.finance.exp_lastMonth = this.monthNames[prevMonth[1].month - 1] + "-" + prevMonth[1].year;
        this.finance.exp_latestTotal = response.expenseSummaryAPI.data.find((x: any) => x.type === 'Month' && x.month == prevMonth[0].month)?.totalamount || 0;
        this.finance.exp_lastTotal = response.expenseSummaryAPI.data.find((x: any) => x.type === 'Month' && (x.month == prevMonth[1].month))?.totalamount || 0;

      }
      //income and expense
      this.incomeoptions = {
        title: {
          text: `Finances`,
          left: 'center',        // center the title
          top: 0,               // distance from top (you can adjust)
          textStyle: {
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        color: this.ECHART_COLORS,
        grid: {
          bottom: '20%', // Give enough space for the legend
          top: '15%',
          left: '0%',
          right: '4%',
          containLabel: true
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        legend: {
          data: ['Income', 'Expense'],
          orient: 'horizontal',
          bottom: 0
        },
        xAxis: {
          type: 'category',
          data: [''],

        },
        yAxis: {
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
        series: [
          {
            name: 'Income',
            type: 'bar',
            //color:'#000',
            data: [this.finance.totalincome],
            center: ['50%', '50%'],
            emphasis: {
              focus: 'series'
            },
          },
          {
            name: 'Expense',
            type: 'bar',
            emphasis: {
              focus: 'series'
            },
            data: [this.finance.expenseTotal]
            // data: [
            //   { value: 342333, name: 'Mon', id: 'a1' },         
            // ]
          }
        ]
      };

      this.expenseoption = {
        // title: {
        //   text: 'Expense(s)',
        //   subtext: '',
        //   left: 'center'
        // },
        color: this.ECHART_COLORS,
        legend: {
          orient: 'horizontal',
          bottom: '5%'
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
          right: '4%',
          bottom: '20%',
          top: '2%',
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
          data: [this.monthNames[prevMonth[0].month - 1] + "-" + prevMonth[0].year,
          this.monthNames[prevMonth[1].month - 1] + "-" + prevMonth[1].year,
          this.monthNames[prevMonth[2].month - 1] + "-" + prevMonth[2].year]
        },
        series: []
      };
      const expenseObj: any[] = [];
      const groupedAndSorted = response.expenseAPI.data.filter((x: any) => x.type.toLowerCase() != 'month' && x.type.toLowerCase() != 'total').reduce((acc: any, curr: any) => {
        if (!acc[curr.type]) {
          acc[curr.type] = [];
        }
        acc[curr.type].push(curr);
        return acc;
      }, {} as { [key: string]: typeof response.expenseAPI.data });

      // Sort each group by month
      for (const type in groupedAndSorted) {
        groupedAndSorted[type].sort((a: any, b: any) => b.month - a.month);
      }

      Object.entries(groupedAndSorted).forEach(([type, items]) => {
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
          emphasis: {
            focus: 'series'
          },
          data: (items as Array<any>).map((item: any) => item.totalamount)
        });
      });
      console.log(expenseObj);
      this.expenseoption['series'] = expenseObj;
    });
  }
  addSeries() {
    if (this.chartInstance) {
      const newSeries = {
        name: 'New Line',
        type: 'line',
        data: [15, 25, 16, 30]
      };

      this.chartInstance.setOption({
        series: [
          // Keep existing series
          { name: 'Initial', type: 'bar', data: [5, 20, 36, 10] },
          newSeries
        ]
      });
    }
  }



  getPercentageChange(current: number, previous: number): { status: string, percent: number } {
    if (!previous || previous === 0) {
      return { status: 'N/A', percent: 0 }; // Avoid division by 0
    }

    const diff = current - previous;
    const percent = Math.abs((diff / previous) * 100);
    const status = diff > 0 ? 'up' : diff < 0 ? 'down' : 'nc';

    return { status, percent: +percent.toFixed(2) };
  }

  //letters
  labelOption = {
    show: true,
    rotate: 0,
    formatter: '{c}',
    fontSize: 16,
    rich: {
      name: {}
    }
  };





  onSelect(event: any) {
    console.log(event);
  }
  projectSearchObj: any = {};
  letterSearchObj: any = {};
  eotSearchObj: any = {};
  cosSearchObj: any = {};
  empSerachObj: any = {};
  onChartClick(event: any): void {
    console.log('Bar clicked:', event);
    console.log('Clicked value:', event.value);     // value (e.g. 120)
    console.log('Clicked name:', event.name);       // category name (e.g. Mon)
  }
  onProjectCountClick(event: any) {
    this.projectSearchObj.projectid = this.activeProjectId;
    this.projectSearchObj.typeid = event.data.id;
    this.getProjectList();
  }
  onOurRoleClick(event: any) {
    this.projectSearchObj.projectid = this.activeProjectId;
    this.projectSearchObj.typeid = '';
    this.projectSearchObj.roleid = event.data.id;
    this.getProjectList();
  }
  getProjectList() {
    //this.projectService.getProjectInfoSummary(this.projectSearchObj,'').pipe(finalize(()=> this.isLoading=false))

    this.defaultdialogoptions.data = {
      element: this.projectSearchObj
    };
    this.defaultdialogoptions.minWidth = '90vw';
    const dialogRef = this.dialog.open(ConsultentListSummaryComponent, this.defaultdialogoptions);
  }
  onLetterTypeClick(event: any) {

    this.sessionService.workOwnerSubject$.subscribe((response: any) => {
      if (response) {
        let relatedTo;
        if (event.seriesName.toLowerCase() == 'contractor')
          relatedTo = response.find((x: any) => x.name.toLowerCase() == 'contractor')?.id;
        else
          relatedTo = response.find((x: any) => x.name.toLowerCase() != 'contractor')?.id;

        this.letterSearchObj.relatedtoid = relatedTo;
        this.letterSearchObj.lettertypeid = event.data.id;
        this.letterSearchObj.ownername = event.seriesName;
        this.letterSearchObj.letterType = this.letterTypeCountData.find((x: any) => x.id == event.data.id)?.name;
        this.defaultdialogoptions.data = {
          element: this.letterSearchObj
        };
        this.defaultdialogoptions.minWidth = '90vw';
        const dialogRef = this.dialog.open(LetterInfoSummaryComponent, this.defaultdialogoptions);
      }
    });
  }
  onEOTClick(event: any) {
    this.eotSearchObj.projectid = this.activeProjectId;
    this.eotSearchObj.statusid = event.data.id;
    this.defaultdialogoptions.data = {
      element: this.eotSearchObj
    };
    this.defaultdialogoptions.minWidth = '80vw';
    const dialogRef = this.dialog.open(EotInfoSummaryComponent, this.defaultdialogoptions);
  }
  onCOSClick(event: any) {
    this.cosSearchObj.projectid = this.activeProjectId;
    this.cosSearchObj.statusid = event.data.id;

    this.defaultdialogoptions.data = {
      element: this.cosSearchObj
    };
    this.defaultdialogoptions.minWidth = '80vw';
    const dialogRef = this.dialog.open(CosInfoSummaryComponent, this.defaultdialogoptions);
  }
  onemptypeClick(event: any) {
    this.empSerachObj.projectid = this.activeProjectId;
    this.empSerachObj.id = event.data.id;
    this.empSerachObj.name = event.data.name;

    this.defaultdialogoptions.data = {
      element: this.empSerachObj
    };
    this.defaultdialogoptions.minWidth = '80vw';
    const dialogRef = this.dialog.open(EmployeeInfoSummaryComponent, this.defaultdialogoptions);
  }
  // This example requires ECharts v5.5.0 or later

  progressoption = {
    title: {
      text: 'Stacked Line'
    },
    color: this.ECHART_COLORS,
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Physical', 'Financial']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: 'Physical',
        type: 'line',
        smooth: true,
        data: [0, 7, 23, 35, 40, 70]
      },
      {
        name: 'Financial',
        type: 'line',
        smooth: true,
        data: [0, 9, 28, 33, 40, 60]
      }
    ]
  };
  expenseDetails() {
    this.defaultdialogoptions.data = {
      element: this.getDataObj
    };
    this.defaultdialogoptions.minWidth = '80vw';
    const dialogRef = this.dialog.open(ExpenseChartViewComponent, this.defaultdialogoptions);
  }

}
