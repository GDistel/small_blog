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
    this.elementRef.nativeElement.style.display = 'none';
    const componentRef = this.viewContainerRef.createComponent(PlaceholderImageComponent);
    setTimeout(() => {
      const elem = componentRef.instance.img.nativeElement;
      elem.src = this.placeholder;
      elem.className = this.elementRef.nativeElement.className;
      elem.alt = this.elementRef.nativeElement.alt + ' placeholder';
    });
  }

  @HostListener('load')
  onLoad(): void {
    this.viewContainerRef.clear();
    this.elementRef.nativeElement.style.display = '';
  }
}
