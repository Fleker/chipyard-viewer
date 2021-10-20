import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChipyardFile, parseFile } from '../file-parser';
import { FileParserService } from '../file-parser.service';

@Component({
  selector: 'chipyard-metadata-banner',
  templateUrl: './metadata-banner.component.html',
  styleUrls: ['./metadata-banner.component.css']
})
export class MetadataBannerComponent {
  @Input() chipyardFile?: ChipyardFile
}
