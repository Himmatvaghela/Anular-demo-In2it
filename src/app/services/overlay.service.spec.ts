import { TestBed } from '@angular/core/testing';

import { OverlayService } from './overlay.service';

describe('OverlayService', () => {
  let service: OverlayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OverlayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('show Overlay',()=>{
    let emmitedData:Boolean | undefined;

    service.overlaySubjec.subscribe((val)=>{
      emmitedData=val
    })

    service.showOverlay();
    expect(emmitedData).toBeTruthy()
  })

  it('close Overlay',()=>{
    let emmitedData:Boolean | undefined;

    service.overlaySubjec.subscribe((val)=>{
      emmitedData=val
    })

    service.closeOverlay();
    expect(emmitedData).toBeFalse()
  })
});
