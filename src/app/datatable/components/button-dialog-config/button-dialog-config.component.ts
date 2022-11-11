import { Component, Input, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DialogConfigComponent } from '../dialog-config/dialog-config.component';
import { DataTableDef } from '../../model/datatable-def';

@Component({
  selector: 'app-button-dialog-config',
  templateUrl: './button-dialog-config.component.html',
  styleUrls: ['./button-dialog-config.component.css']
})
export class ButtonDialogConfigComponent implements OnInit, OnDestroy {
  @Input() tabledef: DataTableDef;
  @Input() keystorage = '';
  @Input() text = 'Configura';
  @Output() change = new EventEmitter<any>();

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {

  }

  onOpenDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '90%';
    dialogConfig.height = '90%';
    dialogConfig.disableClose = true;
    dialogConfig.data = { keystorage: this.keystorage, tabledef: this.tabledef };
    const dialogRef = this.dialog.open(DialogConfigComponent, dialogConfig);
    //
    dialogRef.afterClosed().subscribe(data => {
      if (data === 'ok') {
        this.change.emit();
      }
    });
  }

  ngOnDestroy(): void {

  }
}
