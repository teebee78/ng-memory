import { Component, HostBinding, HostListener, input, signal } from '@angular/core';
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
  public flipped = signal(false);;

  @HostListener('click')
  public onClick(): void {
    this.flipped.update(current => !current);
  }
}
