import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChipyardFile, parseFile } from '../file-parser';

@Component({
  selector: 'chipyard-text-viewer',
  templateUrl: './text-viewer.component.html',
  styleUrls: ['./text-viewer.component.css']
})
export class TextViewerComponent {
  @Input() chipyardFile?: ChipyardFile
}
