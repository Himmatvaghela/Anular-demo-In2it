import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ColDef, GridOptions } from 'ag-grid-community';
import { organizationData } from 'src/app/interface/server';
import { OrganizationService } from 'src/app/services/organization.service';
import { ServerService } from 'src/app/services/server.service';
import { OrgRendererComponent } from '../../shared/cellRenderer/org-renderer/org-renderer.component';


export interface ModifiedContact {
  id:string,
  orgId:string,
  organization:string,
  name:string,
  email:string,
  phone_code:string,
  phone:string,
  other:{medium:string,phone_code_other?:string,fieldVal:string}[]
  role:string,
  additionalRole:string
}[]

@Component({
  selector: 'app-all-contacts',
  templateUrl: './all-contacts.component.html',
  styleUrls: ['./all-contacts.component.css'],
})
export class AllContactsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private serverService: ServerService,
    private orgService: OrganizationService
  ) {}

  activeTabContact: string = '';
  orgData: organizationData[] = [];
  orgOneTimeData: organizationData[] = [];
  orgWiseContact: organizationData[] = [];
  allContacts: any;
  oneTimeAllContact!:ModifiedContact[]

  allContactLength!:number;

  dataToShowProfile: ModifiedContact = {
    id: '',
    orgId: '',
    organization: '',
    name: '',
    email: '',
    phone_code: '',
    phone: '',
    other: [],
    role: '',
    additionalRole: ''
  };

  form_width: number = 0;
  profileShow: boolean = false;
  editMode: boolean = false;
  editContactId: any;

  ContactInfo = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl(''),
    organization: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone_code: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern('^(\\+?d{1,4}[s-])?(?!0+s+,?$)\\d{10}s*,?$'),
      Validators.maxLength(10),
    ]),
    additionalMedium: new FormArray([]),
    role: new FormControl('', [Validators.required]),
    additionalRole: new FormControl(''),
    remark: new FormControl(''),
  });

  get AdditionalMediumKey() {
    return this.ContactInfo.get('additionalMedium') as FormArray;
  }

  colDefs: ColDef[] = [
    { headerCheckboxSelection: true, checkboxSelection: true ,maxWidth:40},
    {
      headerName: 'Oragnization',
      field: 'organization',
      cellRenderer: OrgRendererComponent,
    },
    {
      headerName: 'Name',
      field: 'name',
      cellRenderer: OrgRendererComponent,
      filter:'agMultiColumnFilter'
    },
    { headerName: 'Role', field: 'role', filter:'agMultiColumnFilter' },
    { headerName: 'Email', field: 'email' },
    { headerName: 'Phone', field: 'phone' },
  ];

  handleCheckBox(data:ModifiedContact[]){
    this.checkBoxSelectedData=data;
  }
  gridOptions!:GridOptions;

  ngOnInit(): void {
    this.gridOptions={
      context:{component:this,parent:'allContactComp'}
    }

    this.orgOneTimeData = JSON.parse(
      localStorage.getItem('organizations') as string
    );

    this.orgData = this.orgOneTimeData;
    this.orgWiseContact = this.orgOneTimeData;
    //show all contact list
    this.setAllContact()
    this.oneTimeAllContact=this.allContacts;
    this.allContactLength=this.allContacts.length;

    //remove all tab from tab bar and add active id -0

    // localStorage.setItem('tab', JSON.stringify([]));
		this.orgService.setActiveTabId('0')
    
    this.route.url.subscribe((val) => {
      console.log(val)
      this.serverService.setHeader({
        links: val[0].path,
        module: 'my-organization',
      });
    });
  }

  setAllContact(){
    this.allContacts = this.orgWiseContact.reduce((pre: any, cur: any) => {
      const contacData = cur.contacts.reduce((pr: any, cr: any) => {
        return [
          ...pr,
          { ...cr, orgId: cur.id, organization: cur.organization },
        ];
      }, []);
      pre.push(...contacData);
      return pre;
    }, []);
  }

  addInputField() {
    // Push the new FormGroup to the FormArray
    (this.ContactInfo.get('additionalMedium') as FormArray).push(
      new FormGroup({
        medium: new FormControl(''),
        fieldVal: new FormControl(''),
      })
    );
  }

  deleteField(ind: number) {
    this.AdditionalMediumKey.removeAt(ind);
  }

  otherFieldSelect(e: any, i: number) {
    let ph_code = e.target.value;
    if (ph_code == 'phone') {
      (this.ContactInfo.get('additionalMedium') as FormArray).setControl(
        i,
        new FormGroup({
          medium: new FormControl('phone'),
          phone_code_other: new FormControl(''),
          fieldVal: new FormControl(''),
        })
      );
    }
  }

  checkOtherMedium(ind: number) {
    return this.AdditionalMediumKey.at(ind).get('medium')?.value;
  }

  //onclick of particulr organization tab filter contact logic

  filterOrganization(type: string) {
    if (type == '') {
      const filteredData = this.orgOneTimeData;
      this.orgData = filteredData;
      
    } else {
      const filteredData = this.orgOneTimeData.filter((val) => {
        return type == val.organization;
      });
      this.orgData = filteredData;
    }

    this.allContacts = this.orgData.reduce((pre: any, cur: any) => {
      const contacData = cur.contacts.reduce((pr: any, cr: any) => {
        return [
          ...pr,
          { ...cr, orgId: cur.id, organization: cur.organization },
        ];
      }, []);
      pre.push(...contacData);
      return pre;
    }, []);
    this.checkBoxSelectedData = [];

    this.activeTabContact = type;
  }

  setTab(orgId: string) {
    let tabData = this.orgData.filter((val) => {
      return val.id == orgId;
    });
    this.orgService.setOrgTab(tabData[0]);
    this.orgService.setActiveTabId(orgId);
    // this.routernav.navigate(['/my-organization/organization/details'], { state: {data} });
    this.router.navigate(['/my-organization/organization/details']);
  }

  searchValue1(event: any) {
    let searchValue = event.target.value;
    if (!searchValue) {
      this.orgWiseContact = this.orgOneTimeData;
    } else {
      searchValue = searchValue.toLowerCase();
      this.orgWiseContact = this.orgOneTimeData.filter(
        (data: organizationData) => {
          return data.organization.toLowerCase().includes(searchValue);
        }
      );
    }
  }

  searchValue2(event:any){
    let searchValue = event.target.value;
    if (!searchValue) {
      // this.orgWiseContact = this.orgOneTimeData;
      this.allContacts=this.oneTimeAllContact;
    } else {
      searchValue = searchValue.toLowerCase();
      this.allContacts = this.oneTimeAllContact.filter(
        (data: ModifiedContact) => {
          return (
            data.organization.toLowerCase().includes(searchValue) ||
            data.name.toLowerCase().includes(searchValue) 
          )
        }
      );
    }
  }


  openForm() {
    //for reseting edit...
    this.resetValue();
    //
    this.profileShow = false;
    this.form_width = 35;
    this.editMode = false;
    this.editContactId = '';

    this.ContactInfo.get('organization')?.patchValue(this.activeTabContact);
    if (this.activeTabContact != '') {
      this.ContactInfo.get('organization')?.disable();

      this.orgSelect();
    } else {
      this.ContactInfo.get('organization')?.enable();
    }
  }

  closeForm() {
    this.form_width = 0;
    this.resetValue();
  }

  profileOpen(contactData:ModifiedContact) {
    this.dataToShowProfile=contactData;
    
    this.profileShow = true;
    this.form_width = 35;
    this.removeAllArrayItems();
  }

  //checkbox select logic
  checkBoxSelectedData: ModifiedContact[] = [];
  // findAllContactLen

  //top edit button click
  editOnTopButton() {
    this.clearValue();

    //edit logic repeat
    this.dataToShowProfile = this.checkBoxSelectedData[0];
    this.editContact(this.checkBoxSelectedData[0]);
    this.form_width = 35;
  }

  //edit button click in side profile
  editContact(editData: ModifiedContact) {
    this.editMode = true;
    this.profileShow = false;
    this.editContactId = editData.id;

    const fName = editData.name.split(' ')[0];
    const lName = editData.name.split(' ')[1];
    this.ContactInfo.patchValue({
      firstName: fName,
      lastName: lName,
      organization: editData.organization,
      email: editData.email,
      phone_code: editData.phone_code,
      phone: editData.phone,
      role: editData.role,
      additionalRole: editData.additionalRole,
    });

    editData.other.map(({ medium, fieldVal, phone_code_other }) => {
      if (medium == 'phone') {
        (this.ContactInfo.get('additionalMedium') as FormArray).push(
          new FormGroup({
            medium: new FormControl(medium),
            phone_code_other: new FormControl(phone_code_other),
            fieldVal: new FormControl(fieldVal),
          })
        );
      } else {
        (this.ContactInfo.get('additionalMedium') as FormArray).push(
          new FormGroup({
            medium: new FormControl(medium),
            fieldVal: new FormControl(fieldVal),
          })
        );
      }
    });

    this.ContactInfo.get('organization')?.disable();

    //enable or disable org spoc
    if (editData.role == 'Org SPOC') {
      this.disableOrgSpoc = false;
    } else {
      const allOrg = this.orgService.getOrganizationData();
      const filterOrg: organizationData = allOrg.filter(
        (val: organizationData) => {
          return val.organization == editData.organization;
        }
      )[0];
      const roleExist = filterOrg.contacts.some(({ role }) => {
        return role == 'Org SPOC';
      });

      this.disableOrgSpoc = roleExist;
    }
  }

  deleteContacts() {
    const allOrg = this.orgService.getOrganizationData() as organizationData[];
    allOrg.map((val) => {
      let isOrg = this.checkBoxSelectedData.some(({ orgId }) => {
        return orgId == val.id;
      });
      let data = val.contacts;

      if (isOrg) {
        let filterIdsSet = new Set(
          this.checkBoxSelectedData.map((obj) => obj.id)
        );
        data = [];
        val.contacts.map((conVal) => {
          if (!filterIdsSet.has(conVal.id)) {
            data.push(conVal);
          }
          return conVal;
        });
      }
      val.contacts = data;
      return val;
    });


    localStorage.setItem('organizations', JSON.stringify(allOrg));
    this.orgOneTimeData = allOrg;
    this.orgData = this.orgOneTimeData;
    this.orgWiseContact = this.orgOneTimeData;
    
    this.checkBoxSelectedData = [];

    this.setAllContact()

    this.allContactLength=this.allContacts.length;
    this.filterOrganization(this.activeTabContact);
  }

  roles: string[] = ['Org SPOC', 'Site SPOC', 'Junior SPOC'];

  //on organization select enable disable org-spoc
  disableOrgSpoc: boolean = false;
  orgSelect() {
    const allOrg = this.orgService.getOrganizationData();
    const filterOrg: organizationData = allOrg.filter(
      (val: organizationData) => {
        return (
          val.organization ==
          (this.ContactInfo.get('organization')?.value || this.activeTabContact)
        );
      }
    )[0];

    const roleExist = filterOrg.contacts.some(({ role }) => {
      return role == 'Org SPOC';
    });
    this.disableOrgSpoc = roleExist;
    //making org-spoc empty
    if (roleExist) {
      this.ContactInfo.get('role')?.patchValue('');
    }
  }

  //removing existing array fields after submit...
  removeAllArrayItems() {
    this.AdditionalMediumKey.clear();
  }

  contactInfoSubmit() {
    if (this.ContactInfo.valid) {
      const data = this.ContactInfo.value;

      if (this.editMode && this.editContactId != '') {
        const preparedData = {
          id: this.editContactId,
          name: data.firstName + ' ' + data.lastName,
          phone_code: data.phone_code,
          phone: data.phone,
          email: data.email,
          role: data.role,
          other: data.additionalMedium,
          additionalRole: data.additionalRole,
        };

        preparedData.other = data.additionalMedium.filter((val: any) => {
          return val.medium != '' && val.fieldVal != '';
        });

        preparedData.phone = String(preparedData.phone);

        const allOrg: organizationData[] =
          this.orgService.getOrganizationData();
        const findInd = allOrg.findIndex((val: organizationData) => {
          return (
            val.organization ==
            (data.organization || this.dataToShowProfile.organization)
          );
        });

        //removed exiting contact and added new one in that
        const contcInd = allOrg[findInd].contacts.findIndex(({ id }) => {
          return id == this.editContactId;
        });

        allOrg[findInd].contacts.splice(contcInd, 1, preparedData);

        localStorage.setItem('organizations', JSON.stringify(allOrg));
        this.dataToShowProfile = {...preparedData,orgId:allOrg[findInd].id,organization:allOrg[findInd].organization};
        this.editMode = false;
        this.editContactId = '';
        this.profileShow = true;

        //code to show update on ui
        this.orgOneTimeData = allOrg;

      } else {
        const uniqueId = Math.random().toString(36).substr(2, 9);
        const preparedData = {
          id: uniqueId,
          name: data.firstName + ' ' + data.lastName,
          phone_code: data.phone_code,
          phone: data.phone,
          email: data.email,
          role: data.role,
          other: data.additionalMedium,
          additionalRole: data.additionalRole,
        };

        preparedData.other = data.additionalMedium.filter((val: any) => {
          return val.medium != '' && val.fieldVal != '';
        });

        preparedData.phone = String(preparedData.phone);

        const allOrg: organizationData[] =
          this.orgService.getOrganizationData();
        const findInd = allOrg.findIndex((val: organizationData) => {
          return (
            // val.organization == (data.organization || this.activeTabContact)
            val.organization==data.organization
          );
        });

        allOrg[findInd].contacts.unshift(preparedData);
        localStorage.setItem('organizations', JSON.stringify(allOrg));

        //code to show update on ui
        this.orgOneTimeData = allOrg;
        this.closeForm();
      }

      //code to show update on ui

      this.orgData = this.orgOneTimeData;
      this.orgWiseContact = this.orgOneTimeData;

      this.checkBoxSelectedData = [];
      this.setAllContact()
      this.filterOrganization(this.activeTabContact);


      this.resetValue();
    } else {
      let key = Object.keys(this.ContactInfo.controls);
      key.map((val) => {
        let control =
          this.ContactInfo.controls[
            val as keyof typeof this.ContactInfo.controls
          ];
        if (control.errors) {
          control.markAsTouched();
        }
      });
    }
  }

  // trackByOrganization(_index: number, item: any): number {
  //   return item.id;
  // }

  // trackByContact(_index: number, item: any): number {
  //   return item.id;
  // }

  //reset all value
  resetValue() {
    this.removeAllArrayItems();
    this.ContactInfo.reset();
    this.ContactInfo.get('organization')?.patchValue('');
    this.ContactInfo.get('role')?.patchValue('');
    this.ContactInfo.get('phone_code')?.patchValue('');
  }

  //clear info on clear button click
  clearValue() {
    this.removeAllArrayItems();
    this.ContactInfo.patchValue({
      firstName: '',
      lastName: '',
      email: '',
      phone_code: '',
      phone: '',
      role: '',
      additionalRole: '',
      remark: '',
    });
  }
}
