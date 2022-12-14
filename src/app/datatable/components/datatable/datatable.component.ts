import { Component, ViewChild, ChangeDetectorRef, Input, Output, EventEmitter,
    SimpleChanges, OnInit, OnChanges, OnDestroy} from '@angular/core';
import { Router } from '@angular/router';

import { ChangePageArgs } from '../../model/change-page-args';
import { ChangeSortArgs } from '../../model/change-sort-args';
import { DataTableColumn } from '../../model/datatable-def';

// https://stackoverflow.com/questions/44529043/ngx-datatable-multiple-columns-from-model

@Component({
    selector: 'app-datatable',
    templateUrl: './datatable.component.html',
    styleUrls: ['./datatable.component.scss']
})
export class DataTableComponent implements OnInit, OnChanges, OnDestroy {
  @ViewChild('mytable') table: any;
  @Input() headertext = '';
  @Input() columns;
  @Input() rows;
  @Input() count;
  @Input() page;
  @Input() pagesize;
  @Input() externalpaging = false;
  @Input() externalsorting = false;
  @Input() details: DataTableColumn[];
  @Input() groups: DataTableColumn[];
  @Input() groupexpansiondefault = false;
  @Input() detailenabled = false;
  @Input() groupenabled = false;
  @Input() searchTable = false;
  @Input() autogeneratedetail = true;
  @Input() componentdetail = null;
  @Output() changepage = new EventEmitter<ChangePageArgs>();
  @Output() changesort = new EventEmitter<ChangeSortArgs>();

  grouplabel = '';

  _grouprowsby = '';
  @Input('grouprowsby')
  set grouprowsby(value: string) {
    this._grouprowsby = value;
    if (this._grouprowsby) {
      this.grouplabel = this.getGroupName();
    }
  }
  get grouprowsby() {
    return this._grouprowsby;
  }

  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    this.details = []; this.groups = [];
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    //this.recalculate();
  }

  onPage(event: any): void {
    if (this.externalpaging) {
      const page = event.offset;
      const args = new ChangePageArgs(page);
      this.changepage.emit(args);
    }
  }

  onSort(event: any): void {
    if (this.externalsorting) {
      const column = event.sorts[0].prop;
      const order = event.sorts[0].dir;
      const args = new ChangeSortArgs(column, order);
      this.changesort.emit(args);
    }
  }

  getGroupName(): string {
    const dt = this.groups.filter(x => x.prop === this.grouprowsby);
    // const dt = this.columns.filter(x => x.prop === this.grouprowsby);
    return dt[0].name;
  }

  toggleExpandGroup(group): void {
    this.table.groupHeader.toggleExpandGroup(group);
    console.log('Toggled Expand Group!', group);
  }

  toggleExpandDetail(row): void {
    this.table.rowDetail.toggleExpandRow(row);
    console.log('Toggled Expand Row!', row);
  }

  onGroupToggle(event): void {
    console.log('Group Toggled', event);
  }

  onDetailToggle(event): void {
    console.log('Detail Toggled', event);
  }

  recalculate(): void {
    //this.cdr.detectChanges();
    this.table.recalculate();
    //this.cdr.detectChanges();
  }

  console(value): void {
    console.log(value)
  }

  ngOnDestroy(): void {

  }
}
