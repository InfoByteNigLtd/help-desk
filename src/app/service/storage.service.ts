/* eslint-disable object-shorthand */
/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@capacitor/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;

  constructor() {
    // this.init();
  }
  /** save data into storage */
  async store(key: string, value: any): Promise<void> {
    await Storage.set({
      key: key,
      value: JSON.stringify(value),
    });
  }
  /** get data from storage */
  async fetch(key: string): Promise<any> {
    const item = await Storage.get({ key: key });
    return JSON.parse(item.value);
  }

  /** delete data from storage */
  async delete(key: string): Promise<void> {
    await Storage.remove({
      key: key,
    });
  }
}
