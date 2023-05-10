import {
  Component,
  OnInit,
  Output,
  Input,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
export class ToDoComponent implements OnInit, OnChanges {
  toDoForm!: FormGroup;
  tasksArray!: FormArray;
  toDo: ToDo | null = null;

  @Output()
  //toDoSubject = new Subject<string>();
  toDoSubject = new EventEmitter<string>();

  @Input()
  submittedDataToEdit: ToDo | null = null;

  constructor(private fb: FormBuilder) {}

  get value(): ToDo | null {
    return this.toDoForm.value as ToDo;
  }

  set value(t: ToDo | null) {
    this.toDo = t;
    this.toDoForm = this.createNewForm(t);
  }

  ngOnInit(): void {
    this.toDoForm = this.createNewForm(this.toDo);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Changes detected from todoComponent >>>>>> ', changes);
    const c = changes['submittedDataToEdit'];
    if (c.firstChange) return;
    this.toDo = c.currentValue as ToDo;
    this.toDoForm = this.createNewForm(this.toDo);
  }

  private createNewForm(t: ToDo | null): FormGroup {
    this.tasksArray = this.createTasks(!!t ? t.tasks : []);
    return this.fb.group({
      title: this.fb.control<string>(!!t ? t.title : '', [
        Validators.required,
        Validators.min(3),
      ]),
      name: this.fb.control<string>(!!t ? t.name : '', [
        Validators.required,
        Validators.min(3),
      ]),
      tasks: this.tasksArray,
    });
  }

  private createNewTask(t: Task | null): FormGroup {
    // set today's date
    let date: string = new Date().toISOString().split('T')[0];
    return this.fb.group({
      taskName: this.fb.control<string>(!!t ? t.taskName : '', [
        Validators.required,
        Validators.min(3),
      ]),
      priority: this.fb.control<string>(
        !!t ? t.priority : '1',
        Validators.required
      ),
      dueDate: this.fb.control<string>(!!t ? t.dueDate : date, [
        Validators.required,
      ]),
    });
  }

  private createTasks(tasks: Task[]): FormArray {
    return this.fb.array(tasks.map((task) => this.createNewTask(task)));
  }

  addTask(): void {
    this.tasksArray.push(this.createNewTask(null));
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
    this.toDoForm = this.createNewForm(null);
  }
}
