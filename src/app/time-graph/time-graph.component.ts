import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChipyardFile, ChipyardOutput, parseFile } from '../file-parser';

@Component({
  selector: 'chipyard-time-graph',
  templateUrl: './time-graph.component.html',
  styleUrls: ['./time-graph.component.css']
})
export class TimeGraphComponent implements OnChanges {
  @Input() chipyardFile?: ChipyardFile
  lines?: ChipyardOutput[]
  pgmLength: number = 1
  // for hovercard
  hoverOp?: ChipyardOutput
  hoverX: number = 0
  hoverY: number = 0

  ngOnChanges(changes: SimpleChanges) {
    const data = changes.chipyardFile.currentValue as ChipyardFile
    if (!data) return
    const {operations} = data
    this.lines = operations
    this.pgmLength = this.lines[this.lines.length - 1].clock
  }

  openHoverCard(ev: MouseEvent) {
    const {pageX, pageY} = ev
    const target = ev.target as HTMLDivElement
    const index = parseInt(target.dataset['index']!)
    this.hoverX = Math.floor(pageX / 60) * 60 - 200
    this.hoverY = pageY + 30
    this.hoverOp = this.lines![index]
  }
}
