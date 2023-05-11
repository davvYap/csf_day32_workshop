import { Component, Input, OnInit, Output } from '@angular/core';
import { ToDo } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
})
export class TaskComponent implements OnInit {
  @Input()
  dataArrayFromRoot!: ToDo[];

  toDoData!: ToDo;

  @Output()
  dataToEdit = new Subject<ToDo>();

  get value(): ToDo {
    return this.toDoData;
  }

  set value(data: ToDo) {
    this.dataToEdit.next(data);
  }

  // retrieve from local storage
  ngOnInit(): void {
    let length: number = localStorage.length;
    for (let i = 0; i < length; i++) {
      this.dataArrayFromRoot.push(JSON.parse(localStorage.getItem(String(i))!));
    }
  }

  emptyData(): boolean {
    return this.dataArrayFromRoot.length <= 0;
  }

  saveToStorage(): void {
    let index: number = 0;
    this.dataArrayFromRoot.forEach((data) => {
      let dataStr = JSON.stringify(data);
      localStorage.setItem(String(index), dataStr);
      index++;
    });
  }

  clearAllStorage(): void {
    localStorage.clear();
    this.dataArrayFromRoot = [];
  }

  editToDo(i: number): void {
    this.dataToEdit.next(this.dataArrayFromRoot[i]);
    console.log(
      'Data to edit from Tasks Component>>>>>> ',
      this.dataArrayFromRoot[i]
    );
  }

  deleteToDo(i: number): void {
    this.dataArrayFromRoot.splice(i, 1);
    localStorage.removeItem(String(i));
  }
}
