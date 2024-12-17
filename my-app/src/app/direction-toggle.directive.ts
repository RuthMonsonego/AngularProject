import { Directive, ElementRef, Renderer2, OnInit, OnDestroy } from '@angular/core';
import { DirectionService } from './direction.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appDirectionToggle]'
})
export class DirectionToggleDirective implements OnInit, OnDestroy {
  private subscription !: Subscription;

  constructor(private el: ElementRef, private renderer: Renderer2, private directionService: DirectionService) { }

  ngOnInit() {
    this.subscription = this.directionService.getDirection().subscribe(direction => {
      if (direction === 'LTR') {
        this.renderer.addClass(this.el.nativeElement, 'LTR');
        this.renderer.setStyle(this.el.nativeElement, 'direction', 'ltr');
      } else {
        this.renderer.removeClass(this.el.nativeElement, 'LTR');
        this.renderer.setStyle(this.el.nativeElement, 'direction', 'rtl');
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
