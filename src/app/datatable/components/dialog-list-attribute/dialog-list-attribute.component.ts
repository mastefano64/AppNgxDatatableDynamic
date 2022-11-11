import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

import { DataTableDef, DataTableColumn } from '../../model/datatable-def';

@Component({
  selector: 'app-dialog-list-attribute',
  templateUrl: './dialog-list-attribute.component.html',
  styleUrls: ['./dialog-list-attribute.component.css']
})
export class DialogListAttributeComponent implements OnInit, OnDestroy {
  @Input() keystorage: string;
  @Input() tabledef: DataTableDef;
  @Input() typecol: string;
  @Output() changecheckbox = new EventEmitter<any>();
  listcolumn: DataTableColumn[];

  constructor() { }

  ngOnInit(): void {
    if (this.typecol === 'table') {
      this.listcolumn = this.tabledef.columns.filter(x => x.table === true);
      this.sortColumn();
    }
    if (this.typecol === 'detail') {
      this.listcolumn = this.tabledef.columns.filter(x => x.detail === true);
      this.sortColumn();
    }
  }

  sortColumn(): void {
    if (this.typecol === 'table') {
      this.listcolumn.sort((a, b) => {
        if (a['tableorder'] < b['tableorder']) {
          return -1;
        }
        if (a['tableorder'] > b['tableorder']) {
          return +1;
        }
        return 0;
      });
    }
    if (this.typecol === 'detail') {
      this.listcolumn.sort((a, b) => {
        if (a['detailorder'] < b['detailorder']) {
          return -1;
        }
        if (a['detailorder'] > b['detailorder']) {
          return +1;
        }
        return 0;
      });
    }
  }

  onCheckChange(event): void {
    this.copyColumn();
    this.changecheckbox.emit();
  }

  onDropColumn(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.listcolumn, event.previousIndex, event.currentIndex);
    let index = 0;
    for(const col of this.listcolumn) {
      if (this.typecol === 'table') {
        col.tableorder = ++index;
      }
      if (this.typecol === 'detail') {
        col.detailorder = ++index;
      }
    }
    this.copyColumn();
    this.changecheckbox.emit();
  }

  copyColumn(): void {
    for(const col of this.listcolumn) {
      const item = this.tabledef.columns.find(x => x.id === col.id);
      if (this.typecol === 'table') {
        item.tableorder = col.tableorder;
        item.tablevisible = col.tablevisible;

      }
      if (this.typecol === 'detail') {
        item.detailorder = col.detailorder;
        item.detailvisible = col.detailvisible;
      }
    }
  }

  ngOnDestroy(): void {

  }
}
