import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'content-wrapper',
  template: `
    <div class="content-wrapper">
    <div [ngClass]="{'container': !fluid, 'container-fluid': fluid}">
      <section class="content-header">
        <h1>{{ header }}</h1>
        <ol class="breadcrumb" *ngIf="breadcrums">
        <li *ngFor="let link of breadcrums.links"><a [routerLink]="link.routerLink"><i [ngClass]="link.iconClass"></i> {{link.title}}</a></li>
        <li class="active">{{breadcrums.title}}</li>
      </ol>
      </section>
      <section class="content container-fluid p-0">
        <ng-content></ng-content>
      </section>
    </div>
  </div>
  `,
  styleUrls: ['./content-wrapper.component.scss']
})
export class ContentWrapperComponent {
  @Input() breadcrums: any;
  @Input() header = '';
  @Input() fluid: boolean = false;
  constructor() { }
}
