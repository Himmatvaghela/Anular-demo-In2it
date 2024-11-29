import { Component } from '@angular/core';
import { FormArray, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.css']
})
export class FormBuilderComponent  {

  // constructor() { }
  // fileContent: string | ArrayBuffer | null = null;
  // fileType:string=''
  // onFileChange(event: Event): void {
  //   const input = event.target as HTMLInputElement;

    
  //   if (input.files && input.files.length > 0) {
  //     console.log(input.files[0].type)
  //     this.fileType=input.files[0].type;
  //     const file = input.files[0];
  //     const reader = new FileReader();

      
  //     reader.onload = () => {
  //       this.fileContent = reader.result; // This will contain the file content
  //       console.log(this.fileContent)
  //     };
      
  //     reader.onerror = (error) => {
  //       console.error('Error reading file:', error);
  //     };
      
  //     reader.readAsDataURL(file);
      
  //   }
    
  // }


  constructor(private fb: FormBuilder) {}

  userForm = this.fb.group({
    name: ['', ],
    email: ['', []],
    designation: ['', ],
    managerId: [null, ],
    role: ['', ],
    primaryMobileNumber: ['', []],
    joiningDate: ['', ],
    salary: [null, []],
    department: this.fb.array([
      this.fb.control('')
    ]),
    linkedinUrl: [''],
    facebookUrl: [''],
    instagramUrl: [''],
    addresses: this.fb.array([])
  });
  ngOnInit(): void {

  }

  get department(): FormArray {
    return this.userForm.get('department') as FormArray;
  }

  get addresses(): FormArray {
    return this.userForm.get('addresses') as FormArray;
  }

  addDepartment(department: string): void {
    this.department.push(this.fb.control(department));
  }

  addAddress(): void {
    this.addresses.push(this.fb.group({
      line1: [""],
      state: [""],
      zip: [""],
      city: [""],
      country: [""],
      type: [""]
    }));
  }

  removeAddress(ind:number){
    this.addresses.removeAt(ind)
  }



  onSubmit(): void {
    console.log(this.userForm.value);
  }
 

}
