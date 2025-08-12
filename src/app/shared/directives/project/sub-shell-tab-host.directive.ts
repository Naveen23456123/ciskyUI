import { Directive, Input, ViewContainerRef } from '@angular/core';
import { ProjectSubshellComponent } from '@app/shared/components/projects/project-subshell/project-subshell.component';

@Directive({
   selector: '[appTabHost]',
  exportAs: 'appTabHost',
  standalone: false
})
export class SubShellTabHostDirective {

 @Input() tabIndex!: number;
 @Input() subsector!: any; 
  constructor(public viewContainerRef: ViewContainerRef, private host: ProjectSubshellComponent) {}

  ngAfterViewInit() {
    this.host.registerTabHost(this.tabIndex, this.viewContainerRef);
  }

}
