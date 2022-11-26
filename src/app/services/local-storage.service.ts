import { Injectable } from '@angular/core';

const LOCAL_STORAGE_NAME = 'rick_and_morty_app';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public getRootData(): any {
    const data = localStorage.getItem(LOCAL_STORAGE_NAME);

    if (data != null) {
      return JSON.parse(data);
    }

    return {};
  }

  public setData(key: string, value: any) {
    const rootData = this.getRootData();
    rootData[key] = value;
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(rootData));
  }

  public getData(key: string): any {
    const rootData = this.getRootData();
    if (rootData[key] === false) {
      return null;
    }

    const data = rootData[key];
    if (data != null) {
      try {
        return JSON.parse(data);
      } catch (error) {
        return data;
      }
    }

    return null;
  }

  public removeData(key: string) {
    const rootData = this.getRootData();
    if (key in rootData === false) {
      return;
    }

    delete rootData[key];
    localStorage.setItem(LOCAL_STORAGE_NAME, JSON.stringify(rootData));
  }
}
