import React, { Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ToDoList from "./todoList";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './header.css';

class Body extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                {this.props.todos.map(todo => (
                    <div className="col" key={todo.id}>
                        <ToDoList id={todo.id} title={todo.name} />
                    </div>
                ))}
            </div>
        );
    }
}

export default Body;