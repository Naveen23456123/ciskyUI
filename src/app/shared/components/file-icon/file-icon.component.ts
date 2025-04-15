import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-file-icon',
  standalone: false,
  templateUrl: './file-icon.component.html',
  styleUrl: './file-icon.component.scss'
})
export class FileIconComponent {
  @Input() link:string='';
  
  openDoc(){
    window.open(this.link, "_blank");
  }
  ngOnInit(){
    
  }
}
