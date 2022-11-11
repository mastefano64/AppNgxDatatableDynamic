import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../app.material.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

import { NotFoundComponent } from './component/notfound/notfound.component';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    // HttpClientModule,
    FormsModule,
    AppMaterialModule,
    NgxDatatableModule
  ],
  exports: [
    //HttpClientModule,
    // HttpClientModule,
    FormsModule,
    AppMaterialModule,
    NgxDatatableModule,
    NotFoundComponent
  ]
})
export class SharedModule { }
