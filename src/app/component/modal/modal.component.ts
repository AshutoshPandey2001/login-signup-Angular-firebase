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
  oneselectitem: any;
  isdisable = false;
  // items: any;
  selectIForm: any = FormArray;
  submitted = false;

  optionList: any = [
    { name: 'Saree', disable: false },
    { name: 'Kurtis', disable: false },
    { name: 'Top', disable: false },
    { name: 'dress', disable: false },
    { name: 'Lehngas', disable: false },
    { name: 'Kurtis Set', disable: false },
    { name: 'Bottoms', disable: false },
    { name: 'One Piease', disable: false },
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

  async onChange(getvalue: any) {
    console.log('array', typeof getvalue);
    console.log('console', this.optionList.name);
    this.oneselectitem = getvalue;
    // this.selectIForm.splice;
    console.log(this.optionList);
    // this.optionList.map(this.optionList.name);
    // console.log('message', this.optionList.name);
    // console.log('ertyu', this.oneselectitem);
    // if (getvalue != '') {
    //   +"getvalue option[value = '" + getvalue + "']";
    // }
    // let filterArray = await this.optionList.filter(
    //   (item: any) => item.name !== getvalue
    // );
    // console.log(filterArray);
    // this.optionList = filterArray;
    for (let i = 0; i < this.optionList.length; i++) {
      if (this.optionList[i].name == getvalue) {
        this.optionList[i].disable = true;
        // } else if (this.optionList[i]) {
        //   this.optionList[i].disable = false;
        // } else {
        //   this.optionList[i].disable = false;
      }
    }

    // if (this.optionList.name !== getvalue) {
    //   this.optionList.name;
    // } else {
    // }
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
