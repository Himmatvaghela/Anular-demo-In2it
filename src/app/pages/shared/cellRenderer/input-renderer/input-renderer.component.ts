import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-input-renderer',
  templateUrl: './input-renderer.component.html',
  styleUrls: ['./input-renderer.component.css']
})
export class InputRendererComponent {


  constructor() {
  }

  params:any;
  agInit(params: ICellRendererParams): void {
    this.params=params;
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.params=params;
    return true;
  }


}
