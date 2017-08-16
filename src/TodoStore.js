import {observable, action, computed, useStrict} from 'mobx';

useStrict(true);

class TodoStore {
  @observable todos = ['learn mobx', 'make mobx app', 'be mobx jedi'];

  @computed get todoLength(){
    return this.todos.length;
  };

  @action addTodo(todoItem) {
    this.todos = [todoItem, ...this.todos]
  };
  @action removeTodo(index){
    this.todos.splice(index, 1);
  };
}

export default TodoStore;
