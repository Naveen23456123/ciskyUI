import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CONSTANTS, Constants, SECTORS } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { AuthrizationInterfaceService } from '@app/shared/services/external/authrization-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StorageService } from '@app/shared/services/storage.service';
import { ValidatorService } from '@app/shared/services/validator.service';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-reset-password',
  standalone: false,
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  passform:any;
  token:string='';
  isBtnClicked=false;
  constructor(private formbuilder: FormBuilder, private router:Router, private route:ActivatedRoute,
    private authService:AuthrizationInterfaceService, private notifyBarService:NotifyBarService,
     private validatorService:ValidatorService
  ){}

  ngOnInit(){
    this.token = this.route.snapshot.paramMap.get('token') ?? '';
    this.passform= this.formbuilder.group({ 
      id:[''],
      password:['',Validators.required],
      confirmpassword:['',Validators.required],
      token:[]
    },
    {
      validators: this.validatorService.passwordMatchValidator('password', 'confirmpassword'),
    });
    this.passform.patchValue({
      token: this.token
    })
  }
  submit(){
    this.isBtnClicked=true;
    
    this.authService.resetPassword(this.passform.value, '')
    .pipe(finalize(() => {  this.isBtnClicked = false;}))
    .subscribe({
      next: (response: any) => {
        if (response && response.success && response.data) {
          this.notifyBarService.showsnackbar("Password Updated Successfully.");
           setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1000);
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


