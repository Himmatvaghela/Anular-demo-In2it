import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyTaskComponent } from './my-task.component';
import { OverlayService } from 'src/app/services/overlay.service';
import { ServerService } from 'src/app/services/server.service';

describe('MyTaskComponent', () => {
  let component: MyTaskComponent;
  let fixture: ComponentFixture<MyTaskComponent>;
  // let overlayService:OverlayService;
  let serverService:ServerService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyTaskComponent ],
      providers:[OverlayService,ServerService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTaskComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    // overlayService=TestBed.inject(OverlayService)
    serverService=TestBed.inject(ServerService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('toggleOverlay()',()=>{
    component.form_width=0;
    component.toggleOverlay()
    expect(component.form_width).toBe(35)

    component.form_width=35;
    component.toggleOverlay()
    expect(component.form_width).toBe(0)
  })

  it('focusCard() assign item name',()=>{
    component.focusCard('Priority')
    expect(component.itemName).toEqual('Priority')
  })

  it('assign data on ngOnInIt',()=>{
    let data = [{
      id: '1',
      solutionArea: 'Sample Solution Area',
      workflow: 'Sample Workflow',
      taskId: 'Task001',
      task: '',
      status: '',
      startDate: '2024-07-10',
      dueDate: '2024-07-15',
      priority: 'High'
    }];
    localStorage.setItem('tData',JSON.stringify(data))

    spyOn(component,'filterArray').and.callThrough()
    component.ngOnInit()
    expect(component.tableData).toEqual(data)
    expect(component.filterArray).toHaveBeenCalled()
    expect(component.gridOptions.context).toBeDefined()
  })

  it('toggleForm()',()=>{
    component.form_width=0;
    component.toggleForm()
    expect(component.form_width).toBe(35)
    expect(component.updata_data_toggle).toBeFalse()

    component.form_width=35;
    component.toggleForm()
    expect(component.form_width).toBe(0)
  })

  it('recieveMessage()',()=>{
    let data = {
      id: '2',
      solutionArea: 'Sample Solution Area2',
      workflow: 'Sample Workflow2',
      taskId: 'Task001 2',
      task: 'dfs',
      status: 'ddf',
      startDate: '2024-07-10',
      dueDate: '2024-07-15',
      priority: 'High'
    };
    component.form_width=0;
    component.receiveMessage(data);
    expect(component.form_width).toBe(35)

    component.form_width=35;
    component.receiveMessage(data);
    expect(component.form_width).toBe(0)
  })

  it('deleteData()',()=>{
    let data = [{
      id: '1',
      solutionArea: 'Sample Solution Area',
      workflow: 'Sample Workflow',
      taskId: 'Task001',
      task: '',
      status: '',
      startDate: '2024-07-10',
      dueDate: '2024-07-15',
      priority: 'High'
    },
    {
      id: '2',
      solutionArea: 'Sample Solution Area2',
      workflow: 'Sample Workflow2',
      taskId: 'Task001 2',
      task: 'dfs',
      status: 'ddf',
      startDate: '2024-07-10',
      dueDate: '2024-07-15',
      priority: 'High'
    }]

    localStorage.setItem('tData',JSON.stringify(data))

    component.deleteData('1')
    expect(serverService.getTableData().length).toBe(1)
  })

  it('editData',()=>{
    let data={
      id: '2',
      solutionArea: 'Sample Solution Area',
      workflow: 'Sample Workflow',
      taskId: 'Task001 ',
      task: 'dfs',
      status: 'ddf',
      startDate: '2024-07-10',
      dueDate: '2024-07-15',
      priority: 'High'
    }

    component.editData(data)
    expect(component.form_val_patch).toEqual(data)
    expect(component.updata_data_toggle).toBeTrue()
    expect(component.form_width).toEqual(35)
  })

  it('updateData()',()=>{
    let data={
      id: '2',
      solutionArea: 'Sample Solution Area',
      workflow: 'Sample Workflow',
      taskId: 'Task001 ',
      task: 'dfs',
      status: 'ddf',
      startDate: '2024-07-10',
      dueDate: '2024-07-15',
      priority: 'High'
    }
    component.updateData(data)
    expect(component.form_width).toEqual(0)
  })

  it('call cellStyle()',()=>{
    let params={value:'High'}
    let existedColumn:any=component.colDefs[7];
    let result=existedColumn.cellStyle(params)

    expect(result).toEqual({color:'white',backgroundColor:'green'})

    let params2={value:'Medium'}
    let existedColumn2:any=component.colDefs[7];
    let result2=existedColumn2.cellStyle(params2)

    expect(result2).toEqual({color:'white',backgroundColor:'blue'})

    let params3={value:'jd'}
    let existedColumn3:any=component.colDefs[7];
    let result3=existedColumn3.cellStyle(params3)

    expect(result3).toEqual({color:'white',backgroundColor:'red'})
  })
});
