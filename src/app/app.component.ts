import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { cards } from '../cards';
import { BoardComponent } from './board/board.component';
import { shuffleArray } from './util';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, BoardComponent]
})
export class AppComponent {
  allCards = shuffleArray(cards.map((each) => [each, each]).flat());
}
