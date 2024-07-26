import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';
import { standardProductTable } from 'src/app/interface/server';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-button-renderer',
  templateUrl: './button-renderer.component.html',
  styleUrls: ['./button-renderer.component.css']
})
export class ButtonRendererComponent  {

  constructor( private productService:ProductService) { }

  blackButtons:boolean=false;
  params:any;
  
  agInit(params: ICellRendererParams): void {
    this.params=params
    this.blackButtons=this.params.context.parent=='LocalTableListComp'?true:false;
  }
  
  // Return Cell Value
  refresh(params: ICellRendererParams): boolean {
    this.params=params;
    return true;
  }

  editData(){
    if(this.params.context.parent=="myTaskComp"){
      this.params.context.component.editData(this.params.data);
    }else if(this.params.context.parent=='LocalTableListComp'){
      
      this.params.data.is_editMode=true;
      let updated_data=JSON.parse(JSON.stringify(this.params.data));

      this.params.data.updatedData=updated_data;

    }
  }

  deleteData(){
    if(this.params.context.parent=="myTaskComp"){
      this.params.context.component.deleteData(this.params.data.id);
    }else if(this.params.context.parent=='LocalTableListComp'){
      this.params.api.applyTransaction({
        remove: [this.params.node.data]
      });
      this.params.context.component.deleteTableLocalList(this.params.data)
    }
  }

  updateRow(){
    if(this.params.data.addMode){
      delete this.params.data.addMode;
      this.params.data.table_name.value=this.params.data.updatedData.table_name.value;
      this.params.data.description.value=this.params.data.updatedData.description.value;
      delete this.params.data.updatedData;
      let filteredData=this.params.context.component.localTableList.filter((val:standardProductTable)=>!val.addMode)
      this.productService.updateLocalData(filteredData)

    }else{
      this.params.data.is_editMode=false;
      this.params.data.table_name.value=this.params.data.updatedData.table_name.value;
      this.params.data.description.value=this.params.data.updatedData.description.value;
      delete this.params.data.updatedData
  
    this.productService.updateLocalData(this.params.context.component.localTableList)
      }
  }

  cancel(){
    if(this.params.data.addMode){
      this.params.api.applyTransaction({
        remove: [this.params.node.data]
      });

      this.params.context.component.localTableList.splice(this.params.rowIndex,1)
    }else{
      this.params.data.is_editMode=false;
      delete this.params.data.updatedData;
    }

  }
}
