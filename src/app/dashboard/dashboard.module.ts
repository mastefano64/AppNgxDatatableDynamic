import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DataTableModule } from '../datatable/datatable.module';
import { SharedModule } from '../shared/shared.module';

import { HomeComponent } from './components/home/home.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { PageTable1Component } from './components/pagetable1/pagetable1.component';
import { PageTable2Component } from './components/pagetable2/pagetable2.component';
import { PageTable3Component } from './components/pagetable3/pagetable3.component';
import { PageTable4Component } from './components/pagetable4/pagetable4.component';
import { PageTable5Component } from './components/pagetable5/pagetable5.component';
import { TablePanel1Component } from './components/tablepanel1/tablepanel1.component';
import { TablePanel2Component } from './components/tablepanel2/tablepanel2.component';
import { TablePanel3Component } from './components/tablepanel3/tablepanel3.component';
import { TablePanel4Component } from './components/tablepanel4/tablepanel4.component';
import { TablePanel5Component } from './components/tablepanel5/tablepanel5.component';
import { DetailExtraComponent } from './components/detailextra/detailextra.component';

import { DashboardService } from './service/dashboard.service';
import { DefinitionTableService } from '../datatable/service/definitiontable.service';
import { ApiCustomerService } from './service/api-customer.service';

@NgModule({
    declarations: [
        HomeComponent,
        SearchFieldComponent,
        PageTable1Component,
        PageTable2Component,
        PageTable3Component,
        PageTable4Component,
        PageTable5Component,
        TablePanel1Component,
        TablePanel2Component,
        TablePanel3Component,
        TablePanel4Component,
        TablePanel5Component,
        DetailExtraComponent
    ],
    imports: [
      CommonModule,
      DataTableModule,
      SharedModule,
      RouterModule.forChild([
        { path: 'home', component: HomeComponent },
        { path: 'pagetable1', component: PageTable1Component },
        { path: 'pagetable2', component: PageTable2Component },
        { path: 'pagetable3', component: PageTable3Component },
        { path: 'pagetable4', component: PageTable4Component },
        { path: 'pagetable5', component: PageTable5Component }
      ])
    ],
    exports: [
      RouterModule
    ],
    providers: [
      DashboardService,
      DefinitionTableService,
      ApiCustomerService
    ]
})
export class DashboardModule {
}
