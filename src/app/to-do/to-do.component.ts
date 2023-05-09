import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

import { ToDo, Task } from '../models';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.css'],
})
export class ToDoComponent implements OnInit {
  toDoForm!: FormGroup;
  tasksArray!: FormArray;
  toDo!: ToDo;

  @Output()
  //toDoSubject = new Subject<string>();
  toDoSubject = new EventEmitter<string>();

  @Input()
  submittedDataToEdit!: ToDo;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.toDoForm = this.createNewForm();
  }

  private createNewForm(): FormGroup {
    this.tasksArray = this.fb.array([]);
    return this.fb.group({
      title: this.fb.control<string>('whattodo', [
        Validators.required,
        Validators.min(3),
      ]),
      name: this.fb.control<string>('david', [
        Validators.required,
        Validators.min(3),
      ]),
      tasks: this.tasksArray,
    });
  }

  private createNewTask(): FormGroup {
    // set today's date
    let date: string = new Date().toISOString().split('T')[0];
    return this.fb.group({
      taskName: this.fb.control<string>('', [
        Validators.required,
        Validators.min(3),
      ]),
      priority: this.fb.control<string>('1', Validators.required),
      dueDate: this.fb.control<string>(date, [Validators.required]),
    });
  }

  addTask(): void {
    this.tasksArray.push(this.createNewTask());
  }

  removeTask(i: number): void {
    this.tasksArray.removeAt(i);
  }

  // validation
  invalidFields(ctrlName: string): boolean {
    return (
      !!this.toDoForm.get(ctrlName)?.invalid &&
      !!this.toDoForm.get(ctrlName)?.dirty
    );
  }

  invalidForm(): boolean {
    return this.toDoForm.invalid || this.tasksArray.length <= 0;
  }

  saveForm(): void {
    const data = this.toDoForm.value;
    //this.toDoSubject.next(JSON.stringify(data));
    this.toDoSubject.emit(JSON.stringify(data));
    this.toDoForm = this.createNewForm();
  }
}
