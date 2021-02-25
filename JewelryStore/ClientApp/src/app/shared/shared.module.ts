import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppNavComponent } from './app-nav/app-nav.component';
//PRIMENG Imports
import { InputSwitchModule } from 'primeng/inputswitch';
import { SelectButtonModule } from 'primeng/selectbutton';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CalendarModule } from 'primeng/calendar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { BlockUIModule } from 'primeng/blockui';
import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SummaryPopupComponent } from './summary-popup/summary-popup.component';
import { DynamicDialogModule } from 'primeng/components/dynamicdialog/dynamicdialog';
@NgModule({
  declarations: [
    AppNavComponent
    , SummaryPopupComponent
    ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    InputSwitchModule,
    OverlayPanelModule,
    SelectButtonModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    ToolbarModule, 
    SplitButtonModule,
    ConfirmDialogModule,
    DialogModule,
    DynamicDialogModule,
    BlockUIModule,
    RadioButtonModule
  ],
  exports: [
    AppNavComponent,
    SummaryPopupComponent
  ]
})
export class SharedModule { }
