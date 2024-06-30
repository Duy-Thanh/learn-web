import React, { Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import ToDoList from "./todoList";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import './header.css';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: '',
            isNull: 'no',
        };
    }

    updateState = (evt) => {
        const val = evt.target.value;

        this.setState({
            inputValue: val
        });
    }

    checkNull = () => {
        if (this.state.inputValue == null || this.state.inputValue.length == 0) {
            this.setState({
                isNull: 'yes'
            });
        } else {
            this.setState({
                isNull: 'no'
            });
        }
    }

    addTodo = () => {
        this.checkNull();

        if (this.state.isNull == 'yes') return;
        else {
            const { inputValue } = this.props;
            const newToDo = { id: Date.now(), name: inputValue, completed: false };
            this.props.addToDo(newToDo);
            this.setState({ inputValue: '' });
        }
    }

    render() {
        return (
            <div id="navBar" className="p-0 m-0 bg-primary d-flex justify-content-center align-items-center">
                <div id="content-navbar" className='container text-center'>
                    <div className='row'>
                        <div className='col'>
                            <h3>TODO LIST</h3>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <input value={this.state.inputValue} onChange={this.updateState} id="todoTitle" placeholder='TIÊU ĐỀ VIỆC CẦN LÀM'></input>
                            <button id='btnAdd' className='btn btn-success' onClick={this.addTodo}>Thêm</button>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col'>
                            <div id="errorText" style={{ display: this.state.isNull === 'yes' ? 'block' : 'none', color: 'red' }}>
                                <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>
                                <b id="errortxt">Todo title must not be null. Please try again</b>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Header;