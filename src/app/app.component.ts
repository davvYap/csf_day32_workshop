import { Component, Input, ViewChild } from '@angular/core';
import { ToDo } from './models';
import { ToDoComponent } from './to-do/to-do.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'workshop32';

  datas: ToDo[] = [];

  dataToEdit: ToDo | null = null;

  @ViewChild(ToDoComponent)
  todoComponent!: ToDoComponent;

  onSubmitToDo(data: string) {
    this.datas.push(JSON.parse(data) as ToDo);
  }

  dataToBeEdited(data: ToDo) {
    console.log('Data received in root >>>>>>', data.name);
    this.dataToEdit = data;
  }

  clear(): void {
    this.todoComponent.value = null;
  }
}
