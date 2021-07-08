import { Component, Input, OnInit } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Form, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import * as actions from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  editando = false;

  chkCompletado: FormControl;
  txtInput: FormControl;

  constructor( private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.chkCompletado = new FormControl( this.todo.completado )
    this.txtInput = new FormControl( this.todo.texto, Validators.required)
    this.chkCompletado.valueChanges.subscribe(res => {
      console.log(res);
      this.store.dispatch(actions.toggle({id: this.todo.id}))
    })
  }

  terminarEdicion() {
    this.editando = false;

    if( this.txtInput.valid && this.todo.texto !== this.txtInput.value) {
      this.store.dispatch(
        actions.editar(
          {id: this.todo.id, texto: this.txtInput.value}
          )
      )
    }

  }

  borrar() {
    this.store.dispatch( actions.borrar({id: this.todo.id}) )
  }
}
