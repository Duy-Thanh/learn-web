/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import react, { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css'
import ListVisitor from './ListVisitor';

function App() {

  const [visitors, setVisitor] = useState([]);
  
  // We don't need setSelected(), BUT FOR COMPABILTITY WARNING, WE MUST LEAVE IT ALONE!
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchVisitor();
  });

  const fetchVisitor = async () => {
    try {
      const response = await axios.get('http://localhost:3000/guests');
      setVisitor(response.data);
    } catch (error) {
      console.log(`Error when fetch visitor: ${error}`);
    }
  };

  const deleteVisitor = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/guests/${id}`);
      setVisitor(visitors.filter((visitor) => (visitor.id !== id)));
      // setSelected(null); // Huh, we even don't need that
      selected(null);
    } catch (error) {
      console.log(`Error when delete visitor: ${error}`);
    }
  }

  return (
    <>
      <div className='app'>
        <div style={{ 
          paddingLeft: '5px', 
          width: '300px', 
          height: 'auto', 
          backgroundColor: 'rgb(60, 52, 39)', 
          color: 'white'}}>
            <p>
              <strong style={{ marginLeft: '1vw'}}>ADMINISTRATION AREA</strong>
            </p>
            <ul className="ull">
              <li>Homepage</li>
              <li>Prison person management</li>
              <li>Prison room management</li>
              <li id="active">Prison guest management</li>
              <li>Prison employee management</li>
            </ul>

            <p>Current user: 
              <span style={{ color: 'gray', marginLeft: '5px'}}>admin</span>
            </p>
        </div>

        <ListVisitor visitors={visitors} onDeleteVisitor={deleteVisitor}/>
      </div>
    </>
  )
}

export default App