import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarComponent } from './sidebar.component';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toogleSideBar()',()=>{
    component.width_=0;
    component.toggleSidebar()
    expect(component.width_).toEqual(17)

    component.width_=17
    component.toggleSidebar()
    expect(component.width_).toEqual(0)
  })

  it('routeShowHeader()',()=>{
    spyOn(component,'routeShowHeader').and.callThrough()
    component.routeShowHeader('Contact','My Organization')
    expect(component.routeShowHeader).toHaveBeenCalled()
  })
});
