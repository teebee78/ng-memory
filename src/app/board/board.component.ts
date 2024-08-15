import {
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { JsonPipe } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { createFind } from 'rxjs/internal/operators/find';

@Component({
  selector: 'app-board',
  standalone: true,
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  imports: [CardComponent],
})
export class BoardComponent {
  cards = input.required<string[]>();
  
  flips: Array<{index: number, symbol: string}> = [];
  discoveredSymbols: string[] = [];
  flippedIndices: number[] = [];
  attempts = 0;
  penalty = 0;
  
  onFlip(cardIndex: number): void {
    const [last] = this.flips.slice(-1);
    if (this.flippedIndices.includes(cardIndex)) { // the clicked card is already flipped. 
      this.flippedIndices = this.flips.length % 2 == 0 ? [] : this.flippedIndices;
      return;
    }

    this.flips.push({index: cardIndex, symbol: this.cards().at(cardIndex)!});
    if (this.flips.length % 2 == 0) {
      this.attempts++;
      var [secondLastFlip, lastFlip] = this.flips.slice(-2);
      this.flippedIndices = [secondLastFlip.index, lastFlip.index];
      if (secondLastFlip.symbol !== lastFlip.symbol) {
        this.penalty += this.flips.filter(({symbol}) => symbol === lastFlip.symbol).length - 1;;
      } else {
        this.discoveredSymbols.push(secondLastFlip.symbol);
      }
    } else {
      var [lastFlip] = this.flips.slice(-1);
      this.flippedIndices = lastFlip ? [lastFlip.index] : [];
    }
  }
}
