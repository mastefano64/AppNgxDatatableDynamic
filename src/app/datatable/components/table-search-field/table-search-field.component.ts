import { Component, Input, ViewChild, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
// import { ControlContainer, NgForm } from '@angular/forms';
import { map, filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { fromEvent, Subscription, Subject } from 'rxjs';

import { SearchTableService } from '../../service/searchtable.service';

@Component({
  selector: 'app-table-search-field',
  templateUrl: './table-search-field.component.html',
  styleUrls: ['./table-search-field.component.css']
})
export class TableSearchFieldComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('search') search: ElementRef | undefined;
  @Input() name = '';
  @Input() placeholder = '';
  @Input() readonly = false;
  @Input() minlenght = 3;
  @Input() debouncetime = 800;
  @Input() type: 'string' | 'integer' | 'decimal' = 'string';
  @Input() value = '';

  public sub1: Subscription | undefined;
  public sub2: Subscription | undefined;

  constructor(private service: SearchTableService) { }

  ngOnInit(): void {
    this.sub1 = this.service.cleartext$.subscribe(response => {
      this.value = '';
    });
  }

  ngAfterViewInit(): void {
    this.sub2 = fromEvent(this.search?.nativeElement, 'keyup').pipe(
      map((event: any) => (event.target as HTMLInputElement).value.trim()),
      filter(text => text.length === 0 || text.length >= this.minlenght),
      debounceTime(this.debouncetime),
      distinctUntilChanged(),
    ).subscribe((value: string) => {
      this.service.notifyChangeText(this.name, value);
    });
  }

  onFieldFocus(event): void {
    // this.service.notifyFocusField(this.name);
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
  }
}
