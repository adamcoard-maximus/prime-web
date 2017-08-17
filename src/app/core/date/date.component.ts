import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BaseComponent } from '../base-component/base-component.component';

@Component({
  selector: 'prime-date',
  templateUrl: './date.component.html',
  styleUrls: ['./date.component.scss']
})
export class DateComponent extends BaseComponent implements OnInit {

  @Input() showError: boolean;
  @Input() required: boolean = true;
  @Input() year: number | string;
  @Output() yearChange = new EventEmitter<number | string>();
  @Input() month: number;
  @Output() monthChange = new EventEmitter<number>();
  @Input() day: number | string;
  @Output() dayChange = new EventEmitter<number | string>();

  constructor() {
    super();
  }

  ngOnInit() {
    // Can toggle to show all errors for design purposes
    // this.showError = true;
  }

  setYearValueOnModel(value: string) {
    if (value) {
      this.year = parseInt(value);
    } else {
      this.year = value;
    }
    this.yearChange.emit(this.year);
  }

  setDayValueOnModel(value: string) {
    if (value) {
      this.day = parseInt(value);
    } else {
      this.day = value;
    }
    this.dayChange.emit(this.day);
  }

  setMonthValueOnModel(value: string) {
    if (value) {
      this.month = parseInt(value);
    } else {
      this.month = NaN;
    }
    this.monthChange.emit(this.month);
  }

  isValid(): boolean {
    if (this.required) {
      if (!this.year || !this.month || !this.day) {
        return false;
      }
    }
    else {
      //Non-required components are okay if all fields are blank.
      if (!this.year && !this.month && !this.day){
        return true;
      }
    }

    //Month indices start at 1 for Jan, so 0 is unselected.
    if (!(this.month && this.month > 0 && this.month <= 12)) {
      return false;
    }

    if (this.month && (!this.day || !this.year)  ){
        return false;
    }

    return true;
  }

}