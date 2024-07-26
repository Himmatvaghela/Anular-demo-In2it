import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgGridTableComponent } from './ag-grid-table.component';

describe('AgGridTableComponent', () => {
  let component: AgGridTableComponent;
  let fixture: ComponentFixture<AgGridTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgGridTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgGridTableComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assing intiall property on ngOnInIt run',()=>{
    component.colDefs=[{hide:false},{hide:false}]
    component.gridOptions = {
      context: { component: this, parent: 'productComp' },
    };

    component.ngOnInit()
    expect(component.ParentCompName).toBeTrue()

    //when its 'LocalTableListComp'
    component.gridOptions = {
      context: { component: this, parent: 'LocalTableListComp' },
    };

    component.ngOnInit()
    expect(component.ParentCompName).toBeTrue()


    //taro code
    const mockRowNode:any = {
      data: { is_table_exist: true }
    };
 
    component.ngOnInit();
 
    // Assert
    expect(component.isRowSelectable(mockRowNode)).toBeFalse();
 
    // another part
    const mockRowNode2:any = {
      data: { is_table_exist: false }
    };
    component.ngOnInit();
 
    // Assert
    expect(component.isRowSelectable(mockRowNode2)).toBeTrue();
  })

  it('should make ParentCompName false when neither matches',()=>{
    component.colDefs=[{hide:false},{hide:false}]
    component.gridOptions = {
      context: { component: this, parent: '' },
    };
    component.ngOnInit()
    expect(component.ParentCompName).toBeFalse()
  })

  describe('hideShowCol()',()=>{
    it('when col.hide is false; and column api is not empty',()=>{
      let column={field:'description',hide:false}
      component.gridOptions = {
        columnApi:{
          setColumnVisible:()=>{}
        },
      } as any;

      component.hideShowCol(column);
      expect(column.hide).toBeTrue()
    })

    it('when col.hide is false; and column api is empty',()=>{
      let column={field:'description',hide:false}
      component.gridOptions = {
        columnApi:undefined,
      } as any;

      component.hideShowCol(column);
      expect(component.gridOptions.columnApi).toBeUndefined()
    })


    it('when col.hide is true; and column api is not empty',()=>{
      let column={field:'description',hide:true}
      component.gridOptions = {
        columnApi:{
          setColumnVisible:()=>{}
        },
      } as any;

      component.hideShowCol(column);
      expect(column.hide).toBeFalse()
    })

    it('when col.hide is true; and column api is empty',()=>{
      let column={field:'description',hide:true}
      component.gridOptions = {
        columnApi:undefined,
      } as any;

      component.hideShowCol(column);
      expect(component.gridOptions.columnApi).toBeUndefined()
    })
  })


  it('getRowStyle() when is_table_exist==true',()=>{
    let params={
      data:{is_table_exist:true}
    }
    let result=component.getRowStyle(params);
    expect(result).toEqual({ background: 'lightgrey' })
  })


  it('getRowStyle() when is_table_exist==false',()=>{
    let params={
      data:{is_table_exist:false}
    }
    let result=component.getRowStyle(params);
    expect(result).toBeUndefined()
  })


  it('call onGridReady',()=>{
    let params={
      api:{value:'123'}
    } as any;

    component.onGridReady(params);
    expect(component.gridApi).toEqual(params.api)
  })

  describe('ngOnChanges()',()=>{
    it(' when searchVal object exist',()=>{
      let changeData={ searchVal: { previousValue: 'initial_value', currentValue: 'new_value'}} as any;
      component.searchVal = 'new_value';
      component.gridApi={
        setQuickFilter:()=>{}
      } as any;
  
      spyOn(component.gridApi,'setQuickFilter')
      component.ngOnChanges(changeData)
      expect(component.gridApi.setQuickFilter).toHaveBeenCalled()
    })

    it(' when searchVal object is undefined',()=>{
      let changeData={ searchVal: undefined} as any;
 
      component.ngOnChanges(changeData)
      expect(changeData.searchVal).toBeUndefined()
    })

  })


  it('onSelectionChanges()',()=>{
    component.gridApi={
      getSelectedNodes:()=>{ 
        return [
          {node:{ data: { id: 1, name: 'John Doe' } }},
          {node:{ data: { id: 1, name: 'Jane Smith' } }},
        ]
      }
    } as any;

    spyOn(component.buttonClicked,'emit').and.callThrough();
    component.onSelectionChanged()
    expect(component.buttonClicked.emit).toHaveBeenCalled()
  })

  it('should initialize isRowSelectable function correctly', () => {
 
    
  });
});
