import { DatePipe } from '@angular/common';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  jsonData: any = [];
  selectedUid: any;
  modalRef?: BsModalRef;
  id: any;

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
    private modalService: BsModalService
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    // console.log('json', this.jsonData);
    // this.gModal();
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
          console.log('User$Data', res);
        });
        // this.store.dispatch(new GetUserDispatch(this.jsonData));

        resolve(this.jsonData);
      });
    });
  }

  // onAddUser(item: any) {
  //   console.log(item);
  // }

  editUser(item1: any) {
    console.log(item1);
    // this.modalRef;
    // this.gModal('openModal');
  }
  DeleteUser(item1: any) {
    this.selectedUid = item1;
    // this.selectedUid = item1;
    // console.log('inside', this.selectedUid);
    // this.firestore.doc(`Dispatchdata/${item1}`).delete();

    // this.store.dispatch(new deleteUser(uid));
  }
  // gModal(template: any) {
  //   console.log('modal', template);
  // }
  isModalPresent(template: any) {
    this.id = template;
    console.log(this.id);
  }
}
