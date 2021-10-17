import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'dialog-load-file',
  templateUrl: './dialog-load-file.component.html',
  styleUrls: ['./dialog-load-file.component.css']
})
export class DialogLoadFileComponent implements AfterViewInit {
  @ViewChild('dialog') dialog?: ElementRef;
  @ViewChild('file') file?: ElementRef;
  fileData: string = ''
  fileDataSubject: Subject<string>

  constructor() {
    this.fileDataSubject = new Subject<string>()
  }

  openDialog() {
    const dialog = this.dialog?.nativeElement as any
    dialog.showModal()
  }

  closeDialog() {
    const dialog = this.dialog?.nativeElement as any
    dialog.close()
  }

  ngAfterViewInit() {
    const fileInput = this.file!.nativeElement
    fileInput.addEventListener('change', () => {
      const reader = new FileReader();
      reader.onload = () => {
        this.fileData = reader.result as string
        this.fileDataSubject.next(this.fileData)
        this.closeDialog()
      }
      reader.readAsText(fileInput.files![0]);
    })
  }

  getFiledata() {
    return this.fileDataSubject
  }
}
