import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CONSTANTS, Constants, SECTORS } from '@app/shared/models/constant.config';
import { CommonService } from '@app/shared/services/common.service';
import { AuthrizationInterfaceService } from '@app/shared/services/external/authrization-interface.service';
import { NotifyBarService } from '@app/shared/services/notify-bar.service';
import { SessionService } from '@app/shared/services/session.service';
import { StorageService } from '@app/shared/services/storage.service';
import { TokenService } from '@app/shared/services/token.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginform:any;
  isBtnClicked=false;
  isForgotPassword=false;
  constructor(private formbuilder: FormBuilder, private router:Router, private sessionService:SessionService,
    private authService:AuthrizationInterfaceService, private notifyBarService:NotifyBarService,
    private storageService:StorageService, private commonService:CommonService,
    private tokenService:TokenService
  ){}

  ngOnInit(){
    this.isForgotPassword=false;
    this.loginform= this.formbuilder.group({ 
      id:[''],
      username:['Naveen.kumar161290@gmail.com',Validators.required],
      password:['password',Validators.required]
    });
  }
  submit(){
    this.isBtnClicked=true;
    this.authService.login(this.loginform.value, '')
    .pipe(finalize(() => {  this.isBtnClicked = false;}))
    .subscribe({
      next: (response: any) => {
        if (response && response.success) {
          this.storageService.set(Constants.AuthToken, response.data.token);
          this.sessionService.setOrganization({
            id: response.data.orgid,
            sectors: response.data.sectors
          });
          this.commonService.updateSectorIds(SECTORS,response.data.sectors);
          this.sessionService.setUser({
            employeeid: response.data.userid,
            modules: response.data.modules
          });
          this.sessionService.setUserPriviliges(JSON.parse(this.tokenService.getClaim("response"))?.Modules);
          this.router.navigate(['/dashboard']);
        } else {
          this.notifyBarService.showsnackbar(
            "Please provide valid Email Id and Password.",true
          );
        }
      },
      error: (err) => {     
        this.notifyBarService.showsnackbar("Please provide valid Email Id and Password.",true
        );
      }
    });
    
  }
  onForgotPassword(){
    this.router.navigate(['/forgot-password']);
  }
}
