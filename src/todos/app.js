//*Para importar un doc html en crudo
import html from './app.html?raw'
import * as Store from '../store/todo.store'
import { renderTodos,renderPending } from './eventos'



const ElementIds = {
    //*Cuando son class se antepone el .
    //*Cuando son id se antepone el #
    todoList: '.todo-list',
    newTodoInput: '#new-todo-input',
    borrarCompletados: '.clear-completed',
    todoFiltersBar: '.filtro',
    showPendingTodos:'#pending-count'

}

/**
 * 
 * @param {string} elementId 
 */
export const App = (elementId) => {

    const displayTodos = () => {

        const todos = Store.getTodos(Store.getCurrentFilter())
        //console.log('displayTodos: ',todos)
        //* se va a renderizar en la class '.todo-list'
        renderTodos(ElementIds.todoList, todos)
        updatePendingCount()
        

    }

    const updatePendingCount=()=>{

        renderPending(ElementIds.showPendingTodos)

    }



    //*Ejecutamos esta funcion anonima autoinvocada (que es lo primero que se ejecuta)
    (() => {
        const app = document.createElement('div')
        //app.innerHTML='<h1>Hola Mundo</h1>'
        //*html tiene el codigo html raw /src/todos/app.html
        app.innerHTML = html
        //*aqui valor en elementId dentro del query selector es el id=#app y mapeo o abstraigo el elemento html que en este caso es un div y con append le año el nuevo div creado
        document.querySelector(elementId).append(app)
        //MOstramos las tareas
        displayTodos()

    })()




    //!Referencias html
    const newDescriptionInput = document.querySelector(ElementIds.newTodoInput)
    const todoUl = document.querySelector(ElementIds.todoList)
    const todoUlDelete = document.querySelector(ElementIds.todoList)

    const borrarCompletadosButton = document.querySelector(ElementIds.borrarCompletados)
    //*Va a devolver todos los html elements con la clase .filtro
    const filtersUlOptions = document.querySelectorAll(ElementIds.todoFiltersBar)


    //!Listeners
    newDescriptionInput.addEventListener('keyup', (event) => {
        //console.log('listener newDescriptionInput: ',event.target.value)
        //*Cualquier tecla distinta del Enter saca de la funcion
        if (event.keyCode !== 13) return;
        //*SI ingresa una cadena vacia
        if (event.target.value.trim().length === 0) return;
        Store.addTodo(event.target.value)
        displayTodos()
        //*borramos el contenido del input
        event.target.value = ''
    })

    todoUl.addEventListener('click', (event) => {
        //* event.target.closest([data-id]) me dara el elemento superior mas cercano que incluya el valor data-id
        const elementLiMasCercano = event.target.closest('[data-id]')
        //console.log(elementLiMasCercano.getAttribute('data-id'))
        Store.toggleTodo(elementLiMasCercano.getAttribute('data-id'))
        displayTodos()
    })

    todoUlDelete.addEventListener('click', (event) => {

        //console.log(event.target.classList.value)
        if (event.target.className !== 'destroy') return;
        //* event.target.closest([data-id]) me dara el elemento superior mas cercano que incluya el valor data-id
        const elementLiMasCercano = event.target.closest('[data-id]')
        //console.log(elementLiMasCercano.getAttribute('data-id'))
        Store.deleteTodo(elementLiMasCercano.getAttribute('data-id'))
        displayTodos()
    })

    borrarCompletadosButton.addEventListener('click', () => {
        Store.deleteCompleted()
        displayTodos()
    })

    //*como el querySelectorAll devuelve un array, para poder usar el addEventListerner tengo que iterar la lista
    for (const element of filtersUlOptions) {
        element.addEventListener('click', (e) => {
            //*Para que se deseleccionen todos los botones
            for (const element of filtersUlOptions) {

                element.classList.remove('selected')
            }
            //*Para que se seleccione un boton en especifico
            e.target.classList.add('selected')
            //console.log(e.target.text)
            switch (e.target.text) {
                case "Todos":
                    Store.setFilter(Store.Filters.All)
                    break;
                case "Pendientes":
                    Store.setFilter(Store.Filters.Pending)
                    break;
                case "Completados":
                    Store.setFilter(Store.Filters.Completed)
                    break;

                default:
                    break;
            }
            displayTodos()
        })

    }
}