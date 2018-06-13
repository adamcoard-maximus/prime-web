import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'prime-accept-reject-icons',
  templateUrl: './accept-reject-icons.component.html',
  styleUrls: ['./accept-reject-icons.component.scss']
})
export class AcceptRejectIconsComponent implements OnInit {
  @Output() onAccepted = new EventEmitter<boolean>();
  @Output() onRejected = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

}
