import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() headArray: any[] = [];
  @Input() dataList: any[] = [];
  @Input() isAction: boolean = false;
  @Output() onEdit = new EventEmitter<any>();
  @Output() onDelete = new EventEmitter<any>();
  @Output() onAdd = new EventEmitter<any>();

  // dtOptions: DataTables.Settings = {};

  constructor() {}

  ngOnInit(): void {
    // this.dtOptions = {
    //   pagingType: 'full_numbers',
    //   pageLength: 5,
    //   lengthMenu: [5, 10, 15],
    //   processing: true,
    // };
  }
  onAddtb() {
    // this.onAdd.emit(item);
  }
  onEditb(item: any) {
    this.onEdit.emit(item);
  }
  onDeleteb(item: any) {
    this.onDelete.emit(item);
  }
}
