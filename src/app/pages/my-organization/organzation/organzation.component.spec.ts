import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrganzationComponent } from './organzation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { OrganizationService } from 'src/app/services/organization.service';
import { organizationData } from 'src/app/interface/server';
import { Router } from '@angular/router';
// import { OrganizationService } from 'src/app/services/organization.service';

describe('OrganzationComponent', () => {
  let component: OrganzationComponent;
  let fixture: ComponentFixture<OrganzationComponent>;
  let orgService:OrganizationService;
  let orgMockData:organizationData[];
  let router:Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganzationComponent ],
      imports:[RouterTestingModule],
      providers:[OrganizationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganzationComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    orgService=TestBed.inject(OrganizationService)
    router=TestBed.inject(Router)
    orgMockData=[
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

    localStorage.setItem('organizations',JSON.stringify(orgMockData))
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('assing value on ngOnInIt()',()=>{
    component.ngOnInit()

    expect(component.gridOptions.context).toBeDefined()
    expect(component.dataToShow).toEqual(orgMockData)
  })

  it('filter organization on based of type customer or non customer',()=>{
    component.data=orgMockData
    component.customer = orgMockData.filter((val) => {
      return val.type == 'Customer';
    });
    component.filterOrganization('customer')
    expect(component.dataToShow).toEqual(component.customer)

    //non customer

    component.non_customer = orgMockData.filter((val) => {
      return val.type !== 'Customer';
    });
    component.filterOrganization('Non customer')
    expect(component.dataToShow).toEqual(component.non_customer)

    //type==''
    component.filterOrganization('')
    expect(component.dataToShow).toEqual(component.data)
    expect(component.activeTab).toEqual('')
  })

  it('setActive Tab',()=>{

    spyOn(orgService,'setOrgTab')
    spyOn(orgService,'setActiveTabId')
    spyOn(router, 'navigate');

    component.setTab(orgMockData[0])

    expect(orgService.setOrgTab).toHaveBeenCalled();
    expect(orgService.setActiveTabId).toHaveBeenCalled()
    expect(router.navigate).toHaveBeenCalledWith(['/my-organization/organization/details']);
  })

  it('onSearchValue when search input value is empty',()=>{
    let event={
      target:{value:''}
    }
    spyOn(component,'filterOrgData').and.callThrough()
    component.onSearchValue(event)
    expect(component.filterOrgData).toHaveBeenCalled()
  })

  it('onSearchValue when search input value is not empty',()=>{
    let event={
      target:{value:'abc'}
    }
    spyOn(component,'filterOrgData').and.callThrough()
    component.onSearchValue(event)
    expect(component.filterOrgData).toHaveBeenCalled()
  })

  it('value getter for email',()=>{
    let params={data:{contacts:[{email:'aki@gmil.cm'}]}}
    let existingColumn:any=component.colDefs[7];
    let result=existingColumn.valueGetter(params);
    expect(result).toEqual('aki@gmil.cm')
  })

  it('value getter for phone',()=>{
    let params={data:{contacts:[{phone:'7784585454'}]}}
    let existingColumn:any=component.colDefs[8];
    let result=existingColumn.valueGetter(params);
    expect(result).toEqual('7784585454')
  })

});
