import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges  } from '@angular/core';
import { ColDef, GridApi, GridOptions, GridReadyEvent, RowNode } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-table',
  templateUrl: './ag-grid-table.component.html',
  styleUrls: ['./ag-grid-table.component.css']
})
export class AgGridTableComponent implements OnInit,OnChanges {
  gridApi!: GridApi;

  constructor() { }

  @Input()searchVal:string='';
  @Input()showHidePanel:any=false;
  @Input()rowData:any;
  @Input()colDefs!:ColDef[];
  @Input() gridOptions!:GridOptions;
  @Output() buttonClicked = new EventEmitter<any>();

  colDefList!:ColDef[];

  defaultColDef:ColDef={
    minWidth:200,
    flex:1,
    sortable:true,
    filter: 'agTextColumnFilter',
    
  }

  rowSelection: "single" | "multiple" = "multiple";
  paginationPageSize=20;
  
  isRowSelectable!:any;
  ParentCompName:boolean=false;
  // selectable
  ngOnInit(): void {
    
    this.colDefList = this.colDefs;
    this.colDefList.map((val)=>{
      val.hide=false;
      return val
    })

    this.isRowSelectable = (rowNode:RowNode) => {
      return rowNode.data.is_table_exist ? false:true;
    } 

    this.ParentCompName=(this.gridOptions.context.parent=='productComp') ||(this.gridOptions.context.parent=='LocalTableListComp') ? true: false;
  }

  hideShowCol(col:any){
    if(!col.hide){
      this.gridOptions.columnApi?.setColumnVisible(col.field, false)
      col.hide=true;
    }else{
      this.gridOptions.columnApi?.setColumnVisible(col.field, true)
      col.hide=false;
    }
  }
  

  getRowStyle(params: any) {
    if (params.data.is_table_exist) {
        return { background: 'lightgrey' }; 
    }
    return;
  }


  onGridReady(params:GridReadyEvent) {
    this.gridApi = params.api;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['searchVal']?.previousValue != undefined){
      this.gridApi.setQuickFilter( this.searchVal);
    }
  }


  onSelectionChanged() {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node: { data: any; }) => node.data);
    this.buttonClicked.emit(selectedData);
  }


}
