import { Component, ViewChild, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

import { DataTableComponent } from '../../../datatable/components/datatable/datatable.component';

import { SearchFieldComponent } from '../search-field/search-field.component';
import { DetailExtraComponent } from '../detailextra/detailextra.component';
import { ChangePageArgs } from '../../../datatable/model/change-page-args';
import { ChangeSortArgs } from '../../../datatable/model/change-sort-args';
import { DataTableDef, DataTableColumn } from '../../../datatable/model/datatable-def';
import { CustomerSearch } from '../../model/customer-search';
import { CustomerDataSource } from '../../datasource/customer-datasource';
import { PagingData } from 'src/app/appcore/datasource/pagingdata';
import { HelperDefinition } from '../../../datatable/helper-definition';
import { ApiCustomerService } from '../../service/api-customer.service';

@Component({
  selector: 'app-tablepanel5',
  templateUrl: './tablepanel5.component.html',
  styleUrls: ['./tablepanel5.component.css']
})
export class TablePanel5Component implements OnInit, OnDestroy{
  @ViewChild('searchfield') searchfield: SearchFieldComponent;
  @ViewChild('mytable') mytable: DataTableComponent;
  def: DataTableDef;
  search: CustomerSearch;
  datasource: CustomerDataSource;
  pagstatus: PagingData;
  columns = [];
  rows = [];
  count = 0;
  page = 0;
  pagesize = 15;
  listdatail: DataTableColumn[];
  listgroup: DataTableColumn[];
  groupexpansiondefault = false;
  detailenabled = false;
  groupenabled = false;
  grouprowsby = '';
  datasource$;

  groupvalue = '1';
  comptypeview = 1;
  headertext = 'Template-1';
  componentdetail = null;

  keystorage = 'TablePanel5';
  destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private service: ApiCustomerService) {
    this.search = new CustomerSearch();
    this.datasource = new CustomerDataSource(this.service, this.search);
  }

  ngOnInit() {
    this.datasource$ = this.datasource.connect(null);
    this.datasource$.subscribe((items: any) => {
      this.pagstatus = this.datasource.getPagingData();
      this.rows = items;
    });
    this.getDataTableDef();
  }

  ngAfterViewInit(): void {
    this.searchfield.changetext$.pipe(
      tap(value => {
        this.search.fulltext = value;
        const column = this.datasource.orderbyColumn;
        const order = this.datasource.orderbyDirection;
        this.datasource.loadPaggedData(0, this.pagesize, column, order);
      }),
      takeUntil(this.destroy)
    ).subscribe();
  }

  onConfigChange():void {
    this.getDataTableDef();
  }

  onChangeCombobox(event): void {
    const value = event.value;
    if (value === '1') {
      this.comptypeview = 1;
      this.headertext = 'Template-1';
      this.groupexpansiondefault = false;
      this.detailenabled = false;
      this.groupenabled = false;
      this.grouprowsby = '';
      this.componentdetail = null;
    }
    if (value === '2') {
      this.comptypeview = 2;
      this.headertext = 'Template-2';
      this.groupexpansiondefault = false;
      this.detailenabled = true;
      this.groupenabled = false;
      this.grouprowsby = '';
      this.componentdetail = DetailExtraComponent;
    }
    if (value === '3') {
      this.comptypeview = 3;
      this.headertext = 'Template-3';
      this.groupexpansiondefault = true;
      this.detailenabled = false;
      this.groupenabled = true;
      this.grouprowsby = 'cap';
      this.componentdetail = null;
    }
    if (value === '4') {
      this.comptypeview = 4;
      this.headertext = 'Template-4';
      this.groupexpansiondefault = true;
      this.detailenabled = false;
      this.groupenabled = true;
      this.grouprowsby = 'province';
      this.componentdetail = null;
    }
    // this.recalculate();
  }

  onChengeGroup(event): void {
    const value = event.value;
    if (value === '1') {
      this.grouprowsby = 'cap';
    }
    if (value === '2') {
      this.grouprowsby = 'province';
    }
    // this.recalculate();
  }

  onPage(event: ChangePageArgs): void {
    const page = +event.page;
    const column = this.datasource.orderbyColumn;
    const order = this.datasource.orderbyDirection;
    this.datasource.loadPaggedData(page, this.pagesize, column, order);
  }

  onSort(event: ChangeSortArgs): void {
    const page = 0;
    const column = event.column;
    const order = event.order;
    this.datasource.loadPaggedData(page, this.pagesize, column, order);
  }

  getDataTableDef(): void {
    this.service.getDataTableDef(this.keystorage).subscribe(response => {
      this.def = response;
      this.columns = HelperDefinition.getTableList(this.def.columns);
      this.listdatail = HelperDefinition.getDatailList(this.def.columns);
      this.listgroup = HelperDefinition.getGroupList(this.def.columns);
      this.datasource.loadPaggedData(0, this.pagesize, 'Id');
    });
  }

  recalculate(): void {
    this.mytable.recalculate();
  }

  ngOnDestroy(): void {
    this.datasource.disconnect(null);
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
