import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ChipyardOutput } from '../file-parser';

@Component({
  selector: 'chipyard-hover-card',
  templateUrl: './hover-card.component.html',
  styleUrls: ['./hover-card.component.css']
})
export class HoverCardComponent implements OnChanges {
  @Input() op?: ChipyardOutput

  ngOnChanges(changes: SimpleChanges) {

  }
}
