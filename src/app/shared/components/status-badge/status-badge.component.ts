import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  standalone: false,
  templateUrl: './status-badge.component.html',
  styleUrl: './status-badge.component.scss'
})
export class StatusBadgeComponent {
  @Input() value: string | boolean = '';
  @Input() label: string = '';

  getBadgeClass(): string {
    switch (this.value.toString().toLocaleLowerCase()) {
      case 'success':
      case 'approved':
      case 'achieved':
      case 'active':
      case 'close':
        return 'badge text-bg-success';
      case 'warning':
      case 'pending':
      case 'not achieved':
        return 'badge text-bg-warning';
      case 'danger':
      case 'rejected':
      case 'reject':
      case 'Not Achieved':
        return 'badge text-bg-danger';
      default:
        return 'bg-secondary text-white';
    }
  }
}
