import { Component, input, signal } from '@angular/core';
import { CardComponent } from "../card/card.component";

@Component({
    selector: 'app-board',
    standalone: true,
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss',
    imports: [CardComponent]
})
export class BoardComponent {

  cards = input.required<string[]>();

}
