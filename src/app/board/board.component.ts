import {
  Component,
  computed,
  input,
  signal,
  ɵclearResolutionOfComponentResourcesQueue,
} from '@angular/core';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  imports: [CardComponent],
})
export class BoardComponent {
  cards = input.required<string[]>();
  flipHistory = signal<number[]>([]);
  discovered = computed(() => {
    const flipedSymbols = this.flipHistory()
      .map((each) => this.cards().at(each))
      .sort();

    const discoveredSymbols: string[] = [];
    for (
      let index = 0;
      index < this.flipHistory().length - 1 - (this.flipHistory().length & 1);
      index++
    ) {
      if (
        this.flipHistory().length > 1 &&
        this.flipHistory()[index] !== this.flipHistory()[index + 1] &&
        this.cards()[this.flipHistory()[index]] ===
          this.cards()[this.flipHistory()[index + 1]]
      ) {
        discoveredSymbols.push(this.cards()[this.flipHistory()[index]]!);
      }
    }
    return discoveredSymbols;
  });

  flippedIndices = computed(() => {
    return this.flipHistory().length & 1
      ? this.flipHistory().slice(-1)
      : this.flipHistory().slice(-2);
  });
  
  numberOfAttempts = computed(() => this.flipHistory().length);

  onFlip(cardIndex: number): void {
    const [last] = this.flipHistory().slice(-1);
    if (last === cardIndex) {
      return;
    }
    this.flipHistory.update((current) => current.concat(cardIndex));
  }
}
