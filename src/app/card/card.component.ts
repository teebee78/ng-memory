import {
  animate,
  animateChild,
  group,
  query,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NgClass } from '@angular/common';
import {
  Component,
  HostBinding,
  HostListener,
  input,
  model,
} from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  animations: [
    trigger('revealed', [
      state('true', style({ opacity: 1, scale: 1 })),
      state('false', style({ opacity: 0, scale: 0.5 })),
      transition('* => *', animate('250ms ease')),
    ]),
    trigger('vanish', [
      transition(':leave', [
        animate(
          '500ms ease-out',
          style({ opacity: 0, scale: 2, border: 'none' })
        ),
      ]),
    ]),
    trigger('disappear', [
      state('show', style({ scale: 1, opacity: 1 })),
      state('hide', style({ scale: 1.5, opacity: 0 })),
      transition('show => hide', animate('250ms ease')),
    ]),
    trigger('colorBorder', [
      state('true', style({ borderColor: 'aliceblue' })),
      state('false', style({ borderColor: '#555' })),
      transition('* => *', [
        group([
          query('@revealed', animateChild(), { optional: true }),
          animate('250ms ease'),
        ]),
      ]),
    ]),
  ],
})
export class CardComponent {
  public symbol = input.required();
  public flipped = model.required<boolean>();
  public discovered = input.required<boolean>();

  @HostListener('click')
  public onClick(): void {
    this.flipped.update((current) => !current);
  }

  @HostBinding('class.discovered')
  get isDiscovered(): boolean {
    return this.discovered();
  }

  @HostBinding('@disappear')
  get vanish(): string {
    return !this.discovered() ? 'show' : 'hide';
  }

  @HostBinding('@colorBorder')
  get colorBorder(): boolean {
    return this.flipped();
  }
}
