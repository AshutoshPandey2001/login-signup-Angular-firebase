import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-received',
  templateUrl: './received.component.html',
  styleUrls: ['./received.component.scss'],
})
export class ReceivedComponent implements OnInit {
  modalRef?: BsModalRef;
  receivedForm: any = FormGroup;
  arrayForm: any = FormArray;
  jsonData: any = [];
  oneselectitem: any;
  uid: any;
  headArrayList = [
    { Head: 'Date', FieldName: 'date' },
    { Head: 'selectProduct', FieldName: 'selectProduct' },
    { Head: 'Number', FieldName: 'number' },
    { Head: 'Action', FieldName: '' },
  ];
  option: any = [
    { name: 'Saree', disable: false },
    { name: 'Kurtis', disable: false },
    { name: 'Top', disable: false },
    { name: 'dress', disable: false },
    { name: 'Lehngas', disable: false },
    { name: 'Kurtis Set', disable: false },
    { name: 'Bottoms', disable: false },
    { name: 'One Piease', disable: false },
  ];
  pipe = new DatePipe('en-IN');

  // firestore: any;

  constructor(
    private modalService: BsModalService,
    public formbuilder: FormBuilder,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.receivedForm = new FormGroup({
      arrayForm: new FormArray([this.createItem()]),
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  closemodal() {
    this.modalRef?.hide();
  }
  onChange(getvalue: any) {
    this.oneselectitem = getvalue;
  }
  createItem(): FormGroup {
    return this.formbuilder.group({
      selectProduct: ['', [Validators.required]],
      number: ['', [Validators.required]],
    });
  }
  addForm() {
    // let data = {}
    // this.submitted = true;
    if (this.receivedForm.valid) {
      this.arrayForm = this.receivedForm.get('arrayForm') as FormArray;
      this.arrayForm.push(this.createItem());
      console.log(this.arrayForm);
      // console.log(this.selectIForm);
      // for (let i = 0; i < this.option.length; i++) {
      //   if (this.optionList[i].name == this.oneselectitem) {
      //     this.optionList[i].disable = true;
      //   }
      // }
      // } else {
      // this.submitted = true;
      // alert('ok');
    }
    for (let i = 0; i < this.option.length; i++) {
      if (this.option[i].name == this.oneselectitem) {
        this.option[i].disable = true;
      }
    }
  }
  removeForm(i: any) {
    const remove = this.receivedForm.get('arrayForm') as FormArray;
    remove.removeAt(i);
  }

  async submit() {
    if (this.receivedForm.valid) {
      try {
        let data = {
          // orderForm: this.orderForm.controls.selectIForm.value,
          arrayForm: this.receivedForm.controls.arrayForm,
          uid: Math.random().toString(36).substr(2, 9),
        };
        let user = await this.firestore.collection('Received').doc(data.uid);
        let res = await user.set({
          receivedForm: this.receivedForm.value
            ? this.receivedForm.controls.arrayForm.value
            : '',
          date: this.pipe.transform(new Date(), 'short'),
          uid: data.uid,
          // date: this.date ? this.orderForm.controls.value : '',
        });
        // this.getUserDetails();
        this.closemodal();
      } catch (error: any) {
        Swal.fire('Error!', error.message, 'error');
        // this.orderForm.selectIForm.selectItem;
      }
    } else {
      console.error('errrrrrrrrrrooooooooor');
      // Swal.fire('Error!', error.message, 'error');
    }
  }
  getUserDetails() {
    return new Promise((resolve) => {
      // var userData$: any[] = [];

      let dataRef = this.firestore.collection('Received');
      dataRef.get().subscribe((res) => {
        res.forEach((doc) => {
          // console.log('get res ', doc);
          let res: any = doc.data();
          this.jsonData.push(res);
          // console.log('User$Data', this.jsonData);
        });

        resolve(this.jsonData);
        // this.store.dispatch(new addDispatchdata(this.jsonData));
      });
    });
  }
  onEditb(item1: any, template: TemplateRef<any>, i: any) {
    this.uid = item1.uid;
    this.modalRef = this.modalService.show(template);
    this.arrayForm = [null];
    // this.selectedUid = item1.uid;
    // ---------
    for (let i = 0; i < item1.receivedForm.length; i++) {
      this.arrayForm.push(this.createItem());
      this.setData(i, item1);
    }
  }
  setData(i: any, item1: any) {
    this.arrayForm = this.receivedForm.get('arrayForm') as FormArray;
    var a = this.arrayForm.controls[i] as FormArray;
    console.log('item1', a);
    a.get('selectProduct')?.setValue(item1.receivedForm[i].selectProduct);
    a.get('number')?.setValue(item1.receivedForm[i].number);
  }
  async update() {
    // this.issubmitvisible = true;
    // this.selectedUid = this.uid;
    if (this.receivedForm.valid) {
      try {
        let user = await this.firestore.collection('Received').doc(this.uid);
        let res = await user.update({
          receivedForm: this.receivedForm.value
            ? this.receivedForm.controls.arrayForm.value
            : '',
        });
        // console.log(data);
        this.closemodal();
      } catch (error: any) {
        Swal.fire('Error!', error.message, 'error');
        // this.orderForm.selectIForm.selectItem;
      }
    } else {
      console.error('errrrrrrrrrrooooooooor');
    }
  }

  onDeleteb(item1: any) {
    this.firestore.doc(`Received/${item1.uid}`).delete();
  }
}
