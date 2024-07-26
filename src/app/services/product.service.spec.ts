import { TestBed } from '@angular/core/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLocalTableList',()=>{

    it('getlocalStorage data when empty',()=>{
      spyOn(localStorage,'getItem').and.returnValue(null)
      let result=service.getLocalTableList()
      expect(result).toEqual([])
    })

    it('get localStorage data when not empty',()=>{
      let data=[
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
      }]
      spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(data))
      let result=service.getLocalTableList()
      expect(result).toEqual(data)
    })
  })

  describe('getStandardData()',()=>{

    it('get localStorage data when empty',()=>{
      spyOn(localStorage,'getItem').and.returnValue(null)
      let result=service.getStanDardData()
      expect(result).toEqual([])
    })

    it('get localStorage data when not empty',()=>{
      let data=[{
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
      spyOn(localStorage,'getItem').and.returnValue(JSON.stringify(data))

      let result=service.getStanDardData()
      expect(result).toEqual(data)
    })
  })

  it('updateStandardData() method',()=>{
    spyOn(service,'updateStandardData').and.callThrough();
    service.updateStandardData([]);
    expect(service.updateStandardData).toHaveBeenCalled()
  })

  it('updateLocalData() method',()=>{
    spyOn(service,'updateLocalData').and.callThrough();
    service.updateLocalData([]);
    expect(service.updateLocalData).toHaveBeenCalled()
  })

});
