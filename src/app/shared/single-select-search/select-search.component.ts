import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { takeUntil, take } from 'rxjs/operators';
import { untilDestroyed } from '@app/core/until-destroyed';
import { ReplaySubject, Subject } from 'rxjs';
import { MatSelect } from '@angular/material/select';
import { FormControl, Validators } from '@angular/forms';
import { Logger } from '@app/core/logger.service';
import { id } from '@swimlane/ngx-charts';

const log = new Logger('Single select search');
@Component({
  standalone:false,
  selector: 'app-select-search',
  templateUrl: './select-search.component.html',
  styleUrls: ['./select-search.component.scss']
})
export class SelectSearchComponent implements OnInit, AfterViewInit, OnDestroy {
  /** select placeholder */
  @Input() selectPlaceholder: string = "Select";

  @Input() otherErrorMsg:string='';
  /** search textbox placeholder */
  @Input() searchPlaceholder: string = "Search";

  @Input() label:string='';

  @Input() className:string='';

  /** Message if no value found for respective search */
  @Input() emptySearchMessage: string = "No Entry Found";

  /** list of values */
  @Input() valueArrays:any[] = [];

  /** select is requuired or not. */
  @Input() required: Boolean = false;

  @Input() multiple: Boolean = false;

  @Input() disable: Boolean = false;

  /** Value to emit when selection Chage */
  @Output() onValueChange: EventEmitter<any> = new EventEmitter();

  /** control for the selected bank */
  public ArrayCtrl: FormControl=new FormControl();

  /**Error messgae to display */
  errorMsg: string='';

  /** control for the MatSelect filter keyword */
  public ArrayFilterCtrl: FormControl = new FormControl();

  /** list of values filtered by search keyword */
  public filteredvalueArray: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  /** local copy of filtered banks to help set the toggle all checkbox state */
  protected filteredvalueArrayCache: any[] = [];

  /** Dfault value to be selected in the select list control */
  @Input() defaultValue: any;

  @ViewChild('singleSelect', { static: true }) singleSelect!: MatSelect ;

  /** Subject that emits when the component has been destroyed. */
  protected _onDestroy = new Subject<void>();

  /** flags to set the toggle all checkbox state */
  isIndeterminate = false;
  isChecked = false;

  constructor() { }

  ngOnInit() {

    if (this.required) {
      this.ArrayCtrl = new FormControl('', [Validators.required]);
      this.errorMsg = 'Please select ' + this.selectPlaceholder;
    } 
    // set initial selection
     if (this.defaultValue){
      if(this.multiple){        
        this.ArrayCtrl.setValue(this.valueArrays.filter(obj => this.defaultValue.includes(obj.id)));
      }
      else{
        this.ArrayCtrl.setValue(this.valueArrays.find(obj => obj.id==this.defaultValue));
      }
      this.onValueChange.emit({ value: this.ArrayCtrl.value, valid: this.ArrayCtrl.valid });
     }

    if(this.valueArrays)
      // load the initial value list
      this.filteredvalueArray.next(this.valueArrays.slice());
    
    // listen for search field value changes
    this.ArrayFilterCtrl.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(() => {
        this.filtervalues();
        this.setToggleAllCheckboxState();
      });
           // listen for multi select field value changes
    this.ArrayCtrl.valueChanges
    .pipe(takeUntil(this._onDestroy)).subscribe(() => {
      this.setToggleAllCheckboxState();
      
    });

    this.change('');

    if(this.disable)
      this.ArrayCtrl.disable();
   
  }

  ngAfterViewInit() {
    this.setInitialValue();
  }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  toggleSelectAll(selectAllValue: boolean) {
    this.filteredvalueArray.pipe(take(1), takeUntil(this._onDestroy))
      .subscribe(val => {        
        if (selectAllValue) {
          this.ArrayFilterCtrl.patchValue(val);
        } else {
          this.ArrayFilterCtrl.patchValue([]);
        }
      });
  }
  change(data: any) {
    if(data && data.value)
      this.onValueChange.emit({ value: data.value, valid: this.ArrayCtrl.valid });
  }

  /**
   * Sets the initial value after the filteredvalues are loaded initially
   */
  protected setInitialValue() {
    this.filteredvalueArray
      .pipe(take(1), untilDestroyed(this))
      .subscribe(() => {
        // setting the compareWith property to a comparison function
        // triggers initializing the selection according to the initial value of
        // the form control (i.e. _initializeSelection())
        // this needs to be done after the filteredvalues are loaded initially
        // and after the mat-option elements are available
        this.singleSelect.compareWith = (a: any, b: any) => a && b && a.id === b.id;
      });
  }

  protected filtervalues() {
    if (!this.valueArrays) {
      return;
    }
    // get the search keyword
    let search = this.ArrayFilterCtrl.value;
    if (!search) {
      this.filteredvalueArrayCache=this.valueArrays.slice();
      this.filteredvalueArray.next(this.valueArrays.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // // filter the values here
    // this.filteredvalueArray.next(
    //   this.valueArrays.filter(x => x.name.toLowerCase().indexOf(search) > -1)
    // );
    // //this.onValueChange.emit({value: this.ArrayCtrl.value});
    // filter the banks
    this.filteredvalueArrayCache = this.valueArrays.filter(x => x.name.toLowerCase().indexOf(search) > -1);
    this.filteredvalueArray.next(this.filteredvalueArrayCache);
  }
  protected setToggleAllCheckboxState() {
    let filteredLength = 0;
    if (this.ArrayFilterCtrl && this.ArrayFilterCtrl.value) {
      this.filteredvalueArrayCache.forEach(el => {
        if (this.ArrayFilterCtrl.value.indexOf(el) > -1) {
          filteredLength++;
        }
      });
      this.isIndeterminate = filteredLength > 0 && filteredLength < this.filteredvalueArrayCache.length;
      this.isChecked = filteredLength > 0 && filteredLength === this.filteredvalueArrayCache.length;
    }
  }
}

