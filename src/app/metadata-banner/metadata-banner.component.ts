import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChipyardFile, parseFile } from '../file-parser';

@Component({
  selector: 'chipyard-metadata-banner',
  templateUrl: './metadata-banner.component.html',
  styleUrls: ['./metadata-banner.component.css']
})
export class MetadataBannerComponent implements OnChanges {
  @Input() fileData?: string
  chipyardFile?: ChipyardFile

  ngOnChanges(changes: SimpleChanges) {
    const data = changes.fileData.currentValue
    if (!data) return
    this.chipyardFile = parseFile(data)
  }
}
