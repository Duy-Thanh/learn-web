import { useState } from 'react';
import PropTypes from 'prop-types';
import './TaskModal.css';
import axios from 'axios';
import xmark from './assets/xmark.png';

function TaskModal({ show, onClose }) {
    // State for input value and selected priority
    const [inputValue, setInputValue] = useState('');
    const [selectedPriority, setSelectedPriority] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    // Check if the add button should be enabled
    const isAddButtonEnabled = inputValue.length > 0 && 
                               selectedPriority.length > 0 && 
                               selectedStatus.length > 0;

    // Use inline styling for conditional display
    const displayStyle = show ? { display: 'block' } : { display: 'none' };

    // Handle input change
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Handle priority selection
    const handlePriorityClick = (priority) => {
        setSelectedPriority(priority);
    };

    const handleStatusClick = (status) => {
        setSelectedStatus(status);
    }

    const handleSubmit = async () => {
        const priorityMap = { low: 2, medium: 1, high: 0 };
        const newTask = {
            name: inputValue,
            priority: priorityMap[selectedPriority],
            status: selectedStatus
        };

        try {
            await axios.post('http://localhost:3000/lists', newTask);
            onClose();
        } catch (error) {
            console.log('Error adding task: ', error);
        }
    }

    return (
        <div className="modal-overlay" style={displayStyle}>
            <div className="modal" style={displayStyle}>
                <div className="modal-header">
                    <strong style={{ fontSize: '24px'}}>Add Task</strong>
                    <button onClick={onClose} className="modal-close-button">
                        <img src={xmark}></img>
                    </button>
                </div>
                <div className="modal-body">
                    <p><strong style={{ color: 'gray'}}>Task</strong></p>

                    <input style={{ marginLeft: '10px', 
                        marginRight: '10px', 
                        width: '98%', 
                        height: '48px', 
                        background: 'none',
                        borderRadius: '10px',
                        color: 'black'}}
                        type="text"
                        placeholder="Type your task here..."
                        value={inputValue}
                        onChange={handleInputChange} />

                    <div style={{ marginTop: '20px' }}>
                        <p style={{ marginTop: '10px' }}>
                            <strong style={{ color: 'gray'}}>Priority</strong>
                        </p>
                        <div className="priority-buttons">
                            <button className={`priority-button high ${selectedPriority === 'high' ? 'selected' : ''}`} 
                                onClick={() => handlePriorityClick('high')}>High</button>
                            <button className={`priority-button medium ${selectedPriority === 'medium' ? 'selected' : ''}`} 
                                onClick={() => handlePriorityClick('medium')}>Medium</button>
                            <button className={`priority-button low ${selectedPriority === 'low' ? 'selected' : ''}`} 
                                onClick={() => handlePriorityClick('low')}>Low</button>
                        </div>
                        <p style={{ marginTop: '20px'}}>
                            <strong style={{ color: 'gray' }}>Status</strong>
                        </p>
                        <div className='status-buttons'>
                            <button className={`status-button todo ${selectedStatus === 'todo' ? 'selected' : ''}`}
                                    onClick={() => handleStatusClick('todo')}>To Do</button>
                            <button className={`status-button inprogress ${selectedStatus === 'inprogress' ? 'selected' : ''}`}
                                    onClick={() => handleStatusClick('inprogress')}>In Progress</button>
                            <button className={`status-button done ${selectedStatus === 'done' ? 'selected' : ''}`}
                                    onClick={() => handleStatusClick('done')}>Done</button>
                        </div>
                        <div className='status-priority'>
                            <p>
                                <strong className='text-notify'>
                                    {selectedPriority == '' ? 'You haven\'t selected any priority status' : `You have selected priority level is: ${selectedPriority}`}
                                </strong>
                            </p>
                        </div>
                        <div className='status-priority'>
                            <p>
                                <strong className='text-notify'>
                                    {selectedStatus == '' ? 'You haven\'t selected any task status' : `You have selected task status is: ${selectedStatus === "todo" ? "To Do" : selectedStatus === "inprogress" ? "In Progress" : selectedStatus === "done" ? "Done" : "Undefined Status"}`}
                                </strong>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="modal-footer">
                    <button className={`${isAddButtonEnabled === false ? 'add-button' : 'add-button-enabled'}`} 
                        disabled={!isAddButtonEnabled} onClick={handleSubmit}>Add</button>
                </div>
            </div>
        </div>
    );
}

TaskModal.propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default TaskModal;