import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertaintyChartComponent } from './certainty-chart.component';

describe('CertaintyChartComponent', () => {
  let component: CertaintyChartComponent;
  let fixture: ComponentFixture<CertaintyChartComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertaintyChartComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertaintyChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  // it('ngAfterViewInit()',()=>{
  //   spyOn(component,'browserOnly').and.callThrough();
  //   component.ngAfterViewInit();

  //   expect(component.browserOnly).toHaveBeenCalled()
  // })
});
