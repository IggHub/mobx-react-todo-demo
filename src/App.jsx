import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {observable, action} from 'mobx';
import DevTools from 'mobx-react-devtools';

@observer
class TodoList extends Component {
  render(){
    const todo = this.props.todo;
    return (
      <li>{todo} <a href="#" onClick={() => this.onTodoClick(this.props.index)}>X</a></li>
    )
  };

  @action onTodoClick = (index) => {
    this.props.removeTodo(index);
  };
}

@observer
class App extends Component {

  render() {
    const todos = this.props.store.todos;
    return (
      <div>
        <h1>React + MobX Todo Demo</h1>
        <h4>You have: {this.props.store.todoLength} Todos</h4>
        <ul>
          {todos.map((todo, index) => {
            return <TodoList todo={todo} index={index} key={index} removeTodo={this.removeTodo} />
            }
          )}
        </ul>
        <input value={this.input} onChange={this.handleNewTodo} /><button onClick={this.addTodo}>Add</button>
        <DevTools />
      </div>
    );
  };

  @observable input = '';

  @action addTodo = () => {
    this.props.store.addTodo(this.input);
    this.input = '';
  };

  @action handleNewTodo = (e) => {
    this.input = e.target.value;
  };

  @action removeTodo = (index) => {
    this.props.store.removeTodo(index);
  };
};

export default App;
