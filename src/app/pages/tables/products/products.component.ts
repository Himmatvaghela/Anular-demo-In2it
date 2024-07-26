import { Component, OnInit } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { standardProductTable } from 'src/app/interface/server';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private productService: ProductService) {}

  showHidePanel:boolean=false;
  gridOptions!: GridOptions;
  StandardTableList: standardProductTable[] = [];

  btnDisable:boolean=true;

  ngOnInit(): void {
    this.StandardTableList = this.productService.getStanDardData();

    this.gridOptions = {
      context: { component: this, parent: 'productComp' },
    };

    
    this.btnDisable= !this.StandardTableList.some((val)=>{
      return val.is_table_exist;
    }) 

  }

  colDefs: ColDef[] = [
    {
      headerCheckboxSelection: true,
      checkboxSelection: true,
      maxWidth: 40,
      showDisabledCheckboxes: true
    },
    {
      headerName: 'Table Name',
      field: 'table_name.value',
    },
    {
      headerName: 'Table Description',
      field: 'description.value'
    },
    {
      headerName: 'Existing In Product List',
      field: 'is_table_exist',
      valueFormatter: (p) => (p.value ? 'Yes' : 'NO')
    },
  ];

  togglePanelFunc(){
    this.showHidePanel= !this.showHidePanel
  }
  

  checkBoxData:standardProductTable[]=[]

  handleCheckBox(data:any){
    this.checkBoxData=data

    this.btnDisable=this.StandardTableList.some((val)=>{
      return val.is_table_exist
    }) || this.checkBoxData.length>0 ? false:true;
  }
  
  addDataToList(){
    let localTabletData=this.productService.getLocalTableList() as standardProductTable[]
    let standardTableData=this.productService.getStanDardData() as standardProductTable[]

    standardTableData.map((data)=>{
      const check=this.checkBoxData.some(val=>{
       return data.table_id.value == val.table_id.value
      })
      if (!data.is_table_exist) {
        data.is_table_exist=check;
        
      }
      return data;
    })
    this.productService.updateStandardData(standardTableData)
    
    let newData=this.checkBoxData.map((data)=>{
      delete data.is_table_exist;
      return data
    })

    localTabletData.unshift(...newData)
    this.productService.updateLocalData(localTabletData)                                                                      
  }
}
