import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";

import { DataTableDef } from "../model/datatable-def";

@Injectable()
export class DefinitionTableService {
  storagekey = '';
  list: any;

  constructor(private http: HttpClient) { }

  tryGetFromCache(key: string): DataTableDef {
    let result;

    const value = sessionStorage.getItem(key);
    if (value) {
      result = JSON.parse(window.atob(value));
    }

    return result;
  }

  setToCache(key: string, def: DataTableDef): void {
    const b64 = window.btoa(JSON.stringify(def));
    sessionStorage.setItem(key, b64);
  }

  resetCache(key: string): void {
    sessionStorage.removeItem(key);
  }

}
