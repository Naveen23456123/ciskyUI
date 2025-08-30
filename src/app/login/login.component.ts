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
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginform:any;
  isBtnClicked=false;
  constructor(private formbuilder: FormBuilder, private router:Router, private sessionService:SessionService,
    private authService:AuthrizationInterfaceService, private notifyBarService:NotifyBarService,
    private storageService:StorageService, private commonService:CommonService
  ){}

  ngOnInit(){
    this.loginform= this.formbuilder.group({ 
      id:[''],
      username:['Naveen.kumar12@gmail.com',Validators.required],
      password:['password',Validators.required]
    });
  }
  submit(){
    console.log('submit');
    this.isBtnClicked=true;
    //this.sessionService.setOrganization({id:'680dd39c3682904bdd6e9aff'});
    //this.sessionService.setUser({employeeid:'681f8c18b344c914ebfb58d7'});
    // this.authService.login(this.loginform.value,'').pipe(finalize(()=>{ this.isBtnClicked=false})).subscribe((response:any)=>{
    //   console.log(response);
    //   if(response && response.success){
    //     localStorage.setItem('auth_token', response.data.token);
    //     this.sessionService.setOrganization({id:response.data.orgid,sectors:response.data.sectors});
    //      this.sessionService.setUser({employeeid:response.data.userid,modules:response.data.modules  });
    //     this.router.navigate(['/dashboard']);
    //   }
    //   else{
    //     this.notifyBarService.showsnackbar("Please provide correct Email Id and Password");
    //   }
    // })
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
          this.router.navigate(['/dashboard']);
        } else {
          this.notifyBarService.showsnackbar(
            "Please provide valid Email Id and Password."
          );
        }
      },
      error: (err) => {     
        this.notifyBarService.showsnackbar("Please provide valid Email Id and Password."
        );
      }
    });
    
    }
}
