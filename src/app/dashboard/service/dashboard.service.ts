import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";


@Injectable()
export class DashboardService {
  list: any;

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
    return of('DashboardService');
  }

}
