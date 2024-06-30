import './App.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios';

class Homepage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nickname: '',
            isNull: 'false',
            nicknameArray: [],
            loadedNames: [] // New state to hold names loaded from JSON
        };
    }

    updateState = (evt) => {
        const val = evt.target.value;

        this.setState({ nickname: val });
    }

    checkNull = () => {
        if (this.state.nickname == "" || this.state.nickname.length == 0) {
            this.setState({ isNull: 'true' });
        } else {
            this.setState({ isNull: 'false' });
        }
    }

    loadNamesFromJson = () => {
        axios.get('http://localhost:5000/api/names')
            .then(response => {
                this.setState({ loadedNames: response.data });
            })
            .catch(error => {
                console.error('Error loading names:', error);
            });
    }

    componentDidMount() {
        this.loadNamesFromJson(); // Call the method to load names when the component mounts
    }

    btnClick = () => {
        this.checkNull();

        if (this.setState.isNull == 'true') return;
        else {
            const newName = { name: this.state.nickname };
            
            axios.post('http://localhost:5000/api/names', newName)
            .then(response => {
                this.setState(prevState => ({
                    nicknameArray: [...prevState.nicknameArray, response.data],
                    nickname: ''
                }));
            })
            .catch(error => {
                console.error('Error adding name:', error);
            });
        }
    }

    deleteName = (name) => {
        axios.delete(`http://localhost:5000/api/names/${name}`)
            .then(response => {
                if (response.data.success) {
                    this.setState(prevState => ({
                        nicknameArray: prevState.nicknameArray.filter(tag => tag.name !== name),
                        loadedNames: prevState.loadedNames.filter(tag => tag.name !== name)
                    }));
                }
            })
            .catch(error => {
                console.error('Error deleting name:', error);
            });
    }

    renderName = ({ name }) => (
        <div className='name-tag'>
            <div className='header'>
                <div className='close-button' onClick={this.deleteName(name)}>x</div>
                <div className='hello'>HELLO</div>
            </div>
            <div className='subtext'>my name is</div>
            <div className='name'>{name}</div>
        </div>
    )

    render() {
        return (
            <div className="App">
                <h2>Bảng tên Nhân Viên</h2>
                <form style={{ paddingTop: '10px'}}>
                    <input value={this.state.nickname} onChange={this.updateState} placeholder='Biệt danh của bạn là gì?'></input>
                    <button type='button' id='submitBtn' onClick={this.btnClick}>Tạo bảng tên</button>
                </form>

                <div style={{ display: this.state.isNull === 'true' ? 'block' : 'none', color: 'red', paddingTop: '20px' }}>
                    <FontAwesomeIcon icon={faExclamationTriangle}></FontAwesomeIcon>
                    <b style={{ marginLeft: '5px'}}>
                        Biệt danh không được bỏ trống. Vui lòng nhập biệt danh và thử lại
                    </b>
                </div>

                <div className='container'>
                    {this.state.nicknameArray.map((tag, index) => (
                        <this.renderName key={index} name={tag.name} />
                    ))}
                    {this.state.loadedNames.map((tag, index) => (
                        <this.renderName key={index} name={tag.name} />
                    ))}
                </div>
            </div>
        );
    }
}

export default Homepage;