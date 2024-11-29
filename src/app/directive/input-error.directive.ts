// input-error.directive.ts
import { Directive, Input, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { AbstractControl,  NgControl } from '@angular/forms';

@Directive({
  selector: '[appInputError]'
})
export class InputErrorDirective {
  @Input('appInputError') controlName!: string;
  private control!: AbstractControl;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private ngControl:NgControl
  ) {}

  @HostListener('blur') onBlur() {
    console.log('call');
    this.setControl();
    this.updateErrorMessage();
  }

  private setControl() {
    // Get the control from NgControl
    this.control = this.ngControl.control as AbstractControl;
    
    if (this.control) {
      this.control.valueChanges.subscribe(() => this.updateErrorMessage());
      this.control.statusChanges.subscribe(() => this.updateErrorMessage());
      
    }
  }



  private updateErrorMessage() {
    if (this.control) {
      const errorMessage = this.getErrorMessage();
      const errorSpan = this.el.nativeElement.nextElementSibling;
      console.log('controll',errorSpan)
      if (errorSpan && errorMessage) {
        this.renderer.setProperty(errorSpan, 'textContent', errorMessage);
        this.renderer.addClass(this.el.nativeElement, 'error');
      } else if (errorSpan) {
        this.renderer.setProperty(errorSpan, 'textContent', '');
        this.renderer.removeClass(this.el.nativeElement, 'error');
      }
    }
  }

  private getErrorMessage(): string | null {
    if (this.control && this.control.invalid && (this.control.dirty || this.control.touched)) {
      const errors = this.control.errors;
      if (errors) {
        if (errors['required']) {
          return 'This field is required';
        } else if (errors['email']) {
          return 'Invalid email address';
        }
        // Add other error messages based on validators
      }
    }
    return null;
  }
}
