import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotifyBarService } from '../services/notify-bar.service';
import { BehaviorSubject, ReplaySubject } from 'rxjs';



@Component({
  standalone:false,
  selector: 'app-notify-bar',
  templateUrl: './notify-bar.component.html',
  styleUrls: ['./notify-bar.component.css']
})
export class NotifyBarComponent implements OnInit , OnDestroy {
  public messageSub:any;
  public messages = {
    info: [],
    warn: []
  };
  constructor(private _notifybarservice: NotifyBarService) { }


  ngOnInit(): void {
    this.messageSub = this._notifybarservice.messages$.subscribe((messagearray) => {
      this.messages = {
        info: [],
        warn: []
      };
      messagearray.forEach((message) => {
        //this.messages[message.Type].push(message.Text);
      });
    });
  }

  ngOnDestroy(): void {
    this._notifybarservice.clear();
  }

  public trackByfn(index: any, item: any) {
    return item._id || index;
  }
}
