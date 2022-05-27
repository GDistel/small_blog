import { Component, Directive, ElementRef, HostListener, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  template: `
    <img #placeholderImage src="assets/images/placeholder.png">
  `
})
class PlaceholderImageComponent {
  @ViewChild('placeholderImage') img!: ElementRef<HTMLImageElement>;
}

@Directive({
  selector: '[appWaitForImage]'
})
export class WaitForImageDirective implements OnInit {

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    const componentRef = this.viewContainerRef.createComponent(PlaceholderImageComponent);
    setTimeout(() => {
      componentRef.instance.img.nativeElement.className = this.elementRef.nativeElement.className;
      componentRef.instance.img.nativeElement.alt = this.elementRef.nativeElement.alt + 'placeholder';
    });
  }

  @HostListener('load')
  onLoad(): void {
    this.viewContainerRef.clear();
  }
}
