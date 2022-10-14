import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss'],
})
export class ReceivedComponent implements OnInit {
  modalRef?: BsModalRef;
  orderForm: any = FormGroup;

  constructor(public modal: BsModalRef, private modalService: BsModalService) {}

  ngOnInit(): void {}

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closemodal() {
    this.modalRef?.hide();
  }
}
