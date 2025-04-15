import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SessionService } from '@app/shared/services/session.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-location',
  standalone:false,
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  @Input() multiple = false;
  @Input() required= false;
  locationList: any;
  @Output() onChange: EventEmitter<string> = new EventEmitter<string>();
  organizationId: FormControl = new FormControl('');
  constructor(private sessionService: SessionService) { }

  ngOnInit(): void {
    this.sessionService.allLocationSubject$.pipe(take(1)).subscribe((locations) => {
      if (locations && locations.organizations.length > 0) {
        this.locationList = locations.organizations.map((e:any) => ({ text: e.name, value: e.orgId }));
        if(this.required){
          this.organizationId.setValidators(Validators.required);
        }
        
      }
    });
  }
  setselectedLocation(value: string) {
    let element: any = [];
    if (value) {
      element = this.locationList.filter((ele:any) => {
        return value == ele.value;
      });
    }

    if (element[0]) {
      return element[0].text;
    }
    else
      return '';
    //this.onChange.emit(this.organizationId.value);
  }
  selectLocation() {
    this.onChange.emit(this.organizationId.value);
  }
}
