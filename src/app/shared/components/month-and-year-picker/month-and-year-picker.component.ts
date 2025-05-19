import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';

// Depending on whether rollup is used, moment needs to be imported differently.
// Since Moment.js doesn't have a default export, we normally need to import using the `* as`
// syntax. However, rollup creates a synthetic default module and we thus need to import it using
// the `default as` syntax.
import  _moment from 'moment';
// tslint:disable-next-line:no-duplicate-imports
import { Moment } from 'moment';
import { Logger } from '@app/core/logger.service';


let moment = _moment;
const log = new Logger('Month and year picker');
// See the Moment.js docs for the meaning of these formats:
// https://momentjs.com/docs/#/displaying/format/
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'MMM - YYYY',
    monthYearLabel: 'MMM YYYY',
    // dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};
@Component({
  standalone:false,
  selector: 'app-month-and-year-picker',
  templateUrl: './month-and-year-picker.component.html',
  styleUrls: ['./month-and-year-picker.component.css'],
  providers: [
    // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
    // application's root module. We provide it at the component level here, due to limitations of
    // our example generation script.
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class MonthAndYearPickerComponent implements OnInit {

  @Output() onValueChange: EventEmitter<any> = new EventEmitter();
  maxDate = new Date();
  @Input() defaultValue:any;
  nextBtn: boolean = false;
  constructor() { }

  ngOnInit(): void {   
    this.diabledNextBtn();
    if(this.defaultValue)
      this.date.setValue(moment(this.defaultValue));
   
    this.onValueChange.emit(this.date.value);
  }

  date = new FormControl(moment());

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    ctrlValue?.year(normalizedYear.year());
    this.date.setValue(ctrlValue);
    this.emitdate();
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value;
    ctrlValue?.month(normalizedMonth.month());
    this.date.setValue(ctrlValue);
    datepicker.close();
    this.emitdate();
    this.diabledNextBtn();
  }
  previous() {
    const ctrlValue = this.date.value;
    if(this.date.value) {
    ctrlValue?.month(this.date.value.month() - 1);
    this.date.setValue(ctrlValue);
    this.diabledNextBtn();
    this.emitdate();
    }
  }
  next() {
    const ctrlValue = this.date.value;
    if(this.date.value){
    ctrlValue?.month(this.date.value.month() + 1);
    this.date.setValue(ctrlValue);
    this.diabledNextBtn();
    this.emitdate();
    }
  }
  emitdate() {
    this.onValueChange.emit(this.date.value);
  }
  diabledNextBtn() {
    if(this.date.value) {
    if (+this.date.value.format('MM') === +(new Date().getMonth()+1))
      this.nextBtn = true;
      else
      this.nextBtn=false;
  }
}
}
