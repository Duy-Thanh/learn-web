/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import TaskModal from './TaskModal'
import Item from './Item'
import './Navbar.css'
import './App.css'
import axios from 'axios';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    const response = await axios.get('http://localhost:3000/lists');
    setTasks(response.data);
  };
  
  useEffect(() => {
    loadTasks();
  }, []);
  
  const handleOpenModal = () => {
      setShowModal(true);
  };

  const handleCloseModal = () => {
      setShowModal(false);
      loadTasks();
  };

  const handleTaskUpdate = async (id, updatedTask) => {
      await axios.put(`http://localhost:3000/lists/${id}`, updatedTask);
      loadTasks();
  };

  const handleTaskDelete = async (id) => {
      await axios.delete(`http://localhost:3000/lists/${id}`);
      loadTasks();
  };

  return (
    <>
      <nav className='topbar'>
          <div className='container d-flex justify-content-between align-items-center mt-2'>
              <strong className='title'>Manage Employee</strong>
              
              <button className="common_button" onClick={handleOpenModal}>
                  <strong>+ Add Task</strong>
              </button>
          </div>
      </nav>
      <div className='' style={{ 
        width: '98vw', 
        height: '80vh', 
        marginTop: '40px', 
        paddingLeft: '50px', 
        overflowY: 'scroll',
        scrollbarColor: '#CBCBCB transparent'}}>
          {tasks.map(task => (
              <Item key={task.id} 
                    id={task.id} 
                    taskName={task.name} 
                    priority={task.priority === 0 ? 'High' : 
                      task.priority === 1 ? 'Medium' : 
                      task.priority === 2 ? 'Low' : 'No Priority'} 
                    status={task.status === 'todo' ? 'To Do' :
                      task.status === 'inprogress' ? 'In Progress' :
                      task.status === 'done' ? 'Done' : 'Undefined Status'
                    } 
                    onTaskUpdate={handleTaskUpdate}
                    onTaskDelete={handleTaskDelete} />
          ))}
      </div>
      <TaskModal show={showModal} onClose={handleCloseModal} />
    </>
  )
}

export default App
