import { Component, ViewChild, AfterViewChecked, AfterViewInit, ElementRef } from '@angular/core';
import { TimeGraphComponent } from './time-graph/time-graph.component';
import { TextViewerComponent } from './text-viewer/text-viewer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  @ViewChild('file') file?: ElementRef;
  @ViewChild('graph') graph?: TimeGraphComponent
  @ViewChild('text') text?: TextViewerComponent
  fileData: string = ''
  title = 'app';

  ngAfterViewInit() {
    const fileInput = this.file!.nativeElement
    fileInput.addEventListener('change', () => {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileData = reader.result as string
      }
      reader.readAsText(fileInput.files![0]);
    })
  }
}
