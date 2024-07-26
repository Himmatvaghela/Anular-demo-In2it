import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-workflows',
  templateUrl: './workflows.component.html',
  styleUrls: ['./workflows.component.css']
})
export class WorkflowsComponent implements OnInit {



  constructor() { }


  ngOnInit(): void {
  }

  onSubmit(userForm: any) {
    console.log('Form submitted:', userForm.value);
  }

}
