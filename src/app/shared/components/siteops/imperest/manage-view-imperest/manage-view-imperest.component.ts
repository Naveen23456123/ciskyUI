import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImperestInterfaceService } from '@app/shared/services/external/imperest-interface.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-manage-view-imperest',
  standalone: false,
  templateUrl: './manage-view-imperest.component.html',
  styleUrl: './manage-view-imperest.component.scss'
})
export class ManageViewImperestComponent {
  impDetails:any;
  private dialogData:any;
  isLoading=true;
  constructor(@Inject(MAT_DIALOG_DATA) data: any,private imperestService:ImperestInterfaceService){
    this.dialogData= data || {};
  }
  ngOnInit(){
    if(this.dialogData){
      this.imperestService.getImperestDetailById({id:this.dialogData.element.id},'')
      .pipe(finalize(() => this.isLoading = false))
      .subscribe((response:any)=>{
        if(response && response.success){
          this.impDetails= response.data;
          console.log(this.impDetails);
        }
      })
    }
  }
}
