import { Component } from '@angular/core';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent  {
  constructor(private server: ServerService) {}

  width_: number = 0;
  toggleSidebar() {
    this.width_ = this.width_ == 0 ? 17 : 0;
  }

  routing_Links: any = {
    mymenu: [
      { name: 'My task', icon: 'user' },
      { name: 'Team task', icon: 'users' },
    ],
    myorganization: [
      { name: 'Organization', icon: 'file-text' },
      { name: 'Contact', icon: 'git-merge' },
      { name: 'Solution Areas', icon: 'chrome' },
      { name: 'Process', icon: 'git-pull-request' },
      { name: 'Workflows', icon: 'link' },
      { name: 'Human tasks', icon: 'file-text' },
      { name: 'Workflow execution', icon: 'git-merge' },
      { name: 'Shedule list', icon: 'clock' },
    ],
    designer: [
      { name: 'Workflow builder', icon: 'git-merge' },
      { name: 'Form builder', icon: 'trello' },
      { name: 'Charts', icon: 'file-text' },
    ],
    settings: [
      { name: 'Custome task', icon: 'clipboard' },
      { name: 'Organization settings', icon: 'settings' },
    ],
    tables: [
      { name: 'Products', icon: 'clipboard' },
    ],
  };

  routeShowHeader(data: any, mod: string) {
    this.server.setHeader({ links: data.toLowerCase(), module: mod });
  }
}
