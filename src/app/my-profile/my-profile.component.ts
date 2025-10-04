import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthrizationInterfaceService } from '@app/shared/services/external/authrization-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { ValidatorService } from '@app/shared/services/validator.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  standalone: false,
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {
  isBtnClicked=false;
  userObj:any;

  passwordForm: FormGroup;

  constructor(private fb: FormBuilder,private validatorService:ValidatorService,
    private authService:AuthrizationInterfaceService,private notifyBarService:NotifyBarService
  ) {
    this.passwordForm = this.fb.group({
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required]
    },
    {
      validators: this.validatorService.passwordMatchValidator('password', 'confirmPassword'),
    });
  }
  ngOnInit(){
    this.authService.getUserInfo({},'').subscribe((response:any)=>{
      if(response && response.success){
        this.userObj = response.data;
      }
    })
  }

  onChangePassword() {
  this.isBtnClicked=true;
  this.authService.changePassword(this.passwordForm.value, '')
    .pipe(finalize(() => {  this.isBtnClicked = false;}))
    .subscribe({
      next: (response: any) => {
        if (response && response.success && response.data) {
          this.notifyBarService.showsnackbar("Password Updated Successfully.");          
        } else {
          this.notifyBarService.showsnackbar(
            "Something went wrong, Please try again !!.",true
          );
        }
      },
      error: (err) => {     
        this.notifyBarService.showsnackbar("Something went wrong, Please try again !!.",true);
      }
    });
  }
}
