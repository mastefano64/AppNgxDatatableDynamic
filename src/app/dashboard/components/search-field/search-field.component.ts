import { Component, Input, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
// import { ControlContainer, NgForm } from '@angular/forms';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, Subscription, Subject } from 'rxjs';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.css']
})
export class SearchFieldComponent implements AfterViewInit, OnDestroy {
  @ViewChild('search') search: ElementRef | undefined;
  @Input() name = '';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() minlenght = 3;
  @Input() debouncetime = 800;
  @Input() type: 'string' | 'integer' | 'decimal' = 'string';
  @Input() value = '';
  private subject = new Subject<string>();
  public changetext$ = this.subject.asObservable();
  public sub: Subscription | undefined;

  constructor() { }

  ngAfterViewInit(): void {
    this.sub = fromEvent(this.search?.nativeElement, 'keyup').pipe(
      map((event: any) => (event.target as HTMLInputElement).value.trim()),
      filter(text => text.length === 0 || text.length >= this.minlenght),
      debounceTime(this.debouncetime),
      distinctUntilChanged(),
    ).subscribe((value: string) => {
      this.subject.next(value);
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
