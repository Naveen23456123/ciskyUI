import { Component,Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from '@app/shared/services/common.service';
import { OfficeInterfaceService } from '@app/shared/services/external/office-interface.service';
import { VehicleInterfaceService } from '@app/shared/services/external/vehicle-interface.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-view-office-details',
  standalone: false,
  templateUrl: './view-office-details.component.html',
  styleUrl: './view-office-details.component.scss'
})
export class ViewOfficeDetailsComponent {
 ofcDetails:any;
  private dialogData:any;
  isLoading=true;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,private officeService:OfficeInterfaceService,
private commonService:CommonService){
    this.dialogData= data || {};
  }
  ngOnInit(){
    if(this.dialogData){
      this.officeService.getOfficeRentsById({id:this.dialogData.element.id},'').pipe(finalize(() => this.isLoading = false))
      .subscribe((response:any)=>{
        if(response && response.success){
          this.ofcDetails= response.data;
          let rent=this.commonService.getOfficeRentAmount(+this.ofcDetails.basicamount);
          this.ofcDetails = {
            ...this.ofcDetails,
            totalamount: rent.total,
            tds:rent.tds
          };
        }
      })
    }
  }
}
