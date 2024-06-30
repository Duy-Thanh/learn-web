/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import TaskModal from './TaskModal'
import Item from './Item'
import './ManageShop.css'
import axios from 'axios';
import upload from './assets/upload.png';
import search from './assets/search.svg';
import FeatureDeveloping from './FeatureDeveloping';

function ManageShop() {
  const [showModal, setShowModal] = useState(false);
  const [showFeatureDeveloping, setShowDeveloping] = useState(false);
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

  const handleOpenFeatureDevelopingModal = () => {
    setShowDeveloping(true);
  };

  const handleCloseFeatureDevelopingModal = () => {
    setShowDeveloping(false);
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
      <nav className='topbar' style={{ marginTop: '-45px'}}>
        <div className='container d-flex justify-content-between align-items-center' style={{ marginTop: '1.5%'}}>
            <button className="common_button title" style={{ fontSize: '18px'}} 
                    onClick={handleOpenModal}>
                <strong>+ THÊM MỚI</strong>
            </button>

            <button className="common_button title" style={{ marginLeft: '16vw', fontSize: '16.8px'}} 
                    onClick={handleOpenFeatureDevelopingModal}>
                <img src={upload} style={{ width: '28px'}}></img>
                <strong style={{ marginLeft: '8px'}}>XUẤT RA FILE</strong>
            </button>

            <div className="title" style={{ 
                marginLeft: '32vw', 
                fontSize: '16.8px'}}>
                <input id="searchInput" 
                       className="form-control-sm me-2 handleFormControl" 
                       type="search" placeholder="Tìm kiếm"
                       aria-label="Tìm kiếm" style={{ marginLeft: '20px', 
                                                   backgroundColor: 'white', 
                                                   color: 'black', 
                                                   width: '240px'}}></input>
                <button className="common_button" style={{ marginTop: '-0.5%', 
                                                           marginLeft: 'calc(32vw + 240px + 9.5vw)', 
                                                           fontSize: '16.8px'}} 
                    onClick={handleOpenFeatureDevelopingModal}>
                    <img src={search} style={{ width: '28px'}}></img>
                </button>
            </div>
        </div>
      </nav>
      <div>
        <div className='container d-flex justify-content-between align-items-center' 
             style={{ marginTop: '4.45%'}}>
          
        </div>
      </div>
      <div className='' style={{ 
        width: '98vw', 
        height: '58vh', 
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
      <FeatureDeveloping show={showFeatureDeveloping} onClose={handleCloseFeatureDevelopingModal} />
    </>
  )
}

export default ManageShop