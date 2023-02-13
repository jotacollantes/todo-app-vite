import * as Store from '../../store/todo.store'
let element;


/**
 * 
 * @param {elementId} elementId 
 */

export const renderPending=(elementId)=>{
    //*Para no estar creando la referencia al element a cada rato
    if(!element) element=document.querySelector(elementId)
    if(!element) throw new Error(`element ${elementId} not found`)
    element.innerHTML=Store.getTodos(Store.Filters.Pending).length



}