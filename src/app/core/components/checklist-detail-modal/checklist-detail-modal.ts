import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Checklist } from '../../../models/checklist.model';

@Component({
  selector: 'app-checklist-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checklist-detail-modal.html',
  styleUrl: './checklist-detail-modal.css'
})
export class ChecklistDetailModal {
  @Input() checklist: Checklist | null = null;
  @Input() show: boolean = false;
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  getCriticidadeColor(criticidade: string): string {
    const colors = {
      'BAIXA': 'bg-blue-100 text-blue-800',
      'MEDIA': 'bg-yellow-100 text-yellow-800',
      'ALTA': 'bg-orange-100 text-orange-800',
      'CRITICA': 'bg-red-100 text-red-800'
    };
    return colors[criticidade as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  }
}
