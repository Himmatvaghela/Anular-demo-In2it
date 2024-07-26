import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsComponent } from './products.component';
import { standardProductTable } from 'src/app/interface/server';
import { ProductService } from 'src/app/services/product.service';
// import { ColDef } from 'ag-grid-community';

describe('ProductsComponent', () => {
  let component: ProductsComponent;
  let fixture: ComponentFixture<ProductsComponent>;
  let productService:ProductService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsComponent ],
      providers: [ProductService] 
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    productService = TestBed.inject(ProductService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('initialize gridOptions and standard data',()=>{
    let data:standardProductTable[]=[
      {
            is_table_exist: false,
            table_id: {
              value: 821,
              is_edit: false,
              type: 'integer',
            },
            table_type: {
              value: 'is_standard',
              is_edit: false,
              type: 'boolean',
            },
            table_name: {
              value: 'Configuration Item',
              is_edit: true,
              type: 'char',
            },
            description: {
              value: 'Configuration Items',
              is_edit: true,
              type: 'char',
            },
            attribute_count: {
              value: 7,
              is_edit: false,
              type: 'integer',
            },
            rows_count: {
              value: 5,
              is_edit: false,
              type: 'integer',
            },
            created_on: {
              value: '23/06/2023',
              is_edit: false,
              type: 'datetime',
            },
            created_by: {
              value: 'Shivank Tyagi',
              is_edit: false,
              type: 'many2one',
            },
            updated_on: {
              value: '23/06/2023',
              is_edit: false,
              type: 'datetime',
            },
            updated_by: {
              value: 'Shivank Tyagi',
              is_edit: false,
              type: 'many2one',
            },
            is_standard: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            is_active: {
              value: true,
              is_edit: false,
              type: 'boolean',
            },
            property: {
              is_edit: true,
              is_delete: true,
            },
            related_table: [
              {
                id: 96,
                name: 'Users',
              },
              {
                id: 96,
                name: 'Users',
              },
            ],
          },
      ]
    localStorage.setItem('stanDard_data',JSON.stringify(data));
    component.ngOnInit()

    expect(component.btnDisable).toBeTruthy()
    expect(component.StandardTableList).toEqual(data);
    expect(component.gridOptions).toBeDefined();
    expect(component.gridOptions.context).toEqual({ component: component, parent: 'productComp' });
  })

  it('call valueFormatter',()=>{
    const existingColumn: any = component.colDefs[3];
    const mockParams = { value: true };

    const formattedValue = existingColumn.valueFormatter(mockParams);
    expect(formattedValue).toBe('Yes');

    const mockParams2 = { value: false };

    const formattedValue2 = existingColumn.valueFormatter(mockParams2);
    expect(formattedValue2).toBe('NO');
  })

  it('togglePanelFunc()',()=>{
    spyOn(component,'togglePanelFunc').and.callThrough()
    expect(component.showHidePanel).toBeFalsy()
    component.togglePanelFunc();
    expect(component.showHidePanel).toBeTruthy()
  })

  describe('handleCheckboxData()',()=>{

    it('disable or enable AddToList btn',()=>{
      let checkData:standardProductTable[]=[{
        is_table_exist: false,
        table_id: {
          value: 821,
          is_edit: false,
          type: 'integer',
        },
        table_type: {
          value: 'is_standard',
          is_edit: false,
          type: 'boolean',
        },
        table_name: {
          value: 'Configuration Item',
          is_edit: true,
          type: 'char',
        },
        description: {
          value: 'Configuration Items',
          is_edit: true,
          type: 'char',
        },
        attribute_count: {
          value: 7,
          is_edit: false,
          type: 'integer',
        },
        rows_count: {
          value: 5,
          is_edit: false,
          type: 'integer',
        },
        created_on: {
          value: '23/06/2023',
          is_edit: false,
          type: 'datetime',
        },
        created_by: {
          value: 'Shivank Tyagi',
          is_edit: false,
          type: 'many2one',
        },
        updated_on: {
          value: '23/06/2023',
          is_edit: false,
          type: 'datetime',
        },
        updated_by: {
          value: 'Shivank Tyagi',
          is_edit: false,
          type: 'many2one',
        },
        is_standard: {
          value: true,
          is_edit: false,
          type: 'boolean',
        },
        is_active: {
          value: true,
          is_edit: false,
          type: 'boolean',
        },
        property: {
          is_edit: true,
          is_delete: true,
        },
        related_table: [
          {
            id: 96,
            name: 'Users',
          },
          {
            id: 96,
            name: 'Users',
          },
        ],
      }]
      
      component.StandardTableList=checkData;
      component.handleCheckBox(checkData)
      expect(component.btnDisable).toBeFalse()
      component.handleCheckBox([])
      expect(component.btnDisable).toBeTruthy()

    })
  })

  describe('addDataToList()',()=>{
    it('add data in localList and update standard table isExist',()=>{
      let standrdData=[{
        is_table_exist: false,
        table_id: {
          value: 821,
          is_edit: false,
          type: 'integer',
        },
        table_type: {
          value: 'is_standard',
          is_edit: false,
          type: 'boolean',
        },
        table_name: {
          value: 'Configuration Item',
          is_edit: true,
          type: 'char',
        },
        description: {
          value: 'Configuration Items',
          is_edit: true,
          type: 'char',
        },
        attribute_count: {
          value: 7,
          is_edit: false,
          type: 'integer',
        },
        rows_count: {
          value: 5,
          is_edit: false,
          type: 'integer',
        },
        created_on: {
          value: '23/06/2023',
          is_edit: false,
          type: 'datetime',
        },
        created_by: {
          value: 'Shivank Tyagi',
          is_edit: false,
          type: 'many2one',
        },
        updated_on: {
          value: '23/06/2023',
          is_edit: false,
          type: 'datetime',
        },
        updated_by: {
          value: 'Shivank Tyagi',
          is_edit: false,
          type: 'many2one',
        },
        is_standard: {
          value: true,
          is_edit: false,
          type: 'boolean',
        },
        is_active: {
          value: true,
          is_edit: false,
          type: 'boolean',
        },
        property: {
          is_edit: true,
          is_delete: true,
        },
        related_table: [
          {
            id: 96,
            name: 'Users',
          },
          {
            id: 96,
            name: 'Users',
          },
        ],
      }]

      let localData=[
        {
        "table_id": {
            "value": 838,
            "is_edit": false,
            "type": "integer"
        },
        "table_type": {
            "value": "is_standard",
            "is_edit": false,
            "type": "boolean"
        },
        "table_name": {
            "value": "Service Component Config Option",
            "is_edit": true,
            "type": "char"
        },
        "description": {
            "value": "Service Component Config Option",
            "is_edit": true,
            "type": "char"
        },
        "attribute_count": {
            "value": 7,
            "is_edit": false,
            "type": "integer"
        },
        "rows_count": {
            "value": 0,
            "is_edit": false,
            "type": "integer"
        },
        "created_on": {
            "value": "26/08/2023",
            "is_edit": false,
            "type": "datetime"
        },
        "created_by": {
            "value": "Gaurav Rautela",
            "is_edit": false,
            "type": "many2one"
        },
        "updated_on": {
            "value": "26/08/2023",
            "is_edit": false,
            "type": "datetime"
        },
        "updated_by": {
            "value": "Gaurav Rautela",
            "is_edit": false,
            "type": "many2one"
        },
        "is_standard": {
            "value": true,
            "is_edit": false,
            "type": "boolean"
        },
        "is_active": {
            "value": true,
            "is_edit": false,
            "type": "boolean"
        },
        "property": {
            "is_edit": true,
            "is_delete": true
        },
        "related_table": [
            {
                "id": 96,
                "name": "Users"
            },
            {
                "id": 96,
                "name": "Users"
            }
        ]
    },
    {
        "table_id": {
            "value": 836,
            "is_edit": false,
            "type": "integer"
        },
        "table_type": {
            "value": "is_standard",
            "is_edit": false,
            "type": "boolean"
        },
        "table_name": {
            "value": "Config Option test",
            "is_edit": true,
            "type": "char"
        },
        "description": {
            "value": "Config Options",
            "is_edit": true,
            "type": "char"
        },
        "attribute_count": {
            "value": 7,
            "is_edit": false,
            "type": "integer"
        },
        "rows_count": {
            "value": 0,
            "is_edit": false,
            "type": "integer"
        },
        "created_on": {
            "value": "26/08/2023",
            "is_edit": false,
            "type": "datetime"
        },
        "created_by": {
            "value": "Gaurav Rautela",
            "is_edit": false,
            "type": "many2one"
        },
        "updated_on": {
            "value": "13/06/2024",
            "is_edit": false,
            "type": "datetime"
        },
        "updated_by": {
            "value": "Tinku Sharma",
            "is_edit": false,
            "type": "many2one"
        },
        "is_standard": {
            "value": true,
            "is_edit": false,
            "type": "boolean"
        },
        "is_active": {
            "value": true,
            "is_edit": false,
            "type": "boolean"
        },
        "property": {
            "is_edit": true,
            "is_delete": true
        },
        "related_table": [
            {
                "id": 96,
                "name": "Users"
            },
            {
                "id": 799,
                "name": "Config  Items "
            },
            {
                "id": 96,
                "name": "Users"
            }
        ]
      }]

      productService.updateLocalData(localData);
      productService.updateStandardData(standrdData)

      component.checkBoxData=standrdData;
      component.addDataToList()

      component.checkBoxData=productService.getStanDardData()
      
      let isTableExist=component.checkBoxData.every((val:standardProductTable)=>{
        return val.is_table_exist;
      })

      expect(isTableExist).toBeTruthy()
      expect(productService.getLocalTableList().length).toBe(3);

    })
  })
});
