import { Component, Input, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface PieData {
  label: string;
  value: number;
  color: string;
}

interface PieSegment extends PieData {
  percentage: number;
  path: string;
}

@Component({
  selector: 'app-pie-chart',
  imports: [CommonModule],
  templateUrl: './pie-chart.html',
  styleUrl: './pie-chart.css',
})
export class PieChart {
  @Input() set data(value: PieData[]) {
    this._data.set(value);
  }
  @Input() size: number = 200;

  private _data = signal<PieData[]>([]);

  segments = computed(() => {
    const data = this._data();
    
    if (!data || data.length === 0) {
      return [];
    }

    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    if (total === 0) {
      return [];
    }

    let currentAngle = 0;
    const segments: PieSegment[] = [];

    data.forEach(item => {
      const percentage = (item.value / total) * 100;
      const sliceAngle = (item.value / total) * 360;

      if (item.value > 0) {
        const path = this.createPieSlice(currentAngle, sliceAngle);
        segments.push({
          ...item,
          percentage: Math.round(percentage),
          path
        });
        currentAngle += sliceAngle;
      }
    });

    return segments;
  });

  private createPieSlice(startAngle: number, sliceAngle: number): string {
    const radius = 80;
    const centerX = 100;
    const centerY = 100;

    if (sliceAngle >= 360) {
      return `M ${centerX} ${centerY} m -${radius}, 0 a ${radius},${radius} 0 1,0 ${radius * 2},0 a ${radius},${radius} 0 1,0 -${radius * 2},0`;
    }

    const startRad = (startAngle - 90) * Math.PI / 180;
    const endRad = (startAngle + sliceAngle - 90) * Math.PI / 180;

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArc = sliceAngle > 180 ? 1 : 0;

    const path = [
      `M ${centerX} ${centerY}`,
      `L ${x1} ${y1}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
      `Z`
    ].join(' ');

    return path;
  }
}
