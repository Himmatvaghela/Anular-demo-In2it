import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {

constructor() {}

  @ViewChild('userForm') form!:NgForm;

  ngOnInit(): void {
  }

  userFormGroup={
    username:'',
    phoneNumber:null,
    email:'',
    address:[
      {
        city:'',
        country:''
      },
      {
        city:'',
        country:''
      }
    ]
  }

  addField() {
    this.userFormGroup.address.push({city:'',country:''})
  }
  deleteField(index:number) {
    this.userFormGroup.address.splice(index,1)
  }


  //set and patchValue example in temple driven form
  setDefault(){
    // this.form.setValue({
    //   username:'Himmat',
    //   email:'himmatvaghela@gmail.com'
    // })
    console.log(this.form)
  }

  onSubmit() {
    console.log('Form submitted:', this.userFormGroup);
    console.log('form',this.form)

  }

  
}
