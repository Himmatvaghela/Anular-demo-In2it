import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputRendererComponent } from './input-renderer.component';

describe('InputRendererComponent', () => {
  let component: InputRendererComponent;
  let fixture: ComponentFixture<InputRendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputRendererComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputRendererComponent);
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
});
