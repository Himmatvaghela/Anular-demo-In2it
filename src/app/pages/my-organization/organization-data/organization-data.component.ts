import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { organizationData } from 'src/app/interface/server';
import { OrganizationService } from 'src/app/services/organization.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-organization-data',
  templateUrl: './organization-data.component.html',
  styleUrls: ['./organization-data.component.css']
})
export class OrganizationDataComponent implements OnInit {


  unSub=new Subject()
  constructor(private route:ActivatedRoute,private serverService:ServerService,private orgService:OrganizationService,private router:Router) { 
    
    this.orgService.activeTabSub.pipe(takeUntil(this.unSub)).subscribe((val)=>{
      this.urlId=val
      if (this.urlId!='0') {
        const data=JSON.parse(localStorage.getItem('tab') as string)
        this.orgData=data.filter((val:organizationData)=>{
          return val.id==this.urlId
        })[0]
        
      }
    })
  }

  ngOnDestroy(): void {
    this.unSub.next(null);
    this.unSub.complete();
    }
 
  
  active:any = 1;
  urlId:any;
  orgData:organizationData={
    id: '',
    organization: '',
    type: '',
    industry: '',
    onboarding: '',
    related_orgs: [],
    products: [],
    org_SPOC: '',
    description: '',
    cluster: '',
    tier: '',
    address: '',
    contacts: [{id:'', name: '',email: '',phone_code:'',phone: '', role: '',other:[{medium:'',fieldVal:''}],additionalRole:''}]
  };
  ngOnInit(): void {

    if(this.urlId==0){
      this.router.navigate(['/my-organization/organization'])
    }


    this.route.url.subscribe((val)=>{
      this.serverService.setHeader({links:val[0].path,module:'my-organization'})
    })
  }


}
