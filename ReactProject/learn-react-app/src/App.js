import ReactDOM from 'react-dom';
import React, { Fragment } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Header from './header.js';
import Body from './body.js';
import ToDoList from './todoList.js';
import { Container, Row, Col } from "react-bootstrap";
import './App.css';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
  }

  addToDo = (newTodo) => {
    this.setState(prevState => ({
      todos: [...prevState.todos, newTodo]
    }));
  }

  render() {
    const { todos } = this.state;
    
    return (
      <div>
        <Header addToDo={this.addToDo}></Header>
        <Body todos={todos}></Body>
      </div>
    );  
  }
}

export default App;
