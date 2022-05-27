import { Component, Directive, ElementRef, HostListener, Input, OnInit, ViewChild, ViewContainerRef } from '@angular/core';

@Component({
  template: `
    <img #placeholderImage>
  `
})
class PlaceholderImageComponent {
  @ViewChild('placeholderImage') img!: ElementRef<HTMLImageElement>;
}

@Directive({
  selector: '[appWaitWithPlaceholder]'
})
export class WaitWithPlaceholder implements OnInit {
  @Input('appWaitWithPlaceholder') placeholder!: string;

  constructor(
    private elementRef: ElementRef,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit(): void {
    const componentRef = this.viewContainerRef.createComponent(PlaceholderImageComponent);
    setTimeout(() => {
      componentRef.instance.img.nativeElement.src = this.placeholder;
      componentRef.instance.img.nativeElement.className = this.elementRef.nativeElement.className;
      componentRef.instance.img.nativeElement.alt = this.elementRef.nativeElement.alt + ' placeholder';
    });
  }

  @HostListener('load')
  onLoad(): void {
    this.viewContainerRef.clear();
  }
}
