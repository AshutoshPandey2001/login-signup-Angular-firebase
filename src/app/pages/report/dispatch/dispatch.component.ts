import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalComponent } from 'src/app/component/modal/modal.component';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { Store } from '@ngxs/store';
// import { addDispatchdata } from 'src/app/ngxs store/action/userDetails.action';

@Component({
  selector: 'app-dispatch',
  templateUrl: './dispatch.component.html',
  styleUrls: ['./dispatch.component.scss'],
})
export class DispatchComponent implements OnInit {
  headArrayList = [
    { Head: 'Date', FieldName: 'date' },
    { Head: 'selectItem', FieldName: 'selectItem' },
    { Head: 'Number', FieldName: 'number' },
    { Head: 'Action', FieldName: '' },
  ];
  modalRef?: BsModalRef;
  orderForm: any = FormGroup;
  oneselectitem: any;
  selectIForm: any = FormArray;
  submitted = false;
  jsonData: any = [];
  selectedUid: any;
  id: any;
  issubmitvisible = true;
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
  pipe = new DatePipe('en-IN');
  // oderForm: any;
  uid: any;

  // {
  //   playerName: 'Cristiano Ronaldo',
  //   playerCountry: 'Pourtgal',
  //   playerClub: 'Juventus',
  // },
  // {
  //   playerName: 'Lionel Messi',
  //   playerCountry: 'Argentina',
  //   playerClub: 'Barcelona',
  // },
  // {
  //   playerName: 'Neymar Junior',
  //   playerCountry: 'Brazil',
  //   playerClub: 'PSG',
  // },
  // {
  //   playerName: 'Tonni Kroos',
  //   playerCountry: 'Germany',
  //   playerClub: 'Real Madrid',
  // },
  // {
  //   playerName: 'Paul Pogba',
  //   playerCountry: 'France',
  //   playerClub: 'Manchester United',
  // },
  // {
  //   playerName: 'Sergio Ramos',
  //   playerCountry: 'Espain',
  //   playerClub: 'Real Madrid',
  // },
  // {
  //   playerName: 'H. Kane',
  //   playerCountry: 'England',
  //   playerClub: 'Tottanhum',
  // },
  // {
  //   playerName: 'Luiz Suarez',
  //   playerCountry: 'Urgway',
  //   playerClub: 'Atletico Madrid',
  // },
  // {
  //   playerName: 'Eden Hazard',
  //   playerCountry: 'Belgium',
  //   playerClub: 'Real Madrid',
  // },
  // {
  //   playerName: 'Vinicious Junior',
  //   playerCountry: 'Brazil',
  //   playerClub: 'Real Madrid',
  // },
  // {
  //   playerName: 'Karim Benzema',
  //   playerCountry: 'France',
  //   playerClub: 'Real Madrid',
  // },
  // {
  //   playerName: 'Ant. Grizzeman',
  //   playerCountry: 'France',
  //   playerClub: 'Barcelona',
  // },
  // {
  //   playerName: 'Sadio Mane',
  //   playerCountry: 'NA',
  //   playerClub: 'Liverpool',
  // },
  // ];
  constructor(
    private firestore: AngularFirestore,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    public modal: BsModalRef,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.orderForm = new FormGroup({
      selectIForm: new FormArray([this.createItem()]),
    });
  }
  onChange(getvalue: any) {
    this.oneselectitem = getvalue;
  }
  createItem(): FormGroup {
    return this.formBuilder.group({
      selectItem: ['', [Validators.required]],
      number: ['', [Validators.required]],

      // date: new Date(),
    });
  }
  addForm() {
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

  openModal(template: TemplateRef<any>) {
    // console.log('dyufu', template);
    this.modalRef = this.modalService.show(template);
  }
  closemodal() {
    this.modalRef?.hide();
    this.removeForm('i') == this.addForm();
    this.clearData();
  }
  clearData() {
    this.orderForm.reset();
  }
  get f() {
    return this.orderForm.get('selectIForm').controls;
  }
  async submitb() {
    this.issubmitvisible = true;
    if (this.orderForm.valid) {
      try {
        let data = {
          // orderForm: this.orderForm.controls.selectIForm.value,
          selectIForm: this.orderForm.controls.selectIForm,
          uid: Math.random().toString(36).substr(2, 9),
        };
        let user = await this.firestore
          .collection('Dispatchdata')
          .doc(data.uid);
        let res = await user.set({
          orderForm: this.orderForm.value
            ? this.orderForm.controls.selectIForm.value
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

    this.clearData();
  }

  getUserDetails() {
    return new Promise((resolve) => {
      // var userData$: any[] = [];

      let dataRef = this.firestore.collection('Dispatchdata');
      dataRef.get().subscribe((res) => {
        res.forEach((doc) => {
          // console.log('get res ', doc);
          let res: any = doc.data();
          this.jsonData.push(res);
          // console.log('User$Data', res);
        });
        // this.store.dispatch(new GetUserDispatch(this.jsonData));

        resolve(this.jsonData);
        // console.log('res', this.jsonData);
        // this.store.dispatch(new addDispatchdata(this.jsonData));
      });
    });
  }

  // Table buttons
  onEditb(item1: any, template: any, i: any) {
    this.issubmitvisible = false;
    this.uid = item1.uid;
    this.modalRef = this.modalService.show(template);
    this.selectIForm = [null];
    // this.selectedUid = item1.uid;
    // ---------
    for (let i = 0; i < item1.orderForm.length; i++) {
      this.selectIForm.push(this.createItem());
      this.setData(i, item1);
      // ------
      // this.selectIForm = this.orderForm.get('selectIForm') as FormArray;
      // var a = this.selectIForm.controls[i] as FormArray;
      // console.log('item1', a);
      // a.get('selectItem')?.setValue(item1.orderForm[i].selectItem);
      // a.get('number')?.setValue(item1.orderForm[i].number);
      // ----------
    }
    // this.orderForm.patchValue({
    //   // date: item1.date,

    // -----------
    // item1.orderForm.forEach((item: any) => {
    //   // console.log(item.selectItem);
    //   // this.selectIForm.push(this.createItem());
    //   this.orderForm.controls.selectIForm.controls[0].patchValue({
    //     selectItem: item.selectItem,
    //     number: item.number,
    // });
    // console.log(this.orderForm.controls.selectIForm.controls[0].value);
    // });
    // });
    // ----------
    //   selectItem: item1.selectItem,
    // this.selectIForm.patchValue({
    //   // uid: uid,
    //   number: item1.number,

    // });
    // this.onEdit.emit(item1);
  }
  setData(i: any, item1: any) {
    this.selectIForm = this.orderForm.get('selectIForm') as FormArray;
    var a = this.selectIForm.controls[i] as FormArray;
    console.log('item1', a);
    a.get('selectItem')?.setValue(item1.orderForm[i].selectItem);
    a.get('number')?.setValue(item1.orderForm[i].number);
  }
  async update() {
    this.issubmitvisible = true;
    // this.selectedUid = this.uid;
    if (this.orderForm.valid) {
      try {
        // let data = {
        //   // orderForm: this.orderForm.controls.selectIForm.value,
        //   selectIForm: this.orderForm.controls.selectIForm,
        // };
        let user = await this.firestore
          .collection('Dispatchdata')
          .doc(this.uid);
        let res = await user.update({
          orderForm: this.orderForm.value
            ? this.orderForm.controls.selectIForm.value
            : '',
          // date: this.pipe.transform(new Date(), 'short'),
          // uid: Math.random().toString(36).substr(2, 9),
          // date: this.date ? this.orderForm.controls.value : '',
        });
        // console.log(data);
        this.closemodal();
      } catch (error: any) {
        Swal.fire('Error!', error.message, 'error');
        // this.orderForm.selectIForm.selectItem;
      }
    } else {
      console.error('errrrrrrrrrrooooooooor');
      // Swal.fire('Error!', error.message, 'error');
    }
    // try {
    //   let data = {
    //     selectItem: this.orderForm.controls.selectIForm.controls[0].selectItem,
    //     number: this.orderForm.controls.selectIForm.controls[0].value.number,
    //     // uid: this.orderForm.controls.selectIForm.controls[0].value.uid,
    //   };
    //   console.log(this.jsonData[0].uid);
    //   console.log(this.orderForm.controls.selectIForm.controls[0].selectItem);
    //   // let user = await this.firestore.collection('Dispatchdata').doc();
    //   // let res: any = await user.update({
    //   //   selectItem: data.selectItem,
    //   //   number: data.number,
    //   // });
    //   // return res;
    // } catch (error: any) {
    //   Swal.fire('Error!', error.message, 'error');

    //   console.error('in update error', error);
    // }
  }
  onDeleteb(item1: any) {
    // this.onDelete.emit(item1);
    // console.log('uid');
    this.firestore.doc(`Dispatchdata/${item1.uid}`).delete();
    // console.log(item1.uid);
  }

  // gModal(template: any) {
  //   console.log('modal', template);
  // }
  isModalPresent(template: any) {
    this.id = this.modalService.show(template);
    console.log(template);
    // this.id = template;
    // this.modalRef = this.modalService.show(template);
    // console.log(this.id);
  }
}
