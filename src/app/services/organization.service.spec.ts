import { TestBed } from '@angular/core/testing';

import { OrganizationService } from './organization.service';
import { organizationData } from '../interface/server';

describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('set Active tab Id',()=>{
    let emmitedId:String |undefined;

    service.activeTabSub.subscribe((val:any)=>{
      emmitedId=val
    })
    service.setActiveTabId('1');
    expect(emmitedId).toEqual('1')
  })

  it('set organization Tab',()=>{
    let emmitedId:organizationData |undefined;

    service.orgDataSub.subscribe((val:organizationData)=>{
      emmitedId=val
    })

    let data={
      "id": "1",
      "organization": "ABC Corporation",
      "type": "Customer",
      "industry": "Technology",
      "onboarding": "2022-01-01",
      "related_orgs": ["XYZ Inc.", "123 Enterprises"],
      "products": ["Product A", "Product B", "Product C"],
      "org_SPOC": "John Doe",
      "description": "Leading technology company specializing in software development.",
      "cluster": "IT",
      "tier": "Enterprise",
      "address": "123 Main Street, City, Country",
      "contacts": [
        {
          "id":'a5f7g2h4j',
          "name": "John Doe",
          "email": "john.doe@abccorp.com",
          'phone_code':'+91',
          "phone": "1234567890",
          'other':[{medium:'Whatsapp',fieldVal:'88398329'}],
          'role':'Org SPOC',
          'additionalRole':''
        },
        {
          "id":'k8n3m9z6i',
          "name": "John Papa",
          "email": "john.doe@abccorp.com",
          'phone_code':'+91',
          "phone": "1234564454",
          'other':[{medium:'Whatsapp',fieldVal:'88398329'}],
          'role':'Site SPOC',
          'additionalRole':''
        }
      ]
    }
    
    service.setOrgTab(data);
    expect(emmitedId).toEqual(data)
  })

  it('get organization data when not empty',()=>{
    localStorage.removeItem('organizations')
    expect(service.getOrganizationData()).toEqual([])
  })

  // it('get organization data when not empty',()=>{
  //   let data=[{
  //     "id": "1",
  //     "organization": "ABC Corporation",
  //     "type": "Customer",
  //     "industry": "Technology",
  //     "onboarding": "2022-01-01",
  //     "related_orgs": ["XYZ Inc.", "123 Enterprises"],
  //     "products": ["Product A", "Product B", "Product C"],
  //     "org_SPOC": "John Doe",
  //     "description": "Leading technology company specializing in software development.",
  //     "cluster": "IT",
  //     "tier": "Enterprise",
  //     "address": "123 Main Street, City, Country",
  //     "contacts": [
  //       {
  //         "id":'a5f7g2h4j',
  //         "name": "John Doe",
  //         "email": "john.doe@abccorp.com",
  //         'phone_code':'+91',
  //         "phone": "1234567890",
  //         'other':[{medium:'Whatsapp',fieldVal:'88398329'}],
  //         'role':'Org SPOC',
  //         'additionalRole':''
  //       },
  //       {
  //         "id":'k8n3m9z6i',
  //         "name": "John Papa",
  //         "email": "john.doe@abccorp.com",
  //         'phone_code':'+91',
  //         "phone": "1234564454",
  //         'other':[{medium:'Whatsapp',fieldVal:'88398329'}],
  //         'role':'Site SPOC',
  //         'additionalRole':''
  //       }
  //     ]
  //   }]
  //   localStorage.setItem('organizations',JSON.stringify(data))
  //   expect(service.getOrganizationData()).toEqual(data)
  // })
});
