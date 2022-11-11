import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DataTableDef } from '../../model/datatable-def';
import { DefinitionTableService } from '../../service/definitiontable.service';
import cloneDeep  from 'lodash-es/cloneDeep';

@Component({
  selector: 'app-dialog-config',
  templateUrl: './dialog-config.component.html',
  styleUrls: ['./dialog-config.component.css']
})
export class DialogConfigComponent implements OnInit, OnDestroy {
  keystorage: string;
  oldtabledef: DataTableDef;
  newtabledef: DataTableDef;
  modified = false;

  constructor(private dialogRef: MatDialogRef<DialogConfigComponent>, @Inject(MAT_DIALOG_DATA)
                private data: any, private service: DefinitionTableService) {
    this.keystorage = data.keystorage;
    this.oldtabledef = data.tabledef;
    this.newtabledef = cloneDeep(this.oldtabledef);
  }

  ngOnInit(): void {

  }

  onChangeCheckbox(): void {
    this.modified = true;
  }

  onSave(): void {
    const def = cloneDeep(this.newtabledef);
    this.service.setToCache(this.keystorage, def);
    this.dialogRef.close('ok');
  }

  onClose(): void {
    if (this.modified === true) {
      if (window.confirm('Ci sono modifiche in sospeso. Vuoi uscire?')) {
        this.dialogRef.close('no');
      }
    } else {
      this.dialogRef.close('no');
    }
  }

  onReset(): void {
    if (window.confirm('Sei sicuro di resettare?')) {
      this.service.resetCache(this.keystorage);
      this.dialogRef.close('ok');
    }
  }

  ngOnDestroy(): void {

  }
}
