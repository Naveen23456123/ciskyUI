import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthrizationInterfaceService } from '@app/shared/services/external/authrization-interface.service';
import { SessionService } from '@app/shared/services/session.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginform:any;
  constructor(private formbuilder: FormBuilder, private router:Router, private sessionService:SessionService,
    private authService:AuthrizationInterfaceService
  ){}

  ngOnInit(){
    this.loginform= this.formbuilder.group({ 
      id:[''],
      username:['Naveen.kumar12@gmail.com'],
      password:['password']
    });
  }
  submit(){
    console.log(this.loginform.value);
    this.sessionService.setOrganization({id:'680dd39c3682904bdd6e9aff'});
    this.sessionService.setUser({employeeid:'681f8c18b344c914ebfb58d7'});
    this.authService.login(this.loginform.value,'').subscribe((response:any)=>{
      if(response && response.success){
        localStorage.setItem('auth_token', response.data.token);
        this.router.navigate(['/dashboard']);
      }
    })
  
  }
}
