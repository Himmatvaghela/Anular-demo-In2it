import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { standardProductTable } from 'src/app/interface/server';
import { ProductService } from 'src/app/services/product.service';
import { ButtonRendererComponent } from '../../shared/cellRenderer/button-renderer/button-renderer.component';
import { InputRendererComponent } from '../../shared/cellRenderer/input-renderer/input-renderer.component';

@Component({
  selector: 'app-local-list',
  templateUrl: './local-list.component.html',
  styleUrls: ['./local-list.component.css']
})
export class LocalListComponent implements OnInit {

  showHidePanel:boolean=false;
  searchVal:string=''

  constructor(private productService: ProductService) {

  }

  gridOptions!: GridOptions;
  localTableList: standardProductTable[] = [];

  ngOnInit(): void {
    this.localTableList = this.productService.getLocalTableList();
    this.localTableList.map((data)=>{
      data.is_editMode=false;
      return data;
    })
    this.gridOptions = {
      context: { component: this, parent: 'LocalTableListComp'},
    };

  }

  searchFunc(e:any){
    
    this.searchVal=e.target.value
  }

  

  colDefs: ColDef[] = [
    {
      headerName:'Table ID',
      field:'table_id.value'
    },
    {
      headerName: 'Table Name',
      field: 'table_name.value',
      cellRenderer:InputRendererComponent
    },
    {
      headerName: 'Table Description',
      field: 'description.value',
      cellRenderer:InputRendererComponent
    },
    {
      headerName: 'Created On',
      field: 'created_on.value'
    },
    {
      headerName: 'Created By',
      field: 'created_by.value'
    },
    {
      headerName: 'Updated On',
      field: 'updated_on.value'
    },
    {
      headerName: 'Updated By',
      field: 'updated_by.value',
    },
    {
      headerName:'Actions',
      field:'actions',
      cellRenderer:ButtonRendererComponent
    }
  ];

  togglePanelFunc(){
    this.showHidePanel= !this.showHidePanel
  }

  deleteTableLocalList(deletedData:standardProductTable){
    let localData=this.productService.getLocalTableList() as standardProductTable[]
    let filteredData=localData.filter((data) => {
      return data.table_id.value!=deletedData.table_id.value;
    })
    this.productService.updateLocalData(filteredData)

    //change standard table
    if(deletedData.table_type.value=='is_standard'){
      let standard=this.productService.getStanDardData() as standardProductTable[]
      let filteredData=standard.map((data)=>{
        if(data.table_id.value==deletedData.table_id.value){
          data.is_table_exist=false;
        }
        return data;
      })
      
      this.productService.updateStandardData(filteredData)
    }
  }

generateRandomNumericId() {
    const id = Math.floor(Math.random() * 9000000000) + 1000000000;
    return id;
}

getCurrentDate() {
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0'); // Get the day with leading zero if needed
  let mm = String(today.getMonth() + 1).padStart(2, '0'); // Get the month (months are zero based)
  let yyyy = today.getFullYear(); // Get the full year

  return dd + '/' + mm + '/' + yyyy;
}



addNewRow() {
  
  let addRowStructure:standardProductTable={
    addMode:true,
    "table_id": {
        "value": this.generateRandomNumericId(),
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
        "value": this.getCurrentDate(),
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
}
  
  this.gridOptions.api?.applyTransaction({ add: [addRowStructure], addIndex:0 });
  let updated_data=JSON.parse(JSON.stringify(addRowStructure));
  addRowStructure.updatedData=updated_data;
  this.localTableList.unshift(addRowStructure)

}

}
