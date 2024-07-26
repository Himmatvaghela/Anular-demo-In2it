import { Component, OnInit } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';
import { tableData } from 'src/app/interface/server';
import { OverlayService } from 'src/app/services/overlay.service';
import { ColDef, GridOptions } from 'ag-grid-community';
import { ButtonRendererComponent } from '../../shared/cellRenderer/button-renderer/button-renderer.component';

@Component({
  selector: 'app-my-task',
  templateUrl: './my-task.component.html',
  styleUrls: ['./my-task.component.css'],
})
export class MyTaskComponent implements OnInit {
  toggleOverlay() {
    this.overlayService.closeOverlay();
    this.form_width = this.form_width == 0 ? 35 : 0;
  }

  constructor(
    private server: ServerService,
    public overlayService: OverlayService
  ) {}

  form_width: number = 0;
  form_val_patch!: tableData;
  updata_data_toggle!: boolean;

  arr: { name: string; count: number; icon: string }[] = [
    { name: 'assigned to me', count: 1, icon: 'user' },
    { name: 'InQue', count: 55, icon: 'align-justify' },
    { name: 'Overdue', count: 56, icon: 'clock' },
    { name: 'Priority', count: 46, icon: 'star' },
  ];

  itemName: string = this.arr[0].name;

  focusCard(itemname: any) {
    this.itemName = itemname;
  }

  itemsPerPage = 10;
  dataToShow: tableData[] = [];
  totalPage: number = 0;
  currentPage: number = 1;

  tableData: tableData[] = [];
  gridOptions!:GridOptions;

  colDefs: ColDef[] = [
    { headerName: 'Solution Area', field: 'solutionArea' },
    { headerName: 'Workflow', field: 'workflow' },
    { headerName: 'Task Id', field: 'taskId' },
    { headerName: 'Task', field: 'task' },
    { headerName: 'Status', field: 'status' },
    { headerName: 'Start Date', field: 'startDate' },
    { headerName: 'Due Date', field: 'dueDate' },
    {
      headerName: 'Priority',
      field: 'priority',
      cellStyle: (params) => {
        return {color:'white',backgroundColor:params.value=='High'?'green':params.value=='Medium'?'blue':'red'};
      },
    },
    {
      headerName: 'Actions',
      field: '',
      cellRenderer: ButtonRendererComponent,
      // cellRendererParams: {
      //   context:{MyTaskComponent:this,parent:'myTaskIsParent'},
      //   // different
      //   onClickEdit: this.onRendererEdit.bind(this),
      //   onClickDelete: this.onRendererDelete.bind(this),
      // },
    },
  ];

  // onRendererEdit(params: any) {
  //   this.editData(params.data);
  // }

  // onRendererDelete(params: any) {
  //   this.deleteData(params.data.id);
  // }

  ngOnInit(): void {
    //form table
    this.tableData = this.server.getTableData();
    this.filterArray();

    this.gridOptions={
      context:{component:this,parent:'myTaskComp'}
    }
  }

  filterArray() {
    this.dataToShow = this.tableData.slice(
      (this.currentPage - 1) * this.itemsPerPage,
      this.currentPage * this.itemsPerPage
    );
  }

  toggleForm() {
    this.form_width = this.form_width == 0 ? 35 : 0;
    this.updata_data_toggle = false;
    this.overlayService.showOverlay();
  }

  receiveMessage(dataToSet: any) {
    this.server.setData(dataToSet);
    this.tableData = JSON.parse(localStorage.getItem('tData') as string);
    this.filterArray();
    this.overlayService.closeOverlay();
    this.form_width = this.form_width == 0 ? 35 : 0;
  }

  deleteData(id: string) {
    const pop_up = confirm('Are you sure you want to delete items');

    if (pop_up) {
      this.tableData = this.server.deleteData(id);
      this.filterArray();
    }
  }

  editData(eData: tableData) {
    this.form_width = 35;
    this.form_val_patch = eData;
    this.updata_data_toggle = true;
    this.overlayService.showOverlay();
  }

  updateData(uData: tableData) {
    this.tableData = this.server.updateTableData(uData);
    this.filterArray();
    this.overlayService.closeOverlay();
    this.form_width = 0;
  }

}
