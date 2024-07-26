import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      imports: [ ReactiveFormsModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('intialize min date',()=>{
    component.ngOnInit();
    expect(component.MinDate).toBeDefined()
  })

  describe('ngOnChanges()',()=>{
    it('patch form value when formpathVal is not empty',()=>{
      component.update_data_toggle=true;
      component.formPatchVal = {
        id: '1',
        solutionArea: 'Sample Solution Area',
        workflow: 'Sample Workflow',
        taskId: 'Task001',
        task: 'Sample Task',
        status: 'InProgress',
        startDate: '2024-07-10',
        dueDate: '2024-07-15',
        priority: 'High'
      };
  
      component.ngOnChanges({});
      expect(component.formPatchVal).toEqual(component.tableForm.value)
    })

    it('patch form value when formPatchVal is empty',()=>{
      component.update_data_toggle=true;
      component.formPatchVal = {
        id: '',
        solutionArea: '',
        workflow: '',
        taskId: '',
        task: '',
        status: '',
        startDate: '',
        dueDate: '',
        priority: ''
      };
  
      component.ngOnChanges({});
      expect(component.formPatchVal).toEqual(component.tableForm.value)
    })

    it('when formPatchVal is empty or updateData is false',()=>{
      component.update_data_toggle=false;
      component.formPatchVal = {
        id: '',
        solutionArea: '',
        workflow: '',
        taskId: '',
        task: '',
        status: '',
        startDate: '',
        dueDate: '',
        priority: ''
      };
  
      component.ngOnChanges({});
      expect(component.formPatchVal).toEqual(component.tableForm.value)
    })
  })

  describe('tableFormSubmit()',()=>{

    it('when table form is valid and updateData is true',()=>{
      component.UpdataData=true;
      let data = {
        id: '1',
        solutionArea: 'Sample Solution Area',
        workflow: 'Sample Workflow',
        taskId: 'Task001',
        task: 'Sample Task',
        status: 'InProgress',
        startDate: '2024-07-10',
        dueDate: '2024-07-15',
        priority: 'High'
      };
      component.tableForm.patchValue(data)

      spyOn(component.updataDataEvent,'emit')
      component.tableFormSubmit()
      expect(component.UpdataData).toBeFalse()
      expect(component.updataDataEvent.emit).toHaveBeenCalled()
    })

    it('when table form is valid and updateData is false',()=>{
      component.UpdataData=false;
      let data = {
        id: '1',
        solutionArea: 'Sample Solution Area',
        workflow: 'Sample Workflow',
        taskId: 'Task001',
        task: 'Sample Task',
        status: 'InProgress',
        startDate: '2024-07-10',
        dueDate: '2024-07-15',
        priority: 'High'
      };
      component.tableForm.patchValue(data)
      
      spyOn(component.messageEvent,'emit');

      component.tableFormSubmit()
      expect(component.messageEvent.emit).toHaveBeenCalled()
    })

    it('when table form is invalid',()=>{
      component.UpdataData=false;
      let data = {
        id: '1',
        solutionArea: 'Sample Solution Area',
        workflow: 'Sample Workflow',
        taskId: 'Task001',
        task: '',
        status: '',
        startDate: '2024-07-10',
        dueDate: '2024-07-15',
        priority: 'High'
      };
      component.tableForm.patchValue(data)
      
      component.tableFormSubmit()
      expect(component.tableForm.valid).toBeFalse()
    })
  })

});
