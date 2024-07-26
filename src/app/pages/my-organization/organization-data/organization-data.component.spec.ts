import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationDataComponent } from './organization-data.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { OrganizationService } from 'src/app/services/organization.service';
import { Router } from '@angular/router';

describe('OrganizationDataComponent', () => {
  let component: OrganizationDataComponent;
  let fixture: ComponentFixture<OrganizationDataComponent>;
  let orgService:OrganizationService;
  let router:Router;
  let tabMockData=[
    {
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
    "organization": "XYZ Inc.",
    "type": "Non customer",
    "industry": "Finance",
    "onboarding": "2021-12-15",
    "related_orgs": ["ABC Corporation", "123 Enterprises"],
    "products": ["Product X", "Product Y"],
    "org_SPOC": "Jane Smith",
    "description": "Financial services firm offering investment banking and asset management services.",
    "cluster": "Finance",
    "tier": "Mid-Market",
    "address": "456 Oak Avenue, City, Country",
    "contacts": [
      {
        'id':'r4s2t6l1p',
        "name": "Jane Smith",
        "email": "jane.smith@xyzinc.com",
        'phone_code':'+91',
        "phone": "9876543210",
        'other':[],
        'role':'Site SPOC',
        'additionalRole':''
      }
    ],
    
  }]
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationDataComponent ],
      providers:[OrganizationService],
      imports:[RouterTestingModule,NgbNavModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationDataComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    orgService=TestBed.inject(OrganizationService)
    router=TestBed.inject(Router)
    localStorage.setItem('tab',JSON.stringify(tabMockData))
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when active tab id !==0',()=>{
    orgService.setActiveTabId('1')
  })

  it('ngOnInIt()',()=>{
    component.urlId=0;
    spyOn(router,'navigate')

    component.ngOnInit()
    expect(router.navigate).toHaveBeenCalledWith(['/my-organization/organization']);
  })
});
