import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'chipyard-text-viewer',
  templateUrl: './text-viewer.component.html',
  styleUrls: ['./text-viewer.component.css']
})
export class TextViewerComponent implements OnChanges {
  @Input() fileData?: string
  lines?: string[]

  ngOnChanges(changes: SimpleChanges) {
    this.lines = changes.fileData.currentValue.split('\n')
  }
}
