import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-human-tasks',
  templateUrl: './human-tasks.component.html',
  styleUrls: ['./human-tasks.component.css']
})
export class HumanTasksComponent implements OnInit {

  // empForm!: FormGroup;

  constructor() {}

  ngOnInit() {
  }
  

  boxes:any=['white','white','white','white','white','white','white','white','white',];
  rememberIndex:number[]=[]
  
  inputVal:any={
    position:null,
    color:'',
  }


  addIndex(index:number){
    this.inputVal.position=index
  }

  clear(){
    this.rememberIndex.forEach((val,i)=>{
      setTimeout(() => {
        this.boxes[val]='white'
      }, i*1000);
    })
  }

  submit(){
    console.log(this.inputVal)
    this.boxes[this.inputVal.position-1]=this.inputVal.color
    this.rememberIndex.unshift(this.inputVal.position-1)

    this.inputVal={
      position:null,
      color:'',
    }
  }
}
