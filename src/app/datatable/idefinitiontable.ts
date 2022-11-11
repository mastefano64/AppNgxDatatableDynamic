import { Observable } from "rxjs";

import { DataTableDef } from "./model/datatable-def";

export interface IDefinitionTable {

  getDataTableDef(): Observable<DataTableDef>;

}
