/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import React from 'react';
import { useState } from 'react';
import './App.css';

export default function ListVisitor({ visitors, onDeleteVisitor}) {
    const [isDelete, setDelete] = useState();

    const handleDelete = (id) => {
        const check = window.confirm("Do you want to delete this section?\n\nThis cannot be undone!!!");
        if (check) {
            onDeleteVisitor(id);
            setDelete(true);
        }
    }

    return (
        <>
            <div className='list'>
                <h1>PRISON GUEST LIST</h1>
                <button id='addBtn'>Add guest</button>
                <br></br>
                {
                    isDelete && 
                        <div style={{
                            padding: '20px',
                            background: 'gray',
                            borderRadius: '15px',
                            color: 'black',
                            marginTop: '1.25%',
                            marginBottom: '2%'
                        }}>
                            Operation completed successfully! Visitor data was deleted from the system
                        </div>
                }
                <div style={{ marginTop: '20px'}}>
                    <table border={1} style={{ borderStyle: 'inset'}} className='main-table'>
                    <thead>
                        <tr>
                        <th>Guest ID</th>
                        <th>Full Name</th>
                        <th>Date visit</th>
                        <th>Prison Name</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            visitors.map((visitor, index) => (
                                <tr key={visitor.id}>
                                    <td>{index + 1}</td>
                                    <td>{visitor.nameVisitor}</td>
                                    <td>{visitor.dateVisited}</td>
                                    <td>{visitor.prisonVisited}</td>

                                    <td className='ud-btn'>
                                        <button style={{ 
                                            border: 'none', 
                                            background: 'cyan', 
                                            borderRadius: '10px', 
                                            padding: '10px', 
                                            paddingLeft: '40px', 
                                            paddingRight: '40px'}}>
                                            <strong>Edit</strong>
                                        </button>
                                        <button style={{ 
                                            border: 'none', 
                                            background: 'red', 
                                            borderRadius: '10px', 
                                            padding: '10px', 
                                            paddingLeft: '40px', 
                                            paddingRight: '40px', 
                                            color: 'white'}}
                                            onClick={() => handleDelete(visitor.id)}>
                                            <strong>Delete</strong>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}