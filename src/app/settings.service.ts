import { Injectable } from '@angular/core';

export type TSetting =
  'theme'
  // | 'numberFormat'

export type TSettingsTheme = 'light' | 'dark' | 'default'
// export type TSettingsNumberFormat = 'hex' | 'dec' | 'bin'

const settingDefaults: Record<TSetting, any> = {
  theme: 'light'
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
  }
}
