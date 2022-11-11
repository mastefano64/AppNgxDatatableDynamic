import { Observable } from "rxjs";

import { DataTableDef, DataTableColumn } from "./model/datatable-def";

export class HelperDefinition {
  static getTableList(columns: DataTableColumn[]): DataTableColumn[] {
    const list = columns.filter(x => x.table === true && x.tablevisible === true);
    HelperDefinition.sortColumn(list, 'tableorder');
    return list;
  }

  static getDatailList(columns: DataTableColumn[]): DataTableColumn[] {
    const list = columns.filter(x => x.detail === true && x.detailvisible === true);
    HelperDefinition.sortColumn(list, 'detailorder');
    return list;
  }

  static getGroupList(columns: DataTableColumn[]): DataTableColumn[] {
    return columns.filter(x => x.group === true);
  }

  static sortColumn(listcolumn, typetable): void {
    listcolumn.sort((a, b) => {typetable
      if (a[typetable] < b[typetable]) {
        return -1;
      }
      if (a[typetable] > b[typetable]) {
        return +1;
      }
      return 0;
    });
  }

}
