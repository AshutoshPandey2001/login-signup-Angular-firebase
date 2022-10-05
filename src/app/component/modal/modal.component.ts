import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  modalRef?: BsModalRef;
  orderForm: any = FormGroup;
  // items: any;
  selectIForm: any = FormArray;
  submitted = false;
  e: any;
  optionList: any = [
    { name: 'Saree' },
    { name: 'Kurtis' },
    { name: 'Top' },
    { name: 'dress' },
    { name: 'Lehngas' },
    { name: 'Kurtis Set' },
    { name: 'Bottoms' },
    { name: 'One Piease' },
  ];
  // select = true;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService
  ) {}
  ngOnInit() {
    this.orderForm = new FormGroup({
      selectIForm: new FormArray([this.createItem()]),
    });
  }

  onChange(optionList: any) {
    console.log('array', optionList.name.value);
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      selectItem: ['', [Validators.required]],
      number: ['', [Validators.required]],
    });
  }

  itemFill(): void {
    this.submitted = true;
    if (this.orderForm.valid) {
      this.selectIForm = this.orderForm.get('selectIForm') as FormArray;
      this.selectIForm.push(this.createItem());
      // this.submitted = false;
    }
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    // console.log(this.orderForm.get('selectIForm').controls);
  }
  //   addItem() {}
  get f() {
    return this.orderForm.get('selectIForm').controls;
  }
}
