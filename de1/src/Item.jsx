/* eslint-disable react/prop-types */
import { useState } from 'react';
import './Item.css';
import edit from './assets/edit.png';
import del from './assets/delete.png';
import save from './assets/save.png';

export default function Item({ id, taskName, priority, status, onTaskUpdate, onTaskDelete }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedTaskName, setEditedTaskName] = useState(taskName);
    const [editedPriority, setEditedPriority] = useState(priority);
    const [editedStatus, setEditedStatus] = useState(status);
    
    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setIsEditing(false);
        onTaskUpdate(id, {
            name: editedTaskName,
            priority: editedPriority === "High" ? 0 : editedPriority === "Medium" ? 1 : editedPriority === "Low" ? 2 : -1,
            status: editedStatus === "To Do" ? 'todo' : editedStatus === "In Progress" ? 'inprogress' : editedStatus === "Done" ? 'done' : '',
        });
    };

    const handleTaskNameChange = (e) => {
        setEditedTaskName(e.target.value);
    };

    const handlePriorityChange = (e) => {
        setEditedPriority(e.target.value);
    };

    const handleStatusChange = (e) => {
        setEditedStatus(e.target.value);
    };

    const handleDeleteClick = () => {
        onTaskDelete(id);
    };

    return (
        <>
            <div className='item' style={{ 
                borderRadius: '30px', 
                backgroundColor: '#CBCBCB', 
                width: '92vw',
                height: '100px'}}>
                    <div style={{ padding: '18px', paddingLeft: '80px', fontSize: '22px' }}>
                        <strong style={{ color: 'gray' }}>Task</strong>
                        <br></br>
                        {isEditing ? (
                            <input type="text" value={editedTaskName} onChange={handleTaskNameChange} />
                        ) : (
                            <div>{taskName === '' ? 'Empty' : taskName}</div>
                        )}
                        <div style={{ marginTop: `${isEditing === false ? '-9.22vh' : '-10vh'}`, marginLeft: '25vw', fontSize: '22px' }}>
                            <strong style={{ color: 'gray' }}>Priority</strong>
                            <br></br>
                            {isEditing ? (
                                <select style={{ marginTop: '0.5vh', padding: '2px', marginBottom: '-10vh' }} value={editedPriority} onChange={handlePriorityChange}>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            ) : (
                                <p><strong>{priority === '' ? 'Empty' : priority}</strong></p>
                            )}
                        </div>

                        <div style={{ 
                            marginTop: `${isEditing === false ? '-10.25vh' : '-8vh'}`, 
                            marginLeft: '45vw', 
                            fontSize: '22px' }}>
                            <div style={{ 
                                display: 'inline-block', 
                                backgroundColor: '#B4B4B4', 
                                padding: '5px 10px', 
                                borderRadius: '15px' }}>
                                {isEditing ? (
                                    <select value={editedStatus} onChange={handleStatusChange}>
                                        <option value="To Do">To Do</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Done">Done</option>
                                    </select>
                                ) : (
                                    <div style={{ display: 'inline-block', backgroundColor: '#B4B4B4', padding: '5px 10px', borderRadius: '15px' }}>
                                        <strong style={{ padding: '10px', color: 'gray' }}>{status === '' ? 'Empty' : status}</strong>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div style={{ 
                            marginTop: '-5.25vh', 
                            marginLeft: '70vw', 
                            fontSize: '22px' }}>
                                <button className='btnEdit' style={{ 
                                    margin: 0, 
                                    padding: 0, 
                                    backgroundColor: 'transparent', 
                                    width: '30px', 
                                    height: '30px',
                                    borderRadius: '10px' }}
                                    onClick={isEditing ? handleSaveClick : handleEditClick}>
                                    <img   
                                        src={isEditing ? save : edit} 
                                        style={{ 
                                            marginLeft: '-1px', 
                                            marginTop: '-12px', 
                                            width: '30px', 
                                            borderRadius: '10px'}}></img>
                                </button>
                        </div>

                        <div style={{ 
                            marginTop: '-4.55vh', 
                            marginLeft: '74vw', 
                            fontSize: '22px' }}>
                                <button className='btnDelete' style={{ 
                                    margin: 0, 
                                    padding: 0, 
                                    backgroundColor: 'transparent', 
                                    width: '30px', 
                                    height: '30px',
                                    borderRadius: '10px' }}
                                    onClick={handleDeleteClick}>
                                    <img   
                                        src={del} 
                                        style={{ 
                                            marginLeft: '-1px', 
                                            marginTop: '-12px', 
                                            width: '30px', 
                                            borderRadius: '10px'}}></img>
                                </button>
                        </div>
                    </div>
            </div>

            <div style={{ paddingTop: '40px' }}></div>
        </>
    )
}