import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { BaseComponent } from '../../core/base-component/base-component.component'
import { ModalDirective } from 'ngx-bootstrap/modal';
// import { ConsentModalContent } from './content/consent-modal-content.component';

@Component({
  selector: 'app-consent-modal',
  templateUrl: './consent-modal.component.html',
  styleUrls: ['./consent-modal.component.scss']
})
export class ConsentModalComponent extends BaseComponent implements AfterViewInit {
  bsModalRef: BsModalRef
  @ViewChild('informationCollectionModal') public informationCollectionModal:ModalDirective;


  constructor(private modalService: BsModalService) {
    super();
  }

  ngAfterViewInit() {
    this.openModal();
  }

  public openModal(): void {
    this.informationCollectionModal.show();
  }

  public closeModal(): void {
    this.informationCollectionModal.hide();
  }



}
