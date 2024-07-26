import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRendererComponent } from './org-renderer.component';

describe('OrgRendererComponent', () => {
  let component: OrgRendererComponent;
  let fixture: ComponentFixture<OrgRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgRendererComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('agInIt()',()=>{
    it("assign params to property intially",()=>{
      const params: any = {
        data: { organization: 'Company A', name: 'John Doe' },
        context: { component: this, parent: 'organizationComp' },
        colDef: { field: 'fieldName' }
      };
      component.agInit(params);
      
      expect(component.params).toEqual(params)
    })

    it('if colDef.field doesnt exist',()=>{
      const params: any = {
        data: { organization: 'Company A', name: 'John Doe' },
        context: { component: this, parent: 'organizationComp' },
        colDef: undefined
      };
      component.agInit(params)
      expect(component.params.colDef).toBeUndefined()
    })
  })

  it('refresh() method',()=>{
    const params: any = {
      data: { organization: 'Company A', name: 'John Doe' },
      context: { component: this, parent: 'organizationComp' },
      colDef: { field: 'fieldName' }
    };
    let result=component.refresh(params)

    expect(result).toBeTrue()
  })

  describe('onOrgClick()',()=>{
    it('when parent is organizationComp spyOne setTab()',()=>{
      component.params = {
        context: {
          component: {setTab:()=>{}}, 
          parent: 'organizationComp' 
        },
        data: { id: 1, name: 'John Doe' }
      };
      spyOn(component.params.context.component,'setTab')
      component.onOrgClick();
      expect(component.params.context.component.setTab).toHaveBeenCalled()
    })

    it('when parent is allContactComp spyOne setTab()',()=>{
      component.params = {
        context: {
          component: {setTab:()=>{}}, 
          parent: 'allContactComp' 
        },
        data: { id: 1, name: 'John Doe' }
      };
      spyOn(component.params.context.component,'setTab')
      component.onOrgClick();
      expect(component.params.context.component.setTab).toHaveBeenCalled()
    })
  })

  describe('onContactClick()',()=>{
    it('spyOn profileOpen',()=>{
      component.params = {
        context: {
          component: {profileOpen:()=>{}}, 
          parent: 'organizationComp' 
        },
        data: { id: 1, name: 'John Doe' }
      };
      spyOn(component.params.context.component,'profileOpen')
      component.onContactClick();
      expect(component.params.context.component.profileOpen).toHaveBeenCalled()
    })
  })
});
