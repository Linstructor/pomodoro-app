export interface StoreAction<E> {
  commit: any,
  state: E
}

export interface IndicatorSate {
  total: number,
  current: number
}

export interface TimerState {
  original: number,
  minutes: number,
  seconds: number,
  ended: boolean,
  paused: boolean,
  running: boolean,
}

export interface SettingsState {
  alwaysOnTop: boolean,
  duration: number,
  first: boolean,
  darkMode: boolean,
  autoDarkMode: boolean,
}

export interface AppState {
  isSettingsPageShow: boolean
}