import {
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
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
  
  flips: Array<{index: number, symbol: string}> = [];

  penalty = 0;


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


    // new way without internal signals
    this.flips.push({index: cardIndex, symbol: this.cards().at(cardIndex)!});
    if (this.flips.length % 2 == 0) {
      var [first, second] = this.flips.slice(-2);
      if (first.symbol !== second.symbol) {
        this.penalty += this.flips.filter(({symbol}) => symbol === second.symbol).length - 1;;
      }
    }
  }
}
