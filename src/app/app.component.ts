import { Component, ViewChild, AfterViewChecked, AfterViewInit, ElementRef, OnInit, HostBinding } from '@angular/core';
import { TimeGraphComponent } from './time-graph/time-graph.component';
import { TextViewerComponent } from './text-viewer/text-viewer.component';
import { SettingsService, TSettingsTheme } from './settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('file') file?: ElementRef;
  @ViewChild('file') theme?: ElementRef;
  @ViewChild('graph') graph?: TimeGraphComponent
  @ViewChild('text') text?: TextViewerComponent
  fileData: string = ''
  title = 'app';
  settings: SettingsService = new SettingsService()
  appTheme?: TSettingsTheme

  ngOnInit() {
    this.appTheme = this.settings.get('theme')
    this.changeDarkTheme(this.appTheme!)
  }

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

  updateTheme($event: unknown, value: string) {
    this.settings.set('theme', value)
    this.changeDarkTheme(value as TSettingsTheme)
  }

  changeDarkTheme(setting: TSettingsTheme) {
    const isDark = setting === 'dark'
    if (isDark) {
      document.getElementsByTagName('body')[0].classList.add('dark')
    } else {
      document.getElementsByTagName('body')[0].classList.remove('dark')
    }
  }
}
