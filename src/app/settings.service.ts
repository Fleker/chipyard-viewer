import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export type TSetting =
  'theme'
  // | 'numberFormat'

export type TSettingsTheme = 'light' | 'dark' | 'default'
// export type TSettingsNumberFormat = 'hex' | 'dec' | 'bin'

const settingDefaults: Record<TSetting, any> = {
  theme: 'light'
}

const settingSubjects: Record<TSetting, Subject<any>> = {
  theme: new Subject<TSettingsTheme>()
}

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  constructor() {}

  get(setting: TSetting) {
    return localStorage.getItem(setting) || settingDefaults[setting]
  }

  set(setting: TSetting, value: any) {
    localStorage.setItem(setting, value)
    settingSubjects[setting].next(value)
  }

  listen(setting: TSetting) {
    const listener = settingSubjects[setting]
    window.requestAnimationFrame(() => {
      // Funnel value right after subscribing
      listener.next(this.get(setting))
    })
    return listener
  }
}
