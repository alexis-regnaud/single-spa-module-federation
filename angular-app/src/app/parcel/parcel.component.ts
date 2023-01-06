import { Component } from '@angular/core';
import { singleSpaPropsSubject } from '../../single-spa/single-spa-props';

@Component({
  selector: 'app-parcel',
  templateUrl: './parcel.component.html',
  styleUrls: ['./parcel.component.scss']
})
export class ParcelComponent {
  public props$ = singleSpaPropsSubject;
  title = 'angular-parcel';
}
