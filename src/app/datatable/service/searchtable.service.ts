import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, Subject, of } from "rxjs";

import { NotifyChangeText } from "../model/notify-change-text";
import { NotifyClearText } from "../model/notify-clear-text";
import { NotifyFocusField } from "../model/notify-focus-field";

@Injectable()
export class SearchTableService {
  private subject1 = new Subject<NotifyChangeText >();
  public changetext$ = this.subject1.asObservable();
  private subject2 = new Subject<NotifyClearText>();
  public cleartext$ = this.subject2.asObservable();
  private subject3 = new Subject<NotifyFocusField>();
  public focusfield$ = this.subject3.asObservable();

  constructor(private http: HttpClient) { }

  notifyChangeText(name: string, value: string): void {
    const args = new NotifyChangeText(name, value);
    this.subject1.next(args);
  }

  notifyClearText(name?: string): void {
    const args = new NotifyClearText(name);
    this.subject2.next(args);
  }

  notifyFocusField(name?: string): void {
    const args = new NotifyFocusField(name);
    this.subject3.next(args);
  }

}
