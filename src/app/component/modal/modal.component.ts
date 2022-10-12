import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  pipe = new DatePipe('en-IN');
  @Output() onModal = new EventEmitter<any>();
  @Input() id: any;
  // @Input() optionList: any[] = [];

  // @Output()  = new EventEmitter<any>();
  modalRef?: BsModalRef;
  orderForm: any = FormGroup;
  oneselectitem: any;
  selectIForm: any = FormArray;
  submitted = false;
  // date = new Date();
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
  filter: any;
  check: any;
  // date: any;

  // select = true;
  constructor(
    private formBuilder: FormBuilder,
    private modalService: BsModalService,
    private firestore: AngularFirestore,
    public modal: BsModalRef
  ) {}
  ngOnInit() {
    console.log(this.id);
    this.openModal(this.id);
    this.orderForm = new FormGroup({
      selectIForm: new FormArray([this.createItem()]),
    });
    // this.formBuilder.group({
    //   date: new Date(),
    // });
  }

  async onChange(getvalue: any) {
    // console.log('array', typeof getvalue);

    // this.filter.selectItem = getvalue.target.name;
    // console.log(getvalue.target.name);
    // var arr = [getvalue];
    // var result = this.optionList.splice((val: any) => {
    //   return !arr.find((getvalue) => {
    //     return getvalue.name;
    //   });
    // });
    this.oneselectitem = getvalue;
    // this.oneselectitem = true;
    // if (getvalue == 'selectItem') {
    //   this.oneselectitem = this.optionList;
    //   this.oneselectitem.pop();
    // }

    // console.log('CONTAINS', getvalue);

    // this.selectIForm.splice;
    // console.log(this.optionList);
    // const result = this.optionList.filter((s) => s.includes('name'));
    // console.log(this.optionList);
    // console.log('result', result);

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
    // for (let i = 0; i < this.optionList.length; i++) {
    // if (this.optionList[i].name == getvalue) {
    // this.optionList[i].name = getvalue;
    // } else if (this.optionList[i]) {
    //   this.optionList[i].disable = false;
    // }
    // }
    // else {
    //   this.optionList[i].name = getvalue;
    // }
    // console.log(this.optionList);
    // console.log(getvalue);
    // }

    // if (this.optionList.name !== getvalue) {
    //   this.optionList.name;
    // } else {
    // }
    // console.log(getvalue);
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      selectItem: ['', [Validators.required]],
      number: ['', [Validators.required]],
      // date: new Date(),
    });
  }

  async addForm() {
    // let data = {}
    this.submitted = true;
    if (this.orderForm.valid) {
      this.selectIForm = this.orderForm.get('selectIForm') as FormArray;
      this.selectIForm.push(this.createItem());
      // console.log(this.selectIForm);
      for (let i = 0; i < this.optionList.length; i++) {
        if (this.optionList[i].name == this.oneselectitem) {
          this.optionList[i].disable = true;
        }
      }
      // this.submitted = false;
    } else {
      // this.submitted = true;
      // alert('ok');
    }
  }
  removeForm(i: any) {
    const remove = this.orderForm.get('selectIForm') as FormArray;
    remove.removeAt(i);
  }

  async submitb() {
    if (this.orderForm.valid) {
      try {
        let data = {
          // orderForm: this.orderForm.controls.selectIForm.value,
          selectIForm: this.orderForm.controls.selectIForm,
        };
        let user = await this.firestore
          .collection('Dispatchdata')
          .doc(this.orderForm.any);
        let res = await user.set({
          orderForm: this.orderForm.value
            ? this.orderForm.controls.selectIForm.value
            : '',
          date: this.pipe.transform(new Date(), 'short'),
          // date: this.date ? this.orderForm.controls.value : '',
        });
        // console.log(this.orderForm);
        // this.getUserDetails();
        // console.log(data);
        // this.modal.hide();
      } catch (error: any) {
        Swal.fire('Error!', error.message, 'error');
        // this.orderForm.selectIForm.selectItem;
      }
    } else {
      console.error('errrrrrrrrrrooooooooor');
      // Swal.fire('Error!', error.message, 'error');
    }

    this.clearData();
  }

  openModal(template: TemplateRef<any>) {
    console.log(template);
    // this.onModal.emit(template);
    this.modalRef = this.modalService.show(template);
    // console.log(this.orderForm.get('selectIForm').controls);
    // this.optionList.sort((a:) => a.price);
    // console.log(a);
    // this.optionList.sort((a: any) => {
    //   a.price;
    //   console.log(a.price);
    // });
  }

  //   addItem() {}
  clearData() {
    this.orderForm.reset();
  }
  get f() {
    return this.orderForm.get('selectIForm').controls;
  }
}
