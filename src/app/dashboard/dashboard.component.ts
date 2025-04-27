import { Component } from '@angular/core';
import { EChartsCoreOption } from 'echarts/core';
import { CommonService } from '../shared/services/common.service';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  isLoading=false;
  single:any[]=[
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
  view: [number,number] = [200, 220];
  projects:any[]=[];
  vehicles:any[]=[];
  // options
  showLegend: boolean = true;
  showLabels: boolean = true;

  colorScheme = {
    domain: ['#5AA454', '#7aa3e5', '#CFC0BB', '#E44D25', '#a8385d', '#aae3f5']
  };
  chartData = [
    { value: 3, name: 'AE/IE' },
    { value: 2, name: 'O&M' },
    { value: 1, name: 'DPR' },
    { value: 1, name: 'Safety' }
  ];
  cardColor: string = '#000';
  constructor(private commonService:CommonService) {
    Object.assign(this, { single: this.single });
  
  }

 
  chartOption: EChartsCoreOption = {
    legend: {
      orient: 'horizontal',
     bottom:'bottom'
    },
    color:this.ECHART_COLORS,
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
        top:20,
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
        // emphasis: {
        //   label: {
        //     show: true,
        //     fontSize: 20,
        //     fontWeight: 'bold'
        //   }
        // },
        labelLine: {
          show: true
        },
        data: this.chartData,
      }
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: `Total: 3 `,
          textAlign: 'center',
          fill: '#000',
          fontSize: 20,
          fontWeight: 'bold'
        }
      }
    ]
  };
  ngOnInit(){
    this.projects = [
      { id: 1, name: 'Jaiput Four Lane Highway', cost: this.commonService.costFormatter(8582723434) },
      { id: 2, name: 'Delhi Jaipur 8 lane highway', cost: this.commonService.costFormatter(2323232323) },
      { id: 3, name: 'Jaiput Four Lane Highway Jaiput Four Lane Highway', cost: this.commonService.costFormatter(23232323) }
    ];
    this.vehicles = [
      { id: 1,projectcode: 'PJ-1234', name: 'HR10AL6756', km: 23 },
      { id: 2,projectcode: 'PJ-5367', name: 'DL10AL4236', km:98 },
      { id: 3,projectcode: 'PJ-975445', name: 'RJ10AL9623', km:56 }
    ];
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

  //income and expense
  incomeoptions: EChartsCoreOption  = {
    title: {
      text: `Finances`,
      left: 'center',        // center the title
      top: 0,               // distance from top (you can adjust)
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    color:this.ECHART_COLORS,
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
      data: ['Income','Expense'],
      orient:'horizontal',
      bottom:0
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
        data: [1342323003],
        center:['50%','50%'],
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
        data: [
          { value: 342333, name: 'Mon', id: 'a1' },         
        ]
      }
    ]
  };

  options: EChartsCoreOption  = {
    title: {
      text: `Total Letter(s) : 120`,
      left: 'center',        // center the title
      top: 10,               // distance from top (you can adjust)
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    color:this.ECHART_COLORS,
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: ['Consultant', 'Contractor'],
      orient:'horizontal',
      bottom:'bottom',
      
    },
    xAxis: {
      type: 'category',
      data: ['EOT', 'COS', 'MileStone','SiteProgress','Billing','Road Safety','Informative','Design','Contractual','MoM','Reports'],
      axisLabel:{rotate:30}
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
        data: [10,4,2,12,13,4,1,6,8,10,4],
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
        data: [
          { value: 5, name: 'Mon', id: 'a1' },
          { value: 11, name: 'Tue', id: 'a2' },
          { value: 4, name: 'Wed', id: 'a3' },
          { value: 2, name: 'Mon', id: 'a1' },
          { value: 8, name: 'Tue', id: 'a2' },
          { value: 15, name: 'Wed', id: 'a3' },
          { value: 20, name: 'Wed', id: 'a3' },
          { value: 2, name: 'Mon', id: 'a1' },
          { value: 8, name: 'Tue', id: 'a2' },
          { value: 15, name: 'Wed', id: 'a3' },
          { value: 20, name: 'Wed', id: 'a3' }
        ]
      }
    ]
  };
  
  onSelect(event:any) {
    console.log(event);
  }

  onChartClick(event: any): void {
    console.log('Bar clicked:', event);
    console.log('Clicked value:', event.value);     // value (e.g. 120)
    console.log('Clicked name:', event.name);       // category name (e.g. Mon)
  }

  //status
  letterStatusOption: EChartsCoreOption = {
    title: {
      text: 'Letter Status',
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
   legend:{
    bottom:0
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
        data: [
          { value: 3, name: 'Pending' },
          { value: 2, name: 'Close' }
        ],
      }
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: `Total: 3 `,
          textAlign: 'center',
          fill: '#000',
          fontSize: 20,
          fontWeight: 'bold'
        }
      }
    ]
  };

  eotoption = {
    
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
     bottom:'bottom'
    },
    color:this.ECHART_COLORS,
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        data: [
          { value: 1048, name: 'Pending' },
          { value: 735, name: 'Approved' },
          { value: 580, name: 'Rejected' },
          
        ],
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
  cosoption = {
   
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
     bottom:'bottom'
    },
    color:this.ECHART_COLORS,
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '60%',
        center: ['50%', '50%'],
        data: [
          { value: 1048, name: 'Pending' },
          { value: 735, name: 'Approved' },
          { value: 580, name: 'Rejected' },
          
        ],
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
  // This example requires ECharts v5.5.0 or later
  roleoption = {
    title: {
      text: 'Our Role',
      subtext: 'Status',
      left: 'center'
    },
    color:this.ECHART_COLORS,
    tooltip: {
      trigger: 'item'
    },
    legend: {
      orient: 'horizontal',
     bottom:'bottom'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '75%',
        //radius: ['50%', '70%'],
        data: [
          { value: 20, name: 'Active' },
          { value: 4, name: 'Partial' },
          { value: 10, name: 'Silent' },
          
        ],
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
  expenseoption = {
    title: {
      text: 'Expense(s)',
      subtext: '',
      left: 'center'
    },
    color:this.ECHART_COLORS,
    legend: {
      orient: 'horizontal',
     bottom:'5%'
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
      containLabel: true
    },
    xAxis: {
      type: 'value'
    },
    yAxis: {
      type: 'category',
      data: ['April', 'May', 'June']
    },
    series: [
      {
        name: 'Salary',
        type: 'bar',
        stack: 'total',
        barHeight: '20%',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [320, 302, 301, 334, 390, 330, 320]
      },
      {
        name: 'Office Rent',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [120, 132, 101, 134, 90, 230, 210]
      },
      {
        name: 'Vehilce',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [220, 182, 191, 234, 290, 330, 310]
      },
      {
        name: 'Imprest',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [150, 212, 201, 154, 190, 330, 410]
      },
      {
        name: 'Travel',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320]
      },
      {
        name: 'Misc.',
        type: 'bar',
        stack: 'total',
        label: {
          show: true
        },
        emphasis: {
          focus: 'series'
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320]
      }
    ]
  };
  progressoption = {
    title: {
      text: 'Stacked Line'
    },
    color:this.ECHART_COLORS,
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['Physical','Financial']
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
        data: [0,7, 23, 35, 40,70]
      },
      {
        name: 'Financial',
        type: 'line',
        smooth: true,
        data: [0,9, 28, 33, 40,60]
      }
    ]
  };
  employeeOption: EChartsCoreOption = {
    title: {
      text: '',
      left: 'center',        // center the title
      top: 0,               // distance from top (you can adjust)
      textStyle: {
        fontSize: 18,
        fontWeight: 'bold'
      }
    },
    color:this.ECHART_COLORS,
    tooltip: {
      trigger: 'item'
    },
   legend:{
    bottom:0
   },
    series: [
      {
        name: 'status',
        type: 'pie',
        radius: ['40%', '60%'],
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
        data: [
          { value: 3, name: 'Key Professional' },
          { value: 2, name: 'Support Satff' },
          { value: 1, name: 'Sub Professional' }
        ],
      }
    ],
    graphic: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: `Total: 3 `,
          textAlign: 'center',
          fill: '#000',
          fontSize: 20,
          fontWeight: 'bold'
        }
      }
    ]
  };
}
