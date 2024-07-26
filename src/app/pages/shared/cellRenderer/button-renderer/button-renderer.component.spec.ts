import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonRendererComponent } from './button-renderer.component';
import { ProductService } from 'src/app/services/product.service';

describe('ButtonRendererComponent', () => {
  let component: ButtonRendererComponent;
  let fixture: ComponentFixture<ButtonRendererComponent>;
  let productService:ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonRendererComponent ],
      providers: [ProductService] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonRendererComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    productService=TestBed.inject(ProductService)
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('agInIt()',()=>{
    it("assign params to property intially when component.parent ==LocalTableListComp",()=>{
      const params: any = {
        data: { organization: 'Company A', name: 'John Doe' },
        context: { component: this, parent: 'LocalTableListComp' },
        colDef: { field: 'fieldName' }
      };
      component.agInit(params);
      expect(component.params).toEqual(params)
      expect(component.blackButtons).toEqual(true)
    })

    it("assign params to property intially when component.parent not ==LocalTableListComp",()=>{
      const params: any = {
        data: { organization: 'Company A', name: 'John Doe' },
        context: { component: this, parent: '' },
        colDef: { field: 'fieldName' }
      };
      component.agInit(params);
      expect(component.params).toEqual(params)
      expect(component.blackButtons).toEqual(false)
    })
  })

  it('refresh() method',()=>{
    const params: any = {
      context: { component: this, parent: 'organizationComp' },
    };
    let result=component.refresh(params)
    expect(result).toBeTrue()
  })

  describe('editData()',()=>{
    it("editData when context.parent==myTaskComp",()=>{
      component.params = {
        data: { organization: 'Company A', name: 'John Doe' },
        context: { 
          component: {editData:()=>{}}, 
          parent: 'myTaskComp' 
        },
      };
      spyOn(component.params.context.component,'editData')
      component.editData();
      expect(component.params.context.component.editData).toHaveBeenCalled()
    })

    it("editData when context.parent==LocalTableListComp",()=>{
      component.params = {
        data: { organization: 'Company A', name: 'John Doe',updatedData:{},is_editMode:false },
        context: {  
          parent: 'LocalTableListComp' 
        },
      };
      component.editData();
      expect(component.params.data.is_editMode).toBeTrue()
    })

  })

  describe('deleteData()',()=>{
    it("deleteData when context.parent==myTaskComp",()=>{
      component.params = {
        data: { organization: 'Company A', name: 'John Doe' },
        context: { 
          component: {deleteData:()=>{}}, 
          parent: 'myTaskComp' 
        },
      };
      spyOn(component.params.context.component,'deleteData')
      component.deleteData();
      expect(component.params.context.component.deleteData).toHaveBeenCalled()
    })

    it("deleteData when context.parent==LocalTableListComp",()=>{
      component.params = {
        node:{data: { organization: 'Company A', name: 'John Doe',updatedData:{},is_editMode:false },},
        context: {  
          parent: 'LocalTableListComp',
          component:{deleteTableLocalList:()=>{}}
        },
        api:{
          applyTransaction:()=>{}
        }
      };
      spyOn(component.params.api,'applyTransaction')
      spyOn(component.params.context.component,'deleteTableLocalList')
      component.deleteData();
      expect(component.params.api.applyTransaction).toHaveBeenCalled()
      expect(component.params.context.component.deleteTableLocalList).toHaveBeenCalled()
    })
  })

  describe('updateRow()',()=>{
    it("add new row when addMode is true",()=>{
      component.params = {
        data: {
          addMode: true,
          table_name: { value: 'original_table_name' },
          description: { value: 'original_description' },
          updatedData: {
            table_name: { value: 'updated_table_name' },
            description: { value: 'updated_description' }
          }
        },
        context: {
          component: {
            localTableList: [
              { addMode: true },
              { addMode: false, table_name: { value: 'updated_table_name' },description: { value: 'updated_description' } },
            ]
          }
        }
      };
      spyOn(productService,'updateLocalData')
      component.updateRow();

      expect(component.params.data.addMode).toBeUndefined();
      expect(component.params.data.table_name.value).toBe('updated_table_name');
      expect(component.params.data.description.value).toBe('updated_description');
      expect(component.params.data.updatedData).toBeUndefined();
      expect(productService.updateLocalData).toHaveBeenCalled()
    })


    it("update row when editMode is true",()=>{
      component.params = {
        data: {
          is_editMode: true,
          table_name: { value: 'original_table_name' },
          description: { value: 'original_description' },
          updatedData: {
            table_name: { value: 'updated_table_name' },
            description: { value: 'updated_description' }
          }
        },
        context: {
          component: {
            localTableList: [
              { table_name: { value: 'updated_table_name' },description: { value: 'updated_description' } },
            ]
          }
        }
      };
      spyOn(productService,'updateLocalData')
      component.updateRow();

      expect(component.params.data.is_editMode).toBeFalse();
      expect(component.params.data.table_name.value).toBe('updated_table_name');
      expect(component.params.data.description.value).toBe('updated_description');
      expect(component.params.data.updatedData).toBeUndefined();

      expect(productService.updateLocalData).toHaveBeenCalledWith(component.params.context.component.localTableList)
    })
  })


  describe('cancel()',()=>{
    it("cancel adding data when add mode is true",()=>{
      component.params = {
        rowIndex:0,
        node:{data: { organization: 'Company A', name: 'John Doe',updatedData:{},addMode:true }},
        data: { organization: 'Company A', name: 'John Doe',updatedData:{},addMode:true },
        context: {  
          parent: 'LocalTableListComp',
          component:{
            localTableList: [
              { table_name: { value: 'updated_table_name1' },description: { value: 'updated_description1' } },
              { table_name: { value: 'updated_table_name2' },description: { value: 'updated_description2' } },
            ]
          }
        },
        api:{
          applyTransaction:()=>{}
        }
      };
      spyOn(component.params.api,'applyTransaction')
      component.cancel();
      expect(component.params.api.applyTransaction).toHaveBeenCalled()
      expect(component.params.context.component.localTableList.length).toBe(1)
    })

    it("cancel editing row when is_editMode is true",()=>{
      component.params = {
        data: {
          is_editMode: true,
          table_name: { value: 'original_table_name' },
          description: { value: 'original_description' },
          updatedData: {
            table_name: { value: 'updated_table_name' },
            description: { value: 'updated_description' }
          }
        }
      };
      component.cancel()
      expect(component.params.data.is_editMode).toBeFalse();
      expect(component.params.data.updatedData).toBeUndefined();
    })
  })

});
