import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabBarComponent } from './tab-bar.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OrganizationService } from 'src/app/services/organization.service';
import { organizationData } from 'src/app/interface/server';
import { Router } from '@angular/router';

describe('TabBarComponent', () => {
  let component: TabBarComponent;
  let fixture: ComponentFixture<TabBarComponent>;
  let orgService:OrganizationService;
  let mockData:organizationData;
  let router:Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabBarComponent ],
      imports:[RouterTestingModule],
      providers:[OrganizationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabBarComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    orgService=TestBed.inject(OrganizationService)
    router=TestBed.inject(Router)
    mockData={
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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('assign data initially on ngOnInIt()',()=>{
    let mockData={
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
    localStorage.setItem('tab',JSON.stringify([mockData]))
    component.ngOnInit();
    expect(component.navs).toEqual([mockData])
    // expect(component.active).toEqual('1')
  })

  it("set tab when navs is empty",()=>{
    
    localStorage.setItem('tab',JSON.stringify([]))
    component.navs=component.getTabs();
    orgService.setOrgTab(mockData);

    expect(component.navs).toEqual([mockData])

    //get item form localstorage when there is nothing in local
    localStorage.removeItem('tab')
    component.getTabs()


    //add item to local storage when there is nothing in local
    component.add(mockData)
  })

  it('set tab when navs is not empty',()=>{
    
    component.navs=[mockData];
    orgService.setOrgTab(mockData);

    expect(component.navs).toEqual([mockData])
  })

  describe('close()',()=>{
    it('remove tab when no tabs are open',()=>{
      localStorage.setItem('tab',JSON.stringify([mockData]))
      spyOn(router, 'navigate');
      component.close('1');

      expect(component.navs).toEqual([])
      expect(router.navigate).toHaveBeenCalledWith(['/my-organization/organization']);
    })

    it('remove tab when 1 or more tabs are open',()=>{
      let mockData2=[{
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
      },
      {
        "id": "2",
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
      }]
      localStorage.setItem('tab',JSON.stringify([mockData2]))
      component.active='1'
      spyOn(router, 'navigate');
      component.close('1');

      expect(component.navs.length).toBe(1)
      expect(router.navigate).toHaveBeenCalledWith(['/my-organization/organization/details']);
    })
  })

  it('activeTab()',()=>{
    spyOn(orgService,'setActiveTabId');
    spyOn(router,'navigate');

    component.activeTab('1');
    expect(component.active).toEqual('1')
    expect(orgService.setActiveTabId).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/my-organization/organization/details']);

    //when id == 0;

    component.header={links:'organization'} as any
    component.activeTab('0');
    expect(component.active).toEqual('0')
    expect(orgService.setActiveTabId).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/my-organization/organization']);
  })
});
