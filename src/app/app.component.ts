import { Component, ViewChild, AfterViewChecked, AfterViewInit, ElementRef, OnInit, HostBinding } from '@angular/core';
import { TimeGraphComponent } from './time-graph/time-graph.component';
import { TextViewerComponent } from './text-viewer/text-viewer.component';
import { SettingsService, TSettingsTheme } from './settings.service';
import { AppMenuComponent } from './app-menu/app-menu.component';

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
  fileData: string = ''
  title = 'app';
  settings: SettingsService = new SettingsService()

  ngOnInit() {
    this.settings.listen('theme').subscribe(theme => {
      this.changeDarkTheme(theme)
    })
  }

  ngAfterViewInit() {
    this.menu?.btnFile?.getFiledata().subscribe(fileData => {
      this.fileData = fileData
      // Hide placeholder once any text loads
      const placeholder = this.placeholder?.nativeElement as HTMLElement
      placeholder.classList.add('hidden')
    })
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
