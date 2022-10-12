import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Select, Store } from '@ngxs/store';
// import { GetUserDispatch } from '../../ngxs store/action/userDetails.action';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() headArray: any[] = [];
  // @Input() dataList: any[] = [{}];
  @Input() isAction: boolean = false;
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Input() getArray: any = [];
  // jsonData: any = [];

  // dtOptions: DataTables.Settings = {};

  constructor(private store: Store) {
    // this.getUserDetails();
  }

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   lengthMenu: [5, 10, 15],
    //   processing: true,
    // };
    console.log('getarray', this.getArray);
  }

  // onAddtb() {
  // this.onAdd.emit(item);
  // }
  // Edit();
  onEditb(item1: any) {
    this.onEdit.emit(item1);
  }
  onDeleteb(item1: { orderForm: any }) {
    this.onDelete.emit(item1);
    // console.log('uid');
  }
}
