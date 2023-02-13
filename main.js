import './style.css'
import { App } from './src/todos/app'
import * as Store from './src/store/todo.store'

// console.log('hola mundo')

Store.initStore()

//*ID del elemento html donde se va a rederizar lo que se ejecuta en App() <div id="app"></div>
App('#app')