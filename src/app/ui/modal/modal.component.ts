import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { closeErrorModal } from 'src/app/store/actions/tasks.actions';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent{
  @Input() title?: string;
  @Input() message?: string | null;

  constructor(private store: Store) {}

  onCloseModal() {
    this.store.dispatch(closeErrorModal());
  }

}
