import { Component, Input } from '@angular/core';
import { ToDo } from './models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'workshop32';

  datas: ToDo[] = [];

  dataToEdit!: ToDo;

  onSubmitToDo(data: string) {
    this.datas.push(JSON.parse(data) as ToDo);
  }

  dataToBeEdited(data: ToDo) {
    console.log('Data received in root >>>>>>', data.name);
    this.dataToEdit = data;
  }
}
