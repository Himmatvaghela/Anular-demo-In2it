import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { ServerService } from 'src/app/services/server.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  header: {links:string,module:string} ={
    links: '',
    module: ''
  }
  unsubSubject = new Subject();
  constructor(private serverService: ServerService){
    this.serverService.headerSub.pipe(takeUntil(this.unsubSubject)).subscribe((data:any)=> this.header = data);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubSubject.next(null);
    this.unsubSubject.complete();
  }
}
