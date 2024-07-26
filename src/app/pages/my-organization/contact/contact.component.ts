import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { contactsDetails, organizationData } from 'src/app/interface/server';
import { OrgRendererComponent } from '../../shared/cellRenderer/org-renderer/org-renderer.component';




@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit, OnChanges {

  constructor() { }

  @Input()orgData!:organizationData;

  form_width:number=0;
  contactData:contactsDetails={
    id: '',
    name: '',
    email: '',
    phone_code: '',
    phone: '',
    other: [],
    role: '',
    additionalRole: ''
  }

  dataToShow:organizationData={
    id: '',
    organization: '',
    type: '',
    industry: '',
    onboarding: '',
    related_orgs: [],
    products: [],
    org_SPOC: '',
    description: '',
    cluster: '',
    tier: '',
    address: '',
    contacts: []
  };

  gridOptions!:GridOptions;

  colDefs:ColDef[]=[
    {headerName:'Name',field:'name',
    cellRenderer: OrgRendererComponent,
    // cellRendererParams: {
    //   onClick: this.goToProfileShow.bind(this),
    // },
  },
    {headerName:'Role',field:'role'},
    {headerName:'Email',field:'email'},
    {headerName:'Phone',field:'phone'},
  ]

  // goToProfileShow(params:any){
  //   this.profileOpen(params.data)
  // }

  ngOnInit(): void {
    this.gridOptions={
      context:{component:this,parent:'contactComp'}
    }
    this.dataToShow=this.orgData;
  }

  profileOpen(contData:contactsDetails){
    this.form_width=35;
    this.contactData=contData
  }

  ngOnChanges(): void {
    this.dataToShow=this.orgData
    this.form_width=0
  }

  closeProfile(){
    this.form_width=0;
  }

}
