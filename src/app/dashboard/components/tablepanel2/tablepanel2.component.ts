import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';

import { SearchFieldComponent } from '../search-field/search-field.component';
import { ChangePageArgs } from '../../../datatable/model/change-page-args';
import { ChangeSortArgs } from '../../../datatable/model/change-sort-args';
import { DataTableDef } from '../../../datatable/model/datatable-def';
import { CustomerSearch } from '../../model/customer-search';
import { CustomerDataSource } from '../../datasource/customer-datasource';
import { PagingData } from 'src/app/appcore/datasource/pagingdata';
import { SearchTableService } from '../../../datatable/service/searchtable.service';
import { HelperDefinition } from '../../../datatable/helper-definition';
import { ApiCustomerService } from '../../service/api-customer.service';

@Component({
  selector: 'app-tablepanel2',
  templateUrl: './tablepanel2.component.html',
  styleUrls: ['./tablepanel2.component.css'],
  providers: [ SearchTableService  ]
})
export class TablePanel2Component implements OnInit, OnDestroy{
  @ViewChild('searchfield') searchfield: SearchFieldComponent;
  def: DataTableDef;
  search: CustomerSearch;
  datasource: CustomerDataSource;
  pagstatus: PagingData;
  columns = [];
  rows = [];
  count = 0;
  page = 0;
  pagesize = 15;
  datasource$;

  keystorage = 'TablePanel2';
  destroy: Subject<boolean> = new Subject<boolean>();

  constructor(private notify: SearchTableService, private service: ApiCustomerService) {
    this.search = new CustomerSearch();
    this.datasource = new CustomerDataSource(this.service, this.search);
  }

  ngOnInit(): void {
    this.datasource$ = this.datasource.connect(null);
    this.datasource$.subscribe((items: any) => {
      this.pagstatus = this.datasource.getPagingData();
      this.rows = items;
    });
    this.notify.changetext$.pipe(takeUntil(this.destroy)).subscribe(response => {
      this.search.clear();
      this.search[response.name] = response.value;
      this.datasource.loadPaggedData(0, this.pagesize, 'Id');
    });
    this.notify.cleartext$.pipe(takeUntil(this.destroy)).subscribe(response => {
      this.search.clear();
     // this.search[response.name] = response.value;
      this.datasource.loadPaggedData(0, this.pagesize, 'Id');
    });
   // this.notify.focusfield$.pipe(takeUntil(this.destroy)).subscribe(response => {
   //   if (window.confirm("Pulisci i campi?")) {
   //     this.search.clear();
   //   }
   // });

    this.getDataTableDef();
  }

  ngAfterViewInit(): void {
    this.searchfield.changetext$.pipe(
      tap(value => {
        this.search.clear();
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

  onClearSearch(): void {
    this.notify.notifyClearText();
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
      this.datasource.loadPaggedData(0, this.pagesize, 'Id');
    });
  }

  ngOnDestroy(): void {
    this.datasource.disconnect(null);
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
