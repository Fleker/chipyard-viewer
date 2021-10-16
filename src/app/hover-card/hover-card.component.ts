import { Component, OnInit, OnChanges, Input, SimpleChanges, HostBinding } from '@angular/core';
import { ChipyardOutput } from '../file-parser';

@Component({
  selector: 'chipyard-hover-card',
  templateUrl: './hover-card.component.html',
  styleUrls: ['./hover-card.component.css']
})
export class HoverCardComponent implements OnInit {
  @Input() op?: ChipyardOutput
  @HostBinding('class.dark') darkTheme: boolean = false

  ngOnInit() {
    this.darkTheme = document.getElementsByTagName('body')[0].classList.contains('dark')
  }
}
