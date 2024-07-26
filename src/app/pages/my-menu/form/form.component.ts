import { Component, OnInit, Output,EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { tableData } from 'src/app/interface/server';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit, OnChanges {

  constructor() { }

  @Output() messageEvent = new EventEmitter<tableData>();
  @Output() updataDataEvent= new EventEmitter<tableData>();
  // @Output() close_hide_form=new EventEmitter<boolean>()

  @Input()formPatchVal!:tableData
  @Input()update_data_toggle!:boolean

  MinDate:any;

  ngOnInit(): void {
    this.MinDate = new Date().toISOString().slice(0,10);
    
  }

  UpdataData:boolean=false;
  

  ngOnChanges(_changes: SimpleChanges): void {
    
    this.UpdataData=this.update_data_toggle;
    
    if(this.formPatchVal && this.UpdataData){
      this.tableForm.patchValue({
        id:this.formPatchVal && this.formPatchVal.id?this.formPatchVal.id:'',
        solutionArea:this.formPatchVal && this.formPatchVal.solutionArea?this.formPatchVal.solutionArea:'',
        workflow:this.formPatchVal && this.formPatchVal.workflow?this.formPatchVal.workflow:'',
        taskId:this.formPatchVal && this.formPatchVal.taskId?this.formPatchVal.taskId:'',
        task:this.formPatchVal && this.formPatchVal.task?this.formPatchVal.task:'',
        status:this.formPatchVal && this.formPatchVal.status?this.formPatchVal.status:'',
        startDate:this.formPatchVal && this.formPatchVal.startDate?this.formPatchVal.startDate:'',
        dueDate:this.formPatchVal && this.formPatchVal.dueDate?this.formPatchVal.dueDate:'',
        priority:this.formPatchVal && this.formPatchVal.priority?this.formPatchVal.priority:''
      })
    }
    else{
      this.tableForm.patchValue({
        id:'',
        solutionArea:'',
        workflow:'',
        taskId:'',
        task:'',
        status:'',
        startDate:'',
        dueDate:'',
        priority:''
      })
    }
    
  }

  tableForm=new FormGroup({
    id:new FormControl(''),
    solutionArea:new FormControl('',[Validators.required]),
    workflow:new FormControl('',[Validators.required]),
    taskId:new FormControl('',[Validators.required]),
    task:new FormControl('',[Validators.required]),
    status:new FormControl('',[Validators.required]),
    startDate:new FormControl('',[Validators.required]),
    dueDate:new FormControl('',[Validators.required]),
    priority:new FormControl('',[Validators.required]),
  })

  tableFormSubmit(){
    if (this.tableForm.valid) {
      const data=this.tableForm.value;
      const uniqueId = Math.random().toString(36).substr(2, 9);
      const add_data={...data} as tableData
      add_data.id=uniqueId;
       
      if (this.UpdataData) {
        this.updataDataEvent.emit(this.tableForm.value)
        this.UpdataData=false
      }else{
        this.messageEvent.emit(add_data);
      }
      this.tableForm.reset()
    } else {
      let key=Object.keys(this.tableForm.controls)
      
      key.map((val)=>{
        let control=this.tableForm.controls[val as keyof typeof this.tableForm.controls]
        if(control.errors){
          control.markAsTouched()
        }
      })
    }
    
    // this.UpdataData=this.UpdataData==true?false:false
    this.UpdataData=false;
  }

}
