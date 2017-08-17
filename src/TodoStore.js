import {observable, action, computed, useStrict} from 'mobx';
import * as Utils from './utils.js';

useStrict(true);

class TodoStore {
  @observable todos = [{task: 'learn mobx', completed: false, id: Utils.guid()}, {task: 'make mobx app', completed: false, id: Utils.guid()}, {task: 'be mobx jedi', completed: false, id: Utils.guid()}];
  @observable todoFilter = 'all';

  constructor(){
    this.todos.map((todo) => {
      console.log("task: " + todo.task);
      console.log("id: " + todo.id);
      console.log("completed: " + todo.completed);
    })
  }
  @computed get completedTodoLength(){
    return this.todos.filter((todo) => {
      return todo.completed == true
    }).length;
  };
  @computed get todoLength(){
    return this.todos.length;
  };
  @action addTodo(todoItem) {
    this.todos.push({task: todoItem, completed: false, id: Utils.guid()})
    //this.todos = [{task: todoItem, completed: false, id: Utils.guid()}, ...this.todos]
  };
  @action removeTodo(index){
    this.todos.splice(index, 1);
    console.log(this.todos);
  };
  @action handleToggle(index){
    this.todos[index].completed = !this.todos[index].completed;
    console.log(this.todos[index].completed);
  };
  @action setFilterToCompleted(){
    //this.todoFilter = newFilter;
    //console.log(this.todoFilter + "before");
    this.todoFilter = 'completed';
    console.log(this.todoFilter + " after");
  };

  @action filterCompletedTodos(){
    return this.todos.filter((todo) => {
      switch (this.todoFilter){
          case 'completed':
            return todo.completed;
          case 'active':
            return !todo.completed;
          default:
            return true;
          }
    })
  }
}

export default TodoStore;