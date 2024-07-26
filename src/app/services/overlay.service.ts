import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {

  constructor() { }

  overlaySubjec=new Subject<boolean>()

  overlay=this.overlaySubjec.asObservable();

  showOverlay(){
    this.overlaySubjec.next(true)
  }

  closeOverlay(){
    this.overlaySubjec.next(false)
  }
}
