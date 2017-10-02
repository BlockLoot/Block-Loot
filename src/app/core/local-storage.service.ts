import { Injectable } from '@angular/core';
import { WindowRefService } from './window-ref.service';

@Injectable()
export class LocalStorageService {

  private _window: Window;

  constructor(private windowRef: WindowRefService) {
    this._window = windowRef.nativeWindow;
  }

  /**
   * Add Item to LocalStorage
   * @param {string} key
   * @param {string} val
   */
  setItem(key: string, val: string): void {
    this._window.localStorage.setItem(key, val);
  }

  /**
   * Get Item from LocalStorage
   * @param {string} key
   * @returns {any}
   */
  getItem(key: string): any {
    return this._window.localStorage.getItem(key);
  }

  /**
   * Remove Item from LocalStorage
   * @param {string} key
   */
  removeItem(key: string): void {
    this._window.localStorage.removeItem(key);
  }
}
