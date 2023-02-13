import {v4 as id} from 'uuid'
export class Todo {

/**
 * 
 * @param {string} description 
 */
    constructor(description){
        this.id=id();
        this.description=description;
        this.done=false;
        this.createAt= new Date();
    }

}