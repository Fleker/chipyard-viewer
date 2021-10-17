import { Component, ElementRef, HostBinding, OnInit, ViewChild } from '@angular/core';
import { SettingsService, TSettingsTheme } from '../settings.service';

@Component({
  selector: 'dialog-settings',
  templateUrl: './dialog-settings.component.html',
  styleUrls: ['./dialog-settings.component.css']
})
export class DialogSettingsComponent implements OnInit {
  @ViewChild('dialog') dialog?: ElementRef;
  @HostBinding('class.dark') darkTheme: boolean = false
  settings: SettingsService = new SettingsService()
  appTheme?: TSettingsTheme

  constructor() { }

  openDialog() {
    const dialog = this.dialog?.nativeElement as any
    dialog.showModal()
  }

  closeDialog() {
    const dialog = this.dialog?.nativeElement as any
    dialog.close()
  }

  ngOnInit(): void {
    this.appTheme = this.settings.get('theme')
    this.settings.listen('theme').subscribe((theme: TSettingsTheme) => {
      this.darkTheme = theme === 'dark'
    })
  }

  updateTheme($event: unknown, value: string) {
    this.settings.set('theme', value)
  }
}
