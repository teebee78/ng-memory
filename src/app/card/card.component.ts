import { Component, HostBinding, HostListener, input, model, signal } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [NgClass],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {

  public symbol = input.required();
  public flipped = model.required<boolean>();
  public discovered = input.required<boolean>();

  @HostListener('click')
  public onClick(): void {
    this.flipped.update(current => !current);
  }

  @HostBinding('class.discovered')
  get isDiscovered(): boolean {
    return this.discovered();
  }
}
