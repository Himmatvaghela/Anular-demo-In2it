import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { organizationData } from 'src/app/interface/server';
import { OrganizationService } from 'src/app/services/organization.service';
import { ServerService } from 'src/app/services/server.service';
import { OrgRendererComponent } from '../../shared/cellRenderer/org-renderer/org-renderer.component';

@Component({
  selector: 'app-organzation',
  templateUrl: './organzation.component.html',
  styleUrls: ['./organzation.component.css'],
})
export class OrganzationComponent implements OnInit {
  constructor(
    private serverService: ServerService,
    private orgService: OrganizationService,
    private route: ActivatedRoute,
    private routernav: Router
  ) {}

  dataToShow: organizationData[] = [];
  data: organizationData[] = [];
  customer: organizationData[] = [];
  non_customer: organizationData[] = [];
  activeTab: string = '0';

  gridOptions!:GridOptions;
  colDefs: ColDef[] = [
    {
      headerName: 'Organization',
      field: 'organization',
      cellRenderer: OrgRendererComponent,
      
    },
    { headerName: 'Type', field: 'type' },
    { headerName: 'Industry', field: 'industry' },
    { headerName: 'Onboarding', field: 'onboarding' },
    { headerName: 'Releted Organization', field: 'related_orgs.length' },
    { headerName: 'Products', field: 'products.length' },
    { headerName: 'Org SPOC', field: 'org_SPOC' },
    {
      headerName: 'Email',
      field: '',
      valueGetter: (params) => {
        return params.data.contacts[0].email;
      },
    },
    {
      headerName: 'Phone',
      field: '',
      valueGetter: (params) => {
        return params.data.contacts[0].phone;
      },
    },
  ];

  ngOnInit(): void {

    this.gridOptions={
      context:{component:this,parent:'organizationComp'}
    }

    this.data = this.orgService.getOrganizationData();
    this.dataToShow = this.data;
    this.customer = this.dataToShow.filter((val) => {
      return val.type == 'Customer';
    });

    this.non_customer = this.dataToShow.filter((val) => {
      return val.type != 'Customer';
    });
    this.route.url.subscribe((val) => {
      this.serverService.setHeader({
        links: val[0].path,
        module: 'my-organization',
      });
    });

    this.orgService.setActiveTabId(this.activeTab);
  }
  filterOrganization(type: string) {
    if (type == 'customer') {
      this.dataToShow = this.customer;
    } else if (type == 'Non customer') {
      this.dataToShow = this.non_customer;
    } else {
      this.dataToShow = this.data;
    }
    this.activeTab = type;
  }

  setTab(orgData: organizationData) {
    this.orgService.setOrgTab(orgData);
    this.orgService.setActiveTabId(orgData.id);
    // this.routernav.navigate(['/my-organization/organization/details'], { state: {orgData} });
    this.routernav.navigate(['/my-organization/organization/details']);
  }

  onSearchValue(event: any) {
    this.dataToShow = this.filterOrgData(event.target.value);
  }

  filterOrgData(searchValue: string): any[] {
    if (!searchValue) {
      return [...this.orgService.getOrganizationData()];
    }
    searchValue = searchValue.toLowerCase();
    return this.orgService
      .getOrganizationData()
      .filter((data: organizationData) => {
        return (
          data.organization.toLowerCase().includes(searchValue) ||
          data.industry.toLowerCase().includes(searchValue) ||
          data.onboarding.toLowerCase().includes(searchValue) ||
          data.org_SPOC.toLowerCase().includes(searchValue) ||
          String(data.products.length) == searchValue ||
          String(data.related_orgs.length) == searchValue ||
          data.type.toLowerCase().includes(searchValue) ||
          data.contacts.some((contact) =>
            contact.email.toLowerCase().includes(searchValue)
          ) ||
          data.contacts.some((contact) =>
            contact.phone.toLowerCase().includes(searchValue)
          )
        );
      });
  }
}
