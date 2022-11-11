import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';

// import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
// import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';

import { MatSidenavModule, } from '@angular/material/sidenav';
import { MatToolbarModule, } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [
    LayoutModule,
    OverlayModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    DragDropModule,
    ScrollingModule
  ],
  exports: [
    LayoutModule,
    OverlayModule,
    MatSidenavModule,
    MatToolbarModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatIconModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    DragDropModule,
    ScrollingModule
  ],
  providers: [
    // { provide: MAT_DATE_LOCALE, useValue: 'it-IT' },
    // { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    // { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
  ]
})
export class AppMaterialModule { }
