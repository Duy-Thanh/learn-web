import ReactDOM from 'react-dom';
import React, { Fragment } from "react";

class ToDoList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: 0,
            name: '',
            completed: false
        };
    }

    get Id() {
        return this.state.id;
    }

    set Id(id_value) {
        this.setState({ ...this.state, id: id_value });
    }

    get Name() {
        return this.state.name;
    }

    set Name(name_value) {
        this.setState({ ...this.state, name: name_value });
    }

    get Completed() {
        return this.state.completed;
    }

    set Completed(status) {
        this.setState({ ...this.state, completed: status });
    }
}

export default ToDoList;