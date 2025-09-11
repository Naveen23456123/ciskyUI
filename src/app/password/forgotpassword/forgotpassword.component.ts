import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANTS, Constants, SECTORS } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { AuthrizationInterfaceService } from '@app/shared/services/external/authrization-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StorageService } from '@app/shared/services/storage.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-forgotpassword',
  standalone: false,
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {
passform:any;
  isBtnClicked=false;
  isForgotPassword=false;
  constructor(private formbuilder: FormBuilder, private router:Router, private sessionService:SessionService,
    private authService:AuthrizationInterfaceService, private notifyBarService:NotifyBarService,
    private storageService:StorageService, private commonService:CommonService
  ){}

  ngOnInit(){
    this.isForgotPassword=false;
    this.passform= this.formbuilder.group({ 
      id:[''],
      email:['Naveen.kumar161290@gmail.com',Validators.required]
    });
  }
  submit(){
    console.log('submit');
    this.isBtnClicked=true;
    
    this.authService.forgotPassword(this.passform.value, '')
    .pipe(finalize(() => {  this.isBtnClicked = false;}))
    .subscribe({
      next: (response: any) => {
        if (response && response.success) {
         
          //this.router.navigate(['/dashboard']);
        } else {
          this.notifyBarService.showsnackbar(
            "Something went wrong, Please try again !!."
          );
        }
      },
      error: (err) => {     
        this.notifyBarService.showsnackbar("Something went wrong, Please try again !!.");
      }
    });
    
  }
  onLogin(){
    this.router.navigate(['/login']);
  }
}

