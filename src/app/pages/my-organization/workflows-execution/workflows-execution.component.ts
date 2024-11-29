import { Component, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-workflows-execution',
  templateUrl: './workflows-execution.component.html',
  styleUrls: ['./workflows-execution.component.css']
})
export class WorkflowsExecutionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  refresh: Subject<void> = new Subject<void>();

  // interface calenderEvent={
  //   start: Date;
  //   end?: Date;
  //   title: string;
  //   color: EventColor;
  //   actions?: EventAction[];
  //   allDay?: boolean;
  //   cssClass?: string;
  //   resizable?: {
  //     beforeStart?: boolean;
  //     afterEnd?: boolean;
  //   };
  //   draggable?: boolean;
  //   meta?: MetaType;
  // }



  // view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [ {
    start: new Date(),
    title: 'Vivek Birthday',
    color: { primary: '#ad2121', secondary: '#FAE3E3' },
  },
  {
    start: new Date(),
    title: 'someone marrige',
    color: { primary: '#FAE3E3', secondary: '#ad2121' },
  }
];

  // setView(view: CalendarView) {
  //   this.view = view;
  // }

  dayClicked(day: any): void {
    console.log('Day clicked:', day);
  }

  prevMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() - 1, 1);
    this.refresh.next();
  }

  nextMonth(): void {
    this.viewDate = new Date(this.viewDate.getFullYear(), this.viewDate.getMonth() + 1, 1);
    this.refresh.next();
  }

}
