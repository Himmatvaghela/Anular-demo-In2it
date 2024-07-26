import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { organizationData } from '../interface/server';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {

  constructor() { }

  orgDataSub= new Subject<organizationData>()
  activeTabSub= new BehaviorSubject('0')

  setActiveTabId(id:any){
    this.activeTabSub.next(id)
  }

  setOrgTab(data:organizationData){
    this.orgDataSub.next(data)
  }

  getOrganizationData():organizationData[]{
    // localStorage.setItem('organizations',JSON.stringify(this.getData))
    return JSON.parse(localStorage.getItem('organizations') as string) || []
  }

  // getData:organizationData[]=[
  //   {
  //     "id": "1",
  //     "organization": "ABC Corporation",
  //     "type": "Customer",
  //     "industry": "Technology",
  //     "onboarding": "2022-01-01",
  //     "related_orgs": ["XYZ Inc.", "123 Enterprises"],
  //     "products": ["Product A", "Product B", "Product C"],
  //     "org_SPOC": "John Doe",
  //     "description": "Leading technology company specializing in software development.",
  //     "cluster": "IT",
  //     "tier": "Enterprise",
  //     "address": "123 Main Street, City, Country",
  //     "contacts": [
  //       {
  //         "id":'a5f7g2h4j',
  //         "name": "John Doe",
  //         "email": "john.doe@abccorp.com",
  //         'phone_code':'+91',
  //         "phone": "1234567890",
  //         'other':[{medium:'Whatsapp',fieldVal:'88398329'}],
  //         'role':'Org SPOC',
  //         'additionalRole':''
  //       },
  //       {
  //         "id":'k8n3m9z6i',
  //         "name": "John Papa",
  //         "email": "john.doe@abccorp.com",
  //         'phone_code':'+91',
  //         "phone": "1234564454",
  //         'other':[{medium:'Whatsapp',fieldVal:'88398329'}],
  //         'role':'Site SPOC',
  //         'additionalRole':''
  //       }
  //     ]
  //   },
  //   {
  //     "id": "2",
  //     "organization": "XYZ Inc.",
  //     "type": "Customer",
  //     "industry": "Finance",
  //     "onboarding": "2021-12-15",
  //     "related_orgs": ["ABC Corporation", "123 Enterprises"],
  //     "products": ["Product X", "Product Y"],
  //     "org_SPOC": "Jane Smith",
  //     "description": "Financial services firm offering investment banking and asset management services.",
  //     "cluster": "Finance",
  //     "tier": "Mid-Market",
  //     "address": "456 Oak Avenue, City, Country",
  //     "contacts": [
  //       {
  //         'id':'r4s2t6l1p',
  //         "name": "Jane Smith",
  //         "email": "jane.smith@xyzinc.com",
  //         'phone_code':'+91',
  //         "phone": "9876543210",
  //         'other':[],
  //         'role':'Site SPOC',
  //         'additionalRole':''
  //       }
  //     ],
      
  //   },
  //   {
  //     "id": "3",
  //     "organization": "123 Enterprises",
  //     "type": "Non customer",
  //     "industry": "Retail",
  //     "onboarding": "2022-02-05",
  //     "related_orgs": ["ABC Corporation", "XYZ Inc."],
  //     "products": ["Product M", "Product N"],
  //     "org_SPOC": "Michael Johnson",
  //     "description": "Retail chain offering a wide range of products including electronics, apparel, and home goods.",
  //     "cluster": "Retail",
  //     "tier": "Large Enterprise",
  //     "address": "789 Elm Street, City, Country",
  //     "contacts": [
  //       {
  //         'id':'q9o3e7d5c',
  //         "name": "Michael Johnson",
  //         "email": "michael.johnson@123ent.com",
  //         'phone_code':'+91',
  //         "phone": "5551234567",
  //         'other':[],
  //         'role':'Site SPOC',
  //         'additionalRole':''
  //       }
  //     ],
      
  //   },
  //   {
  //     "id": "4",
  //     "organization": "Tech Solutions Ltd.",
  //     "type": "Non customer",
  //     "industry": "IT Services",
  //     "onboarding": "2022-03-10",
  //     "related_orgs": [],
  //     "products": ["Tech Service 1", "Tech Service 2"],
  //     "org_SPOC": "Emily Brown",
  //     "description": "Provider of IT consulting and software development services.",
  //     "cluster": "IT",
  //     "tier": "Small Business",
  //     "address": "101 Pine Street, City, Country",
  //     "contacts": [
  //       {
  //         'id':'w2x8v1u6y',
  //         "name": "Emily Brown",
  //         "email": "emily.brown@techsolutions.com",
  //         'phone_code':'+91',
  //         "phone": "1112223333",
  //         'other':[{medium:'Facebook',fieldVal:'88398329'},{medium:'Whatsapp',fieldVal:'88398329'}],
  //         'role':'Org SPOC',
  //         'additionalRole':''
  //       }
  //     ]
  //   },
  //   {
  //     "id": "5",
  //     "organization": "Global Pharma Inc.",
  //     "type": "Non customer",
  //     "industry": "Pharmaceuticals",
  //     "onboarding": "2022-04-20",
  //     "related_orgs": [],
  //     "products": ["Drug A", "Drug B", "Drug C"],
  //     "org_SPOC": "David Lee",
  //     "description": "Global pharmaceutical company developing and manufacturing innovative drugs.",
  //     "cluster": "Healthcare",
  //     "tier": "Large Enterprise",
  //     "address": "202 Maple Avenue, City, Country",
  //     "contacts": [
  //       {
  //         'id':'i7t4r6e9w',
  //         "name": "David Lee",
  //         "email": "david.lee@globalpharma.com",
  //         'phone_code':'+91',
  //         "phone": "4445556666",
  //         'other':[{medium:'Whatsapp',fieldVal:'88398329'}],
  //         'role':'Org SPOC',
  //         'additionalRole':''
  //       }
  //     ]
  //   },
  //   ]
  
  
}
