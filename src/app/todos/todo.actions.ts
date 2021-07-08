import { createAction, props } from '@ngrx/store';

export const crear =
createAction('[TODO] Crear todo', props<{texto: string}>());

export const toggle =
createAction( '[TODO] Toggle Todo', props<{ id: number}>());

export const editar =
createAction( '[TODO] Editar Todo', props<{ id: number, texto: string}>());

export const borrar =
createAction( '[TODO] Borrar Todo', props<{ id: number}>());

export const completado =
createAction( '[TODO] completado Todo', props<{ completado: boolean}>());

export const limpiarCompletados =
createAction( '[Filtro] limpiar Completados');
