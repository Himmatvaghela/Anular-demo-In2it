import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactComponent } from './contact.component';
import { contactsDetails } from 'src/app/interface/server';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('ngOnInIt()',()=>{
    component.ngOnInit()
    expect(component.gridOptions.context).toBeDefined()
  })

  it('ngOnChanges()',()=>{
    component.ngOnChanges()
    expect(component.form_width).toEqual(0)
  })

  it('profileOpen()',()=>{
    let cDAta:contactsDetails={
        "id":'a5f7g2h4j',
        "name": "John Doe",
        "email": "john.doe@abccorp.com",
        'phone_code':'+91',
        "phone": "1234567890",
        'other':[{medium:'Whatsapp',fieldVal:'88398329'}],
        'role':'Org SPOC',
        'additionalRole':''
      }

      component.profileOpen(cDAta)
      expect(component.contactData).toEqual(cDAta)
      expect(component.form_width).toEqual(35)
  })

  it('closeProfile()',()=>{
    component.closeProfile()
    expect(component.form_width).toEqual(0)
  })
});
