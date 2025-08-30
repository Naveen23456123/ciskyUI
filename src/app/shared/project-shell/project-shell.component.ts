import { Component, ComponentRef, Input, QueryList, ViewChildren, ViewContainerRef } from '@angular/core';
import { SessionService } from '../services/session.service';
import { DynamicTabComponent } from '../models/constant.config';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-project-shell',
  standalone: false,
  templateUrl: './project-shell.component.html',
  styleUrl: './project-shell.component.scss'
})
export class ProjectShellComponent {
  selectedSubcategory: { vertical: string, sub: string } | null = null;
  //sectors:any[]=[];
  constructor(private sessionService:SessionService){

  }
 @Input() sectors: any[] = [];

    
  ngOnInit(){
    this.sessionService.orgSubject$.subscribe((response:any)=>{
      if(response){        
         //this.sectors= response.sectors;
        
      }
    })
  }
  selectSubcategory(vertical: string, sub: string) {
    this.selectedSubcategory = { vertical, sub };
  }

  isSelected(vertical: string, sub: string): boolean {
    return this.selectedSubcategory?.vertical === vertical && this.selectedSubcategory?.sub === sub;
  }
}
