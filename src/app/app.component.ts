import { Component, ViewChild, AfterViewChecked, AfterViewInit, ElementRef, OnInit, HostBinding } from '@angular/core';
import { TimeGraphComponent } from './time-graph/time-graph.component';
import { TextViewerComponent } from './text-viewer/text-viewer.component';
import { SettingsService, TSettingsTheme } from './settings.service';
import { AppMenuComponent } from './app-menu/app-menu.component';
import { FileParserService } from './file-parser.service';
import { ChipyardFile } from './file-parser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('graph') graph?: TimeGraphComponent
  @ViewChild('text') text?: TextViewerComponent
  @ViewChild('menu') menu?: AppMenuComponent
  @ViewChild('placeholder') placeholder?: ElementRef
  title = 'app';
  chipyardFile?: ChipyardFile

  constructor(
    private readonly settings: SettingsService,
    private readonly parser: FileParserService,
  ) {}

  ngOnInit() {
    this.settings.listen('theme').subscribe(theme => {
      this.changeDarkTheme(theme)
    })
  }

  ngAfterViewInit() {
    this.parser.chipyardSubject.subscribe(next => this.chipyardFile = next)
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
