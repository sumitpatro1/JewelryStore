import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'content',
  template: `
    <div class="content-wrapper">
    <div class="container">
      <section class="content container-fluid">
        <ng-content></ng-content>
      </section>
    </div>
  </div>
  `,
  styleUrls: ['./content.component.scss']
})
export class ContentComponent {
  constructor() { }
}
