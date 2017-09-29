import { Injectable } from '@angular/core';

function getWindow(): Window {
  return window;
}

@Injectable()
export class WindowRefService {

  constructor() { }

  /**
   * Encapsulates native browser window in Angular
   * @returns {Window}
   */
  get nativeWindow(): Window {
    return getWindow();
  }

}
