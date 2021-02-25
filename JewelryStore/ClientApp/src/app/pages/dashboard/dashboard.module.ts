
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { SharedModule } from '@app/shared';
import { AuthGuard } from '@app/core/guard/auth.guard';
import { EstimationPriceComponent } from './estimation/estimation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';
const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivateChild: [AuthGuard],
    children: [
      { path: 'estimation', component: EstimationPriceComponent },
      { path: '', redirectTo: 'estimation', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [DashboardComponent
  , EstimationPriceComponent],
  imports: [
    CommonModule
    , RouterModule.forChild(routes)
    , SharedModule
    , ReactiveFormsModule
    , FormsModule
    , CoreModule
  ]
})
export class DashboardModule { }

