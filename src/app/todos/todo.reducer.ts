import { Action, createReducer, on } from '@ngrx/store';
import { Todo } from './models/todo.model';
import { crear, toggle, editar, borrar, completado, limpiarCompletados } from './todo.actions';

export const estadoInicial: Todo[] = [
  new Todo('salvar al mundo'),
  new Todo('vencer a thanos'),
  new Todo('Comprar traje de ironman'),
  new Todo('Robar escudo de capitan america'),
  new Todo('blabla bla'),
];

const _todoReducer = createReducer(
  estadoInicial,
  on(crear, (state, { texto }) => [...state, new Todo( texto )]),
  on(limpiarCompletados, (state) => {
    return state.map( todo => {
      return {
        ...todo,
        completado: false
      }
    });
  }),
  on(toggle, (state, { id }) => {
    return state.map( todo => {

      if ( todo.id === id ) {

        return {
          ...todo,
          completado: !todo.completado
        }
      } else {
        return todo;
      }

    });
  }),
  on(editar, (state, { id, texto }) => {
    return state.map( todo => {

      if ( todo.id === id ) {

        return {
          ...todo,
          texto
        }
      } else {
        return todo;
      }

    });
  }),
  on(borrar, (state, { id }) => {
    return state.filter( todo => todo.id !== id);
  }),
  on(completado, (state, { completado }) => {
    return state.map( todo => {


      return {
        ...todo,
        completado
      }

    });
  }),
);

export function todoReducer(state: Todo[] | undefined, action: Action) {
  return _todoReducer(state, action);
}
