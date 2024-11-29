import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-solution-areas',
  templateUrl: './solution-areas.component.html',
  styleUrls: ['./solution-areas.component.css']
})
export class SolutionAreasComponent implements OnInit {




  constructor(private fb:FormBuilder ) {
  }

  ngOnInit(): void {
  }

  signUpForm=this.fb.group({
    name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    address:this.fb.array([
      this.fb.group({
        city:['',[Validators.required]],
        country:['',[Validators.required]]
      })
    ]),
    likeFruit:['No'],
    reason:['']
  })

  get addressControl(){
    return this.signUpForm.get('address') as FormArray;
  }

  addField() {
    this.addressControl.push(
      this.fb.group({
        city:['',[Validators.required]],
        country:['',[Validators.required]]
      })
    )
  }

  removeField(i:number) {
    if(this.addressControl.length < 2){
      return;
    }else{
      this.addressControl.removeAt(i);
    }
  }

  radioButtonChanged(){
    console.log(this.signUpForm.get('likeFruit')?.value)
    if(this.signUpForm.get('likeFruit')?.value == 'Yes'){
      console.log('inside')
      this.signUpForm.get('reason')?.setValidators([Validators.required]);
      this.signUpForm.get('reason')?.updateValueAndValidity();
    }else{
      this.signUpForm.get('reason')?.removeValidators([Validators.required])
      this.signUpForm.get('reason')?.updateValueAndValidity();
    }
  }


  SubmitFunc(){
    if (this.signUpForm.valid) {
      console.log(this.signUpForm.value)
      
    }else{
      console.log(this.signUpForm)

      let key=Object.keys(this.signUpForm.controls)
      
      key.map((val)=>{
        let control=this.signUpForm.controls[val as keyof typeof this.signUpForm.controls]
        if(control.errors){
          control.markAsTouched()
        }
      })
    }
  }

}
