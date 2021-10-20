import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ChipyardFile, parseFile } from './file-parser';

@Injectable({
  providedIn: 'root'
})
export class FileParserService {
  readonly chipyardSubject: Subject<ChipyardFile> = new Subject()

  constructor() {}

  parseFile(rawFile: string) {
    const chipyardFile = parseFile(rawFile)
    this.chipyardSubject.next(chipyardFile)
  }
}
