import { createTodoHTML } from "./"

//*Aqui element se crea una sola vez
let element
export const renderTodos=(elementId,todos)=>{
    //console.log({elementId,todos})

    //*
    //* si el element no existe hago la asignacion y mapeo o abstraigo el elemento recibido en elementId que pude ser un .class de o un #id
     if(!element) element=document.querySelector(elementId)

     //*Si el elemento no existe en el dom a pesar de hacer la asignacion
     if(!element) throw new Error(`Element ${elementId} not found`)
       //console.log({element})

     //*Limpiamos el contenido de element antes de asignarle el html generado por createTodoHtml
     element.innerHTML=""
     
    for (const todo of todos) {
        
        element.append(createTodoHTML(todo))
        
    }
//console.log(element)
}