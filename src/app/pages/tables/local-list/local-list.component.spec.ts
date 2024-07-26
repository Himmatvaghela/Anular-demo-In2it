import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalListComponent } from './local-list.component';
import { ProductService } from 'src/app/services/product.service';
import { standardProductTable } from 'src/app/interface/server';

describe('LocalListComponent', () => {
  let component: LocalListComponent;
  let fixture: ComponentFixture<LocalListComponent>;
  let gridOptionsMock:any;
  let productService: jasmine.SpyObj<ProductService>; // Mocked ProductService
  const mockTableList: standardProductTable[] = [{
    addMode:true,
    "table_id": {
        "value": 10,
        "is_edit": false,
        "type": "integer"
    },
    "table_type": {
        "value": "",
        "is_edit": false,
        "type": "boolean"
    },
    "table_name": {
        "value": "",
        "is_edit": true,
        "type": "char"
    },
    "description": {
        "value": "",
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
        "value": '5/04/2024',
        "is_edit": false,
        "type": "datetime"
    },
    "created_by": {
        "value": "Himmat",
        "is_edit": false,
        "type": "many2one"
    },
    "updated_on": null,
    "updated_by": null,
    "is_standard": {
        "value": false,
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
    "related_table": []
}]

  beforeEach(async () => {
    const productServiceSpy = jasmine.createSpyObj('ProductService',
       [
      'getLocalTableList',
      'updateLocalData',
      'getStanDardData',
      'updateStandardData'
    ]);
    await TestBed.configureTestingModule({
      declarations: [ LocalListComponent ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalListComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    gridOptionsMock = {
      api: {
        applyTransaction: jasmine.createSpy('applyTransaction')
      }
    };
    component.gridOptions = gridOptionsMock;
    productService = TestBed.inject(ProductService) as jasmine.SpyObj<ProductService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should initialize localTableList and gridOptions on ngOnInit', () => {
    // Mock the return value of getLocalTableList from ProductService
    productService.getLocalTableList.and.returnValue(mockTableList);

    // Call ngOnInit
    component.ngOnInit(); // Trigger ngOnInit

    // Assert the initialization of localTableList
    expect(component.localTableList).toEqual(mockTableList);
    expect(productService.getLocalTableList).toHaveBeenCalledTimes(1)
    // Assert mapping of is_editMode property
    component.localTableList.forEach(data => {
      expect(data.is_editMode).toBeFalse(); // Assuming is_editMode should be set to false
    });

    // Assert the initialization of gridOptions
    expect(component.gridOptions).toBeDefined();
    expect(component.gridOptions.context).toEqual({ component: component, parent: 'LocalTableListComp' });
  });

  //searchFunc() method testCase

  it('searchFunc()',()=>{
    spyOn(component,'searchFunc').and.callThrough()

    component.searchFunc({target:{value:'ready'}});

    expect(component.searchVal).toEqual('ready')
  })

  //togglePannelFunc() testCase

  it('togglePanelFunc()',()=>{
    spyOn(component,'togglePanelFunc').and.callThrough()
    expect(component.showHidePanel).toBeFalsy()
    component.togglePanelFunc();
    expect(component.showHidePanel).toBeTruthy()
  })


  //deleteTableLocalList method

  describe('deleteTableLocalList()',()=>{
    
    it('delete method when table_type is not standard' ,()=>{
      let deleteData:standardProductTable={
        "table_id": {
            "value": 838,
            "is_edit": false,
            "type": "integer"
        },
        "table_type": {
            "value": "",
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
      };
  
      productService.getLocalTableList.and.returnValue([{
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
      }]);
  
      spyOn(component,'deleteTableLocalList').and.callThrough()
      component.deleteTableLocalList(deleteData);
  
      expect(component.deleteTableLocalList).toHaveBeenCalledOnceWith(deleteData)
    })

    it('change standard table when table_type is standard',()=>{
    
      let deleteData:standardProductTable={
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
      };
  
      productService.getLocalTableList.and.returnValue([{
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
      }]);

      productService.getStanDardData.and.returnValue([
        {
          is_table_exist: false,
          table_id: {
            value: 838,
            is_edit: false,
            type: 'integer',
          },
          table_type: {
            value: 'is_standard',
            is_edit: false,
            type: 'boolean',
          },
          table_name: {
            value: 'Service Component Config Option',
            is_edit: true,
            type: 'char',
          },
          description: {
            value: 'Service Component Config Option',
            is_edit: true,
            type: 'char',
          },
          attribute_count: {
            value: 7,
            is_edit: false,
            type: 'integer',
          },
          rows_count: {
            value: 0,
            is_edit: false,
            type: 'integer',
          },
          created_on: {
            value: '26/08/2023',
            is_edit: false,
            type: 'datetime',
          },
          created_by: {
            value: 'Gaurav Rautela',
            is_edit: false,
            type: 'many2one',
          },
          updated_on: {
            value: '26/08/2023',
            is_edit: false,
            type: 'datetime',
          },
          updated_by: {
            value: 'Gaurav Rautela',
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
      {
        is_table_exist: false,
        table_id: {
          value: 825,
          is_edit: false,
          type: 'integer',
        },
        table_type: {
          value: 'is_standard',
          is_edit: false,
          type: 'boolean',
        },
        table_name: {
          value: 'Configuration Group',
          is_edit: true,
          type: 'char',
        },
        description: {
          value: 'Variant Configuration Group',
          is_edit: true,
          type: 'char',
        },
        attribute_count: {
          value: 6,
          is_edit: false,
          type: 'integer',
        },
        rows_count: {
          value: 0,
          is_edit: false,
          type: 'integer',
        },
        created_on: {
          value: '26/08/2023',
          is_edit: false,
          type: 'datetime',
        },
        created_by: {
          value: 'Gaurav Rautela',
          is_edit: false,
          type: 'many2one',
        },
        updated_on: {
          value: '26/08/2023',
          is_edit: false,
          type: 'datetime',
        },
        updated_by: {
          value: '',
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
      },]);

      spyOn(component,'deleteTableLocalList').and.callThrough()
      component.deleteTableLocalList(deleteData);
      expect(productService.updateStandardData).toHaveBeenCalled()
     
      
    })

  })

//addNewRow method testCase

  describe('addNewRow()', () => {
    it('should generate correct addRowStructure', () => {
      component.addNewRow();

      // Access the last added row in localTableList
      const addedRow = component.localTableList[0];

      // Assert the expected values
      expect(addedRow.table_id.value).toBeGreaterThan(0); // Assuming generateRandomNumericId() generates a positive number
      expect(addedRow.table_type.value).toBe('');
      expect(addedRow.table_name.is_edit).toBe(true);
      expect(addedRow.description.is_edit).toBe(true);
      expect(addedRow.attribute_count.value).toBe(7);
      expect(addedRow.rows_count.value).toBe(0);
      expect(addedRow.created_by.value).toBe('Himmat');
      expect(addedRow.is_standard.value).toBe(false);
      expect(addedRow.is_active.value).toBe(true);
      expect(addedRow.property?.is_edit).toBe(true);
      expect(addedRow.related_table?.length).toBe(0);
    });

    it('should update gridOptions with new row', () => {
      component.addNewRow();
      
      
      // Spy on applyTransaction
      // spyOn(gridOptionsMock.api, 'applyTransaction');

      // expect(gridOptionsMock).toBeTruthy()
      // expect(gridOptionsMock.api).toBeTruthy()
      // expect(gridOptionsMock.api.applyTransaction).toBeTruthy()
      expect(gridOptionsMock.api.applyTransaction).toHaveBeenCalled();

      // You may want to further inspect the exact structure passed to applyTransaction
      const transactionArg = gridOptionsMock.api.applyTransaction.calls.mostRecent().args[0];
      expect(transactionArg.add.length).toBe(1);
      expect(transactionArg.addIndex).toBe(0);
    });

    it('should not call gridOtption when undefined',()=>{
      gridOptionsMock.api = undefined;

      component.addNewRow();
      expect(gridOptionsMock.api).toBeUndefined();

    })

    it('should update localTableList with new row', () => {
      component.addNewRow();
      component.generateRandomNumericId();

      expect(component.generateRandomNumericId()).toEqual(jasmine.any(Number))

      // Assert that localTableList has the new row at the beginning
      expect(component.localTableList.length).toBe(1);

      // Validate the content of the first row
      const addedRow = component.localTableList[0];
      expect(addedRow).toEqual(jasmine.objectContaining({
        table_id: jasmine.objectContaining({ value: jasmine.any(Number),is_edit:false }),
        table_type: jasmine.objectContaining({ value: '',is_edit:false }),
        table_name: jasmine.objectContaining({ is_edit: true }),
        description: jasmine.objectContaining({ is_edit: true }),
        attribute_count: jasmine.objectContaining({ value: 7,is_edit:false }),
        rows_count: jasmine.objectContaining({ value: 0,is_edit:false }),
        created_by: jasmine.objectContaining({ value: 'Himmat',is_edit:false }),
        is_standard: jasmine.objectContaining({ value: false }),
        is_active: jasmine.objectContaining({ value: true }),
        property: jasmine.objectContaining({ is_edit: true }),
        related_table: []
      }));
    });
  });
});
