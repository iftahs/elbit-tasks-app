import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-no-tasks',
  templateUrl: './no-tasks.component.html',
  styleUrls: ['./no-tasks.component.scss']
})
export class NoTasksComponent {
  @Input() message: string = '';
}
