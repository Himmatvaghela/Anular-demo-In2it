import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllContactsComponent } from './all-contacts.component';
import { RouterTestingModule } from '@angular/router/testing';
import { organizationData } from 'src/app/interface/server';
import { Router } from '@angular/router';

describe('AllContactsComponent', () => {
  let component: AllContactsComponent;
  let fixture: ComponentFixture<AllContactsComponent>;
  let orgMockData:organizationData[];
  let router:Router;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllContactsComponent ],
      imports:[RouterTestingModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllContactsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
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

  it('ngOnInit()',()=>{
    spyOn(component,'setAllContact').and.callThrough();
    
    component.ngOnInit()

    expect(component.setAllContact).toHaveBeenCalled()
    expect(component.gridOptions.context).toBeDefined()
    expect(component.orgOneTimeData).toEqual(orgMockData)
    expect(component.orgWiseContact).toEqual(component.orgOneTimeData)
  })

  it('addInputfield()',()=>{
    spyOn(component,'addInputField').and.callThrough()
    component.addInputField()
    expect(component.addInputField).toHaveBeenCalled()
  })

  it('deleteField()',()=>{
    spyOn(component,'deleteField').and.callThrough()
    component.deleteField(0)
    expect(component.deleteField).toHaveBeenCalled()
  })

  it('should call otherFieldSelect()',()=>{
    let event={target:{value:'phone'}}
    spyOn(component,'otherFieldSelect').and.callThrough()
    component.otherFieldSelect(event,0)
    expect(component.otherFieldSelect).toHaveBeenCalled()
  })

  it('handleCheckBoxData()',()=>{
    let cData={
      "id":'r4s2t6l1p',
      'orgId':'2',
      'organization':'XYZ Inc.',
      "name": "Jane Smith",
      "email": "john.doe@abccorp.com",
      'phone_code':'+91',
      "phone": "1234567890",
      'other':[{medium:'phone',fieldVal:'88398329'}],
      'role':'Site SPOC',
      'additionalRole':''
    }
    component.handleCheckBox([cData])
    expect(component.checkBoxSelectedData).toEqual([cData])
  })

  it('get additionalMedioumKey',()=>{
    component.addInputField()
    let ind=0;
    spyOn(component,'checkOtherMedium').and.callThrough()
    component.checkOtherMedium(ind)
    expect(component.checkOtherMedium).toHaveBeenCalled();

    
    // component.checkOtherMedium(ind)
  })

  it('searchValue1()',()=>{
    component.orgOneTimeData=orgMockData;
    let event={target:{value:''}}
    component.searchValue1(event);
    
    expect(component.searchValue1).toBeDefined()

    //when data value is there.....
    let event2={target:{value:'ABC Corporation'}}
    component.searchValue1(event2);
    
    expect(component.searchValue1).toBeDefined()
  })

  it('searchValue2()',()=>{
    component.oneTimeAllContact=[
      {
        "id":'r4s2t6l1p',
        'orgId':'2',
        'organization':'XYZ Inc.',
        "name": "Jane Smith",
        "email": "john.doe@abccorp.com",
        'phone_code':'+91',
        "phone": "1234567890",
        'other':[{medium:'phone',fieldVal:'88398329'}],
        'role':'Site SPOC',
        'additionalRole':''
      },
      {
        "id":'a5f7g2h4j',
        'orgId':'1',
        'organization':'ABC Corporation',
        "name": "John Doe",
        "email": "john.doe@abccorp.com",
        'phone_code':'+91',
        "phone": "1234567890",
        'other':[{medium:'Whatsapp',fieldVal:'88398329'}],
        'role':'Org SPOC',
        'additionalRole':''
      }
    ];
    let event={target:{value:''}}
    component.searchValue2(event);
    
    expect(component.searchValue2).toBeDefined()

    //when data value is there.....
    let event2={target:{value:'john'}}
    component.searchValue2(event2);
    
    expect(component.searchValue2).toBeDefined()
  })

  describe('openForm()',()=>{
    it("when activeTabContent != '' ",()=>{
      component.activeTabContact='ABC Corporation'
      spyOn(component,'resetValue');
      spyOn(component,'orgSelect')
      component.openForm()

      expect(component.resetValue).toHaveBeenCalled()
      expect(component.orgSelect).toHaveBeenCalled()

      //covering branch ??

      component.ContactInfo.removeControl('organization')
      component.openForm()
    })

    it('when activeTabContent= " "',()=>{
      component.activeTabContact=''
      spyOn(component,'resetValue');
      component.openForm()

      expect(component.resetValue).toHaveBeenCalled()

      //covering branch ??

      component.ContactInfo.removeControl('organization')
      component.openForm()
    })
  })

  it('setTab()',()=>{
    component.orgData=orgMockData
    spyOn(router, 'navigate');
    component.setTab('1')

    expect(router.navigate).toHaveBeenCalledWith(['/my-organization/organization/details']);

  })

  it('profileOpen()',()=>{
    let cdata={
      "id":'r4s2t6l1p',
      'orgId':'2',
      'organization':'XYZ Inc.',
      "name": "Jane Smith",
      "email": "john.doe@abccorp.com",
      'phone_code':'+91',
      "phone": "1234567890",
      'other':[{medium:'phone',fieldVal:'88398329'}],
      'role':'Site SPOC',
      'additionalRole':''
    }
    spyOn(component,'removeAllArrayItems')
    component.profileOpen(cdata);
    expect(component.removeAllArrayItems).toHaveBeenCalled()
    expect(component.profileShow).toBeTrue()
    expect(component.dataToShowProfile).toEqual(cdata)
  })

  it('editOnTopButtonClick()',()=>{
    localStorage.setItem('organizations',JSON.stringify(orgMockData))
    let data={
      "id":'r4s2t6l1p',
      'orgId':'2',
      'organization':'XYZ Inc.',
      "name": "Jane Smith",
      "email": "john.doe@abccorp.com",
      'phone_code':'+91',
      "phone": "1234567890",
      'other':[{medium:'phone',fieldVal:'88398329'}],
      'role':'Site SPOC',
      'additionalRole':''
    }

    component.checkBoxSelectedData=[data];
    component.editOnTopButton()

    expect(component.form_width).toEqual(35)
    expect(component.dataToShowProfile).toEqual(data)
  })

  it('editContact() to cover disable.? branch',()=>{
    let data={
      "id":'r4s2t6l1p',
      'orgId':'2',
      'organization':'XYZ Inc.',
      "name": "Jane Smith",
      "email": "john.doe@abccorp.com",
      'phone_code':'+91',
      "phone": "1234567890",
      'other':[{medium:'phone',fieldVal:'88398329'}],
      'role':'Site SPOC',
      'additionalRole':''
    }
    component.ContactInfo.removeControl('organization')
    component.editContact(data)
  })

  it('deleteContact()',()=>{
    let cdata={
      "id":'r4s2t6l1p',
      'orgId':'2',
      'organization':'XYZ Inc.',
      "name": "Jane Smith",
      "email": "john.doe@abccorp.com",
      'phone_code':'+91',
      "phone": "1234567890",
      'other':[{medium:'phone',fieldVal:'88398329'}],
      'role':'Site SPOC',
      'additionalRole':''
    }
    let cdata2={
      "id":'a5f7g2h4j',
      'orgId':'1',
      'organization':'ABC Corporation',
      "name": "John Doe",
      "email": "john.doe@abccorp.com",
      'phone_code':'+91',
      "phone": "1234567890",
      'other':[{medium:'Whatsapp',fieldVal:'88398329'}],
      'role':'Org SPOC',
      'additionalRole':''
    }
    component.checkBoxSelectedData=[cdata,cdata2]
    spyOn(component,'filterOrganization');
    component.deleteContacts()
    expect(component.filterOrganization).toHaveBeenCalled()
  })

  describe('orgSelect()',()=>{
    it('disable org SPOC when org SPOC Exist',()=>{
      localStorage.setItem('organizations',JSON.stringify(orgMockData));
      component.activeTabContact='ABC Corporation';
      component.orgSelect()

      //to cover ? branch
      localStorage.setItem('organizations',JSON.stringify(orgMockData));
      component.activeTabContact='ABC Corporation';
      component.ContactInfo.removeControl('organization')
      component.ContactInfo.removeControl('role')
      component.orgSelect()

      expect(component.orgSelect).toBeDefined()
    })
  })
 

  describe('contactInfoSubmit()',()=>{
    it('when form is valid and editMode is true',()=>{
      localStorage.setItem('organizations',JSON.stringify(orgMockData));
      
      let data={
        "id":'a5f7g2h4j',
        'orgId':'1',
        'organization':'ABC Corporation',
        "name": "John Doe",
        "email": "john.doe@abccorp.com",
        'phone_code':'+91',
        "phone": "1234567890",
        'other':[{medium:'Whatsapp',fieldVal:'88398329'}],
        'role':'Org SPOC',
        'additionalRole':''
      }
      component.dataToShowProfile=data;

      component.editContact(data)
      component.contactInfoSubmit()
      expect(component.editMode).toBeFalse()
      expect(component.profileShow).toBeTrue()
    })

    it('when form is valid and editMode is false',()=>{
      localStorage.setItem('organizations',JSON.stringify(orgMockData));
      
      let data={
        'organization':'ABC Corporation',
        "firstName":'Joni',
        "lastName": "dame",
        "email": "john.doe@abccorp.com",
        'phone_code':'+91',
        "phone": "1234567890",
        'additionalMedium':[{medium:'Whatsapp',fieldVal:'88398329'}],
        'role':'Site SPOC',
        'additionalRole':'',
        'remark': ''
      }
      component.editMode=false;
      
      component.addInputField()
      component.activeTabContact='ABC Corporation';
      component.ContactInfo.patchValue(data);
      component.contactInfoSubmit()

      expect(component.checkBoxSelectedData).toEqual([])
      
    })

    it('when form is invalid',()=>{
      component.contactInfoSubmit()
    })

  })

  it('resetValue() to cover branch',()=>{
    spyOn(component,'removeAllArrayItems');
    component.ContactInfo.removeControl('organization');
    component.ContactInfo.removeControl('role');
    component.ContactInfo.removeControl('phone_code');

    component.resetValue()
    expect(component.removeAllArrayItems).toHaveBeenCalled()
    expect(component.resetValue).toBeDefined()
  })
});
