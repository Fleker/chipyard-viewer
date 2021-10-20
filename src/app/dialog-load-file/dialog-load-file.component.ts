import { AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { FileParserService } from '../file-parser.service';
import { SettingsService, TSettingsTheme } from '../settings.service';

@Component({
  selector: 'dialog-load-file',
  templateUrl: './dialog-load-file.component.html',
  styleUrls: ['./dialog-load-file.component.css']
})
export class DialogLoadFileComponent implements OnInit, AfterViewInit {
  @ViewChild('dialog') dialog?: ElementRef;
  @ViewChild('file') file?: ElementRef;
  @HostBinding('class.dark') darkTheme: boolean = false

  constructor(
    private readonly settings: SettingsService,
    private readonly fileParserService: FileParserService,
  ) {}

  ngOnInit() {
    this.settings.listen('theme').subscribe((theme: TSettingsTheme) => {
      this.darkTheme = theme === 'dark'
    })
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
        const fileData = reader.result as string
        this.fileParserService.parseFile(fileData)
        this.closeDialog()
      }
      reader.readAsText(fileInput.files![0]);
    })
  }
}
