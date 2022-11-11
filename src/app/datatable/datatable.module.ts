import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';

import { DataTableComponent } from './components/datatable/datatable.component';
import { TableSearchFieldComponent } from './components/table-search-field/table-search-field.component';
import { ContainerTableTemplateComponent } from './components/container-table-template/container-table-template.component';
import { ButtonDialogConfigComponent } from './components/button-dialog-config/button-dialog-config.component';
import { DialogConfigComponent } from './components/dialog-config/dialog-config.component';
import { DialogListAttributeComponent } from './components/dialog-list-attribute/dialog-list-attribute.component';
import { DefinitionTableService } from './service/definitiontable.service';
import { SearchTableService } from './service/searchtable.service';

@NgModule({
    declarations: [
      DataTableComponent,
      TableSearchFieldComponent,
      ContainerTableTemplateComponent,
      ButtonDialogConfigComponent,
      DialogConfigComponent,
      DialogListAttributeComponent
    ],
    imports: [
      CommonModule,
      SharedModule
    ],
    exports: [
      DataTableComponent,
      TableSearchFieldComponent,
      ContainerTableTemplateComponent,
      ButtonDialogConfigComponent,
      DialogConfigComponent,
      DialogListAttributeComponent
    ],
    providers: [
      DefinitionTableService,
      SearchTableService
    ]
})
export class DataTableModule {
}
