import { Component, OnInit, OnChanges, Input, SimpleChanges, HostBinding } from '@angular/core';
import { AsmIns, RiscvAsm } from 'src/riscv-asm';
import { ChipyardOutput } from '../file-parser';
import { SettingsService, TSettingsTheme } from '../settings.service';

@Component({
  selector: 'chipyard-hover-card',
  templateUrl: './hover-card.component.html',
  styleUrls: ['./hover-card.component.css']
})
export class HoverCardComponent implements OnInit, OnChanges {
  @Input() op?: ChipyardOutput
  @HostBinding('class.dark') darkTheme: boolean = false
  opInfo?: AsmIns
  settings: SettingsService = new SettingsService()

  ngOnInit() {
    this.settings.listen('theme').subscribe((theme: TSettingsTheme) => {
      this.darkTheme = theme === 'dark'
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    const op = changes.op.currentValue as ChipyardOutput
    this.opInfo = RiscvAsm[op.instructionName]
  }
}
