import { Component } from '@angular/core';

@Component({
  selector: 'app-user-project-list',
  standalone: false,
  templateUrl: './user-project-list.component.html',
  styleUrl: './user-project-list.component.scss'
})
export class UserProjectListComponent {
selectedSubcategory: { vertical: string, sub: string } | null = null;

invoiceVerticals = [
  {
    label: 'Smart Cities/Urban',
    
  },
  {
    label: 'Env & Social',
    
  },
  {
    label: 'Survey & Testing',
    
  },
  {
    label: 'Finance & Advisory',
   
  },
  {
    label: 'Transport Infra',
    subcategories: [
      { label: 'Construction Provision' },
      { label: 'O&M Operation' },
      { label: 'Detailed Project Report' },
      { label: 'Feasibility Report' },
      { label: 'Safety COnsultant' }
    ]
  },{
    label: 'Railway & Metros',
    subcategories: [
       { label: 'Construction Provision' },
      { label: 'O&M Operation' },
      { label: 'Detailed Project Report' },
      { label: 'Feasibility Report' },
      { label: 'Safety COnsultant' }
    ]
  },
  {
    label: 'Water Resources',
    subcategories: [
       { label: 'Construction Provision' },
      { label: 'O&M Operation' },
      { label: 'Detailed Project Report' },
      { label: 'Feasibility Report' },
      { label: 'Safety COnsultant' }
    ]
  },
  {
    label: 'Tourism',
    subcategories: [
      { label: 'Local' },
      { label: 'International' }
    ]
  }
];

selectSubcategory(vertical: string, sub: string) {
  this.selectedSubcategory = { vertical, sub };
}

isSelected(vertical: string, sub: string): boolean {
  return this.selectedSubcategory?.vertical === vertical && this.selectedSubcategory?.sub === sub;
}
}
