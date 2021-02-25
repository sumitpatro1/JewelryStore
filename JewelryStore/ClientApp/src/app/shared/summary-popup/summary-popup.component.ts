import {Component, Inject} from '@angular/core';
import { AuthService } from '@app/services';
import { ToastrService } from 'ngx-toastr';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/api';

@Component({
  selector: 'summary-popup',
  templateUrl: 'summary-popup.component.html',
  styleUrls: ['./summary-popup.component.scss']
})
export class SummaryPopupComponent {

  constructor(
    public ref: DynamicDialogRef
    , public config: DynamicDialogConfig
    , public auth: AuthService) {}

  onOkClick(): void {
    this.ref.close();
  }
}
