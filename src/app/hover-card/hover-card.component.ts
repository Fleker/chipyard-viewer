import { Component, OnInit, OnChanges, Input, SimpleChanges, HostBinding } from '@angular/core';
import { ChipyardOutput } from '../file-parser';
import { SettingsService, TSettingsTheme } from '../settings.service';

@Component({
  selector: 'chipyard-hover-card',
  templateUrl: './hover-card.component.html',
  styleUrls: ['./hover-card.component.css']
})
export class HoverCardComponent implements OnInit {
  @Input() op?: ChipyardOutput
  @HostBinding('class.dark') darkTheme: boolean = false
  settings: SettingsService = new SettingsService()

  ngOnInit() {
    this.settings.listen('theme').subscribe((theme: TSettingsTheme) => {
      this.darkTheme = theme === 'dark'
    })
  }
}
