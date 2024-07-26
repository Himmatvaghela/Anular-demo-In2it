import { Component } from '@angular/core';
import {  ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-org-renderer',
  templateUrl: './org-renderer.component.html',
  styleUrls: ['./org-renderer.component.css']
})
export class OrgRendererComponent {

  constructor() { }


  fieldName!:string | undefined;
  params!: any;
  orgName!: string;
  contacName!:string;

  agInit(params: ICellRendererParams): void {
    this.orgName = params.data.organization;
    this.contacName=params.data.name;
    this.params=params;
    this.fieldName=params.colDef?.field
  }

  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.params=params;
    return true;
  }
  
  
  onOrgClick(){
    if(this.params.context.parent=='organizationComp'){
      this.params.context.component.setTab(this.params.data);
    }
    if(this.params.context.parent=='allContactComp'){
      this.params.context.component.setTab(this.params.data.orgId);
    }
  }
      
  onContactClick(){
    this.params.context.component.profileOpen(this.params.data);
  }

}
