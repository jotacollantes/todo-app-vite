/**
 * 
 * @param {string} todo 
 */
export const createTodoHTML=(todo)=>{
    //console.log({todo})
    if(!todo) throw new Error('todo object is required')

    const {done,id,description}=todo
    const html=`<div class="view">
        <input class="toggle" type="checkbox" ${done ? 'checked':''}>
        <label>${description}</label>
        <button class="destroy"></button>
    </div>
    <input class="edit" value="Create a TodoMVC template">`


    const liElement=document.createElement('li')
    liElement.innerHTML=html
    //const html=`<li class=${todo.done ? "checked": ""} data-id="abc">
    //*Añadimos el atributo data-id="abc"
    liElement.setAttribute('data-id',id)
    //*Añadimos la class="completed"
    if(todo.done)liElement.classList.add('completed')
    

    return liElement

}