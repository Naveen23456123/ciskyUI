import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from '@app/core/until-destroyed';
import { VehicleService } from '@app/vehicle-control/vehicle.service';
import moment from 'moment';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-view-vehicle-log',
  standalone: false,
  templateUrl: './view-vehicle-log.component.html',
  styleUrl: './view-vehicle-log.component.scss'
})
export class ViewVehicleLogComponent {
  isLoading = true;
  vehicleId:any='';
  todayDate= new Date();
  vehicle:any;
  logData:any[]=[];
  displayedColumns: string[] = ['serial','emps','useddate', 'initialreading','endreading','totalkm', 'fromtime', 'totime', 'purpose'];
  footerColumns: string[] = ['total', 'km','time','action'];
  dataSource!: MatTableDataSource<any[]>;
  monthandyear:any='';
  
  constructor(private vehicleService:VehicleService, private route:ActivatedRoute){     
      this.vehicleId = route.snapshot.paramMap.get('vehlogId');
      this.vehicle= window.history.state;
  }
  ngOnInit(){
   this.monthandyear=moment(new Date()).toISOString();
   this.getlogs();
    
  }
  ngOnDestroy(){}

  dateChange(data:any){
    this.isLoading=true;
    this.monthandyear=data.format();
    this.getlogs();
  }

  getlogs(){
    this.vehicleService.getVehicleViewLogDetails({dateTime:this.monthandyear,vehicleId:this.vehicleId},'')
    .pipe(untilDestroyed(this), finalize(()=> this.isLoading=false))
    .subscribe((response:any)=>{
      if(response && response.success){
        this.logData= response.data;
        this.dataSource = new MatTableDataSource(response.data);
      }
    })
  }
  getTotalKm() {
    let total= this.logData.map((t:any) => (t.endreading-t.initialreading)).reduce((acc, value) => acc + value, 0);    
    return total;
  }
}
