import { Component, OnInit, OnDestroy } from '@angular/core';

import { ChangePageArgs } from '../../../datatable/model/change-page-args';
import { ChangeSortArgs } from '../../../datatable/model/change-sort-args';
import { DataTableDef } from '../../../datatable/model/datatable-def';
import { HelperDefinition } from '../../../datatable/helper-definition';
import { ApiCustomerService } from '../../service/api-customer.service';

@Component({
  selector: 'app-tablepanel1',
  templateUrl: './tablepanel1.component.html',
  styleUrls: ['./tablepanel1.component.css']
})
export class TablePanel1Component implements OnInit, OnDestroy{
  def: DataTableDef;
  columns = [];
  rows = [];
  count = 0;
  page = 0;
  pagesize = 20;

  keystorage = 'TablePanel1';

  constructor(private service: ApiCustomerService) { }

  ngOnInit() {
    this.getDataTableDef();
  }

  onConfigChange():void {
    this.getDataTableDef();
  }

  onPage(event: ChangePageArgs): void {
    // not used!
  }

  onSort(event: ChangeSortArgs): void {
    // not used!
  }

  getDataTableDef(): void {
    this.service.getDataTableDef(this.keystorage).subscribe(response => {
      this.def = response;
      this.columns = HelperDefinition.getTableList(this.def.columns);
      this.getAllCustomer();
    });
  }

  getAllCustomer(): void {
    const url = this.def.url;
    this.service.getAllDataTableList(url).subscribe(response => {
      this.rows = response;
      this.count = this.rows.length;
    });
  }

  ngOnDestroy(): void {

  }
}
