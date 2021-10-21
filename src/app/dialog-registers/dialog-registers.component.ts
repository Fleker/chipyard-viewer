import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FileParserService } from '../file-parser.service';
import { SettingsService, TSettingsTheme } from '../settings.service';

interface RegisterTimeMap {
  clock: number
  value: string
}

@Component({
  selector: 'dialog-registers',
  templateUrl: './dialog-registers.component.html',
  styleUrls: ['./dialog-registers.component.css']
})
export class DialogRegistersComponent implements OnInit {
  @ViewChild('dialog') dialog?: ElementRef;
  @HostBinding('class.dark') darkTheme: boolean = false
  numCycles: number = 1
  /**
   * Mapping of every register and how it changes over time.
   */
  private registerMap: Record<string, RegisterTimeMap[]> = {}
  /**
   * Array of registers to their current value with index = register number.
   */
  registerValues: string[] = []

  constructor(
    private settings: SettingsService,
    private fileParser: FileParserService,
  ) { }

  openDialog() {
    const dialog = this.dialog?.nativeElement as any
    dialog.showModal()
  }

  closeDialog() {
    const dialog = this.dialog?.nativeElement as any
    dialog.close()
  }

  ngOnInit(): void {
    this.settings.listen('theme').subscribe((theme: TSettingsTheme) => {
      this.darkTheme = theme === 'dark'
    })
    this.fileParser.chipyardSubject.subscribe(file => {
      this.registerMap = {} // Clear
      file.operations.forEach(op => {
        const {writeRegister, writeValue, clock} = op
        if (this.registerMap[writeRegister]) {
          this.registerMap[writeRegister].push({
            clock,
            value: writeValue,
          })
        } else {
          this.registerMap[writeRegister] = [{
            clock: 0,
            value: '0'.repeat(16),
          }, {
            clock,
            value: writeValue,
          }]
        }
        this.numCycles = op.pgmLength
        // Reset labels
        this.registerValues = Array(Object.keys(this.registerMap).length)
          .fill('0'.repeat(16))
        this.reloadRegistersAt(op.pgmLength)
      })
    })
  }

  reloadRegistersAt(cycle: number) {
    // This can be computationally expensive as it recalculates at each step.
    for (let i = 0; i < cycle; i++) {
      Object.entries(this.registerMap).forEach(([key, register]) => {
        const index = parseInt(key.replace('r', ''))
        register.forEach(entry => {
          if (entry.clock <= cycle) {
            this.registerValues[index] = entry.value
          }
        })
      })
    }
  }

  showRegistersAt($event: Event) {
    const target = $event.target as HTMLInputElement
    const cycle = target.valueAsNumber
    this.reloadRegistersAt(cycle)
  }
}
