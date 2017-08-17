import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {observable, action} from 'mobx';
import DevTools from 'mobx-react-devtools';
//import './App.css';

const styles = {
  listStyle: {
    listStyleType: 'none'
  }
}

@observer
class TodoList extends Component {
  render(){
    const todo = this.props.todo;
    const store = this.props.store;
    const index = this.props.index;
    return (
      <li><input type="checkbox" checked={todo.completed} onChange={() => store.handleToggle(index)}/>
        {todo.task} <a href="#" onClick={() => store.removeTodo(index)}>X</a>
      </li>
    )};
}

@observer
class App extends Component {
  render() {
    const todos = this.props.store.todos;
    return (
      <div>
        <h1>React + MobX Todo Demo</h1>
        <h4>You have {this.props.store.todoLength} Todos</h4>
        <h4>You have {this.props.store.completedTodoLength} completed Todos</h4>

        <ul style={styles.listStyle}>
          {todos.map((todo, index) => {
            return <TodoList todo={todo} index={index} key={todo.id} store={this.props.store} />
            }
          )}
        </ul>

        <input value={this.input} onChange={this.handleNewTodo} /><button onClick={this.addTodo}>Add</button>
        <div>
          <button onClick={() => this.props.store.setFilterToCompleted()}>Show Completed</button>
          <button>Delete All Completed</button>
        </div>
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
  @action handleFilter = () => {
    this.props.store.setFilterToCompleted('completed');
  };

  @action getCompletedTodos = () => {
    return this.props.store.todos.filter((todo) => {
      switch (this.props.store.todoFilter) {
        case 'completed':
          return todo.completed;
        default:
          return true;
      }
    })
  }
};

export default App;
