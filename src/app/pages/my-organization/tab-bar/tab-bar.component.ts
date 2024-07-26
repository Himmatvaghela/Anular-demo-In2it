import { Component, OnDestroy, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import {  Subject, takeUntil } from 'rxjs';
import { organizationData } from 'src/app/interface/server';
import { OrganizationService } from 'src/app/services/organization.service';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-tab-bar',
  templateUrl: './tab-bar.component.html',
  styleUrls: ['./tab-bar.component.css']
})
export class TabBarComponent implements OnInit,OnDestroy {

	header: {links:string,module:string} ={
		links: '',
		module: ''
	  }

	navs:organizationData[]=[]
	unsub=new Subject()
	unSubHeader = new Subject();
	  activeIdUnSub=new Subject()

  constructor(private serverService: ServerService,private orgService:OrganizationService,private router:Router){
	this.serverService.headerSub.pipe(takeUntil(this.unSubHeader)).subscribe((data:any)=> {
		this.header = data
	});

	this.orgService.orgDataSub.pipe(takeUntil(this.unsub)).subscribe((val)=>{
		const ind=this.navs.findIndex((TabVal)=>{
			return TabVal.id==val.id;
		})
		// this.active=JSON.parse(localStorage.getItem('activeTab') as string)
		if (ind < 0) {
			this.add(val)
		}
	})

	this.orgService.activeTabSub.pipe(takeUntil(this.activeIdUnSub)).subscribe((val)=>{
		this.active=val
	})
  }

  ngOnInit(): void {
	this.navs=this.getTabs()
	this.orgService.activeTabSub.pipe(takeUntil(this.activeIdUnSub)).subscribe((val)=>{
		this.active=val
	})
  }

  ngOnDestroy(): void {
	this.unsub.next(null);
	this.unsub.complete();
	this.unSubHeader.next(null);
	this.unSubHeader.complete()
	this.activeIdUnSub.next(null);
	this.activeIdUnSub.complete()
  }

	counter = this.navs.length + 1;
	active: string='1';

	getTabs(){
		return JSON.parse(localStorage.getItem('tab') as string) || []
	}

	close( toRemove: string) {
		const allTabs=this.getTabs()
		const updatedTabs = allTabs.filter((val:organizationData) => val.id !== toRemove);
		localStorage.setItem('tab',JSON.stringify(updatedTabs))
		this.navs=updatedTabs;
		if (this.navs.length && this.active === toRemove) {

			this.active=this.navs[this.navs.length-1].id;
			this.router.navigate(['/my-organization/organization/details'])
			this.orgService.setActiveTabId(this.active)
		}else if(this.navs.length===0){
			this.active='0'
			this.router.navigate(['/my-organization/organization'])
			this.orgService.setActiveTabId(this.active)
		}
	}

	add(data: organizationData) {
		const allTabs=JSON.parse(localStorage.getItem('tab') as string) || []
		allTabs.push(data)
		localStorage.setItem('tab',JSON.stringify(allTabs))
		this.navs=allTabs
	}

	activeTab(id:string){
		// localStorage.setItem('activeTab',JSON.stringify(id))
		this.active=id;

		this.orgService.setActiveTabId(id)
		if(id=='0'){
			this.router.navigate(['/my-organization/'+this.header.links] )
		}else{
			this.router.navigate(['/my-organization/organization/details'] )
		}
	}
}
