import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnChanges,
} from '@angular/core';
import {
  AuthService,
  DashboardService,
} from '@app/services';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, DialogService } from 'primeng/api';
import { SummaryPopupComponent } from '@app/shared/summary-popup/summary-popup.component';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { take } from 'rxjs/operators';
import { LoadingBarService } from '@ngx-loading-bar/core';

@Component({
  selector: 'estimation',
  templateUrl: './estimation.component.html',
  styleUrls: ['./estimation.component.scss']
})
export class EstimationPriceComponent implements OnInit {
  estimatedPriceValue: Number = 0.0;
  discountPercent: Number = 0.0;
  submitted: boolean = false;
  estimatePriceForm = new FormGroup({
    quantityInUnits: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.min(.1),
        Validators.max(1000000)
      ]),
    ),
    pricePerUnit: new FormControl(
      '',
      Validators.compose([
        Validators.required,
        Validators.min(.1),
        Validators.max(1000000)
      ]),
    ),
  });

  constructor(
    private toast: ToastrService,
    private confirm: ConfirmationService,
    public dialog: DialogService,
    private dashboardSvc: DashboardService,
    public auth: AuthService,
    private loading: LoadingBarService
  ) { }

  ngOnInit() {
    try {
      this.dashboardSvc.getDiscountPercentage()
      .subscribe(res => this.discountPercent = res,
        (err) => {
          throw err;
          //this.toast.error("Some error occured. Please try again after some time!");
        });
    } catch ({ error, message }) {
      console.log(error, message);
      this.toast.error(error ? error.message : message);
    }
  }

  get estimatedPrice() {
    return this.estimatePriceForm.dirty ? 0.0 : this.estimatedPriceValue;
  }

  async calculate() : Promise<Boolean> {
    this.submitted = true;
    try {
      if(this.estimatePriceForm.valid) {
        let res = await this.dashboardSvc.calculate(this.estimatePriceForm.get('quantityInUnits').value, this.estimatePriceForm.get('pricePerUnit').value).toPromise();
        this.estimatedPriceValue = res; 
        this.submitted = false; 
        this.estimatePriceForm.markAsPristine(); 
        return true;
      }
    } catch ({ error, message }) {
      console.log(error, message);
      this.toast.error(error ? error.message : message);
      return false;
    }
  }

  async printToScreen() {
    let isSuccessCall = await this.calculate();
    if(isSuccessCall) {
      const dialogRef = this.dialog.open(SummaryPopupComponent, {
        width: '450px',
        header: "Estimated Price",
        data: {
          text: "Is the order for the multiannual agreement going to be placed for all the years together?"
          , quantityInUnits: this.estimatePriceForm.get('quantityInUnits').value
          , pricePerUnit: this.estimatePriceForm.get('quantityInUnits').value
          , isPriviledgedUser: this.auth.isPriviledged
          , discountPercent: this.discountPercent
          , estimatedPrice : this.estimatedPrice}
      });
  
      dialogRef.onClose.subscribe(() => {
      },err => {this.toast.error("Some error occured. Try again after some time!"); console.error(err);});
    }
    else {
      this.toast.error("Failed to calculate the total estimate, Please try again later!");
    }
  }

  async printToFile() {
    await this.loading.start();
    let isSuccessCall = await this.calculate();
    if(isSuccessCall) {
      let DATA = document.getElementById('EstimateTemplate');
      let lastNode = DATA.childNodes[5] ? DATA.childNodes[5]: DATA.childNodes[4];
      DATA.removeChild(lastNode);
      html2canvas(DATA).then(canvas => {
        let fileWidth = 208;
        let fileHeight = canvas.height * fileWidth / canvas.width;
        
        const FILEURI = canvas.toDataURL('image/png')
        let PDF = new jsPDF('p', 'mm', 'a4');
        let position = 0;
        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
        
        PDF.save('gold-estimate.pdf');
      }).catch((err) =>
        this.toast.error("Some error occured. Try again after some time!")
      ).finally(() => {
        DATA.appendChild(lastNode);
        this.loading.stop();
      });  
    }
    else {
      this.toast.error("Failed to calculate the total estimate, Please try again later!");
    }
  }

  async printToPaper() {
    //No need to implement api for this as this feature can be handled by the browser itself.
    //Hence, no need to throw NotImplementedException frombackend API.
    this.toast.error("This festure is coming soon! Stay tuned.");
  }
}

