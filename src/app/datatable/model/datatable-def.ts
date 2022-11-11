export class DataTableDef {
  columns: DataTableColumn[] = [];
  url: string = '';
}

export class DataTableColumn {
  id: number;
  name: string;
  prop: string;
  searchable: boolean;
  table: boolean;
  tablevisible: boolean;
  tableorder: number;
  detail: boolean;
  detailvisible: boolean;
  detailorder: number;
  group: boolean;
  sort: boolean;
}
