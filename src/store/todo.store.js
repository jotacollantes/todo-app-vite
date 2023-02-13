import { Todo } from "../todos/models/todo.model"

export const Filters={
    All:'all',
    Completed:'Completed',
    Pending:'Pending'

}

 const state ={
    todos:[
        //*creamos las tareas
        new Todo('Piedra del Alma'),
        new Todo('Piedra del Infinito'),
        new Todo('Piedra del Tiempo'),
        new Todo('Piedra del Poder')
    ],
    //* Valores enumerados
    filter: Filters.All
    

}

export const initStore=()=>{
    //console.log('Initstore: ',state)
    loadStore()
}

export const loadStore=()=>{
   // throw new Error ('Not implemented')
   //* Puede devolver string|null, si viene null salgo de la funcionj
   
   if (!localStorage.getItem('state')) return;

   
   const leerLocalStorage= JSON.parse(localStorage.getItem('state'))
   
   const {todos=[],filter=Filters.All}=leerLocalStorage
   
   //state.todos=leerLocalStorage.todos||[]
   //state.filter=leerLocalStorage.filter||Filters.All
   state.todos=todos
   state.filter=filter
}

export const saveStateToLocalStorage =()=>{
    localStorage.setItem('state',JSON.stringify(state))
}


export const getTodos=(filter=Filters.All)=>{
    
    switch (filter) {
        case Filters.All:
           //* retorno un nuevo arreglo rompiendo la referencia con el ... 
           //console.log('Filters all')
           return [...state.todos]
           //return state.todos

        case Filters.Completed:
            //console.log('Filters completed')
            return state.todos.filter((todo)=>todo.done)
        case Filters.Pending:
            //console.log('Filters pending')
            return state.todos.filter((todo)=>!todo.done)
    
        default:
            throw new Error (`option ${filter} is not valid`)
    }
}



/**
 * 
 * @param {string} description 
 * 
 */
export const addTodo=(description)=>{

    if (!description) throw new Error ('Description is needed')
    //*Añado la nueva tarea
    state.todos.push(new Todo(description))
    console.log('addTodo: ',state.todos)
    saveStateToLocalStorage()


    
}

export const toggleTodo=(todoId)=>{


    state.todos.map((todo)=>{
            if (todo.id===todoId)
            {
                todo.done=!todo.done
            }
            return todo
    })
    saveStateToLocalStorage()

}

export const deleteTodo=(todoId)=>{
    if (!todoId) throw new Error ('Id is needed')
    //*Sobre escribe el array state.todos
    state.todos= state.todos.filter((todo)=>todo.id !== todoId)
    saveStateToLocalStorage()

}

export const deleteCompleted=()=>{
    //*Solo mantengo los pendientes todo=false
    state.todos= state.todos.filter((todo)=>!todo.done)
    saveStateToLocalStorage()

}

export const setFilter=(newFilter=Filters.All)=>{
    state.filter=newFilter
    saveStateToLocalStorage()
}


export const getCurrentFilter=()=>{
    return state.filter
}
// export default {
//     initStore
// }