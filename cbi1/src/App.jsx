/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState,useEffect } from 'react'
import axios from 'axios'

import './App.css'
import List from './components/List';
import Left from './components/Left';
// import Header from '../components/Header';
// import Nav from '../components/Nav';
// import List from '../components/List';
// import Footer from '../components/Footer';
// import Form from '../components/Form';

function App() {
  const [ems, setEms] = useState([]);
  const [selected,setSelected] = useState(null);
  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:3000/employees');
      setEms(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // const addEm = async (em) => {
  //   try {
  //     const res = await axios.post('http://localhost:3000/employees', em);
  //     setEms([...ems, res.data]);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const updateEm = async (em)=>{
  //   try{
  //     const res = await axios.put('http://localhost:3000/employees/'+em.id, em);
  //     setEms(ems.map((emp) => (emp.id === em.id ? res.data : emp)));
  //         setSelected(null);
  //         setIsVisible(false)
  //   }
  //   catch(err){
  //     console.log(err)
  //   }
  // }
  const deleteEm = async (id)=>{
    try{
      await axios.delete(`http://localhost:3000/employees/${id}`);
      setEms(ems.filter((em) => (em.id !== id)))
      selected(null);
    }
    catch(err){
      console.log(err)
    }
  }
  // const showForm = () =>{
  //   setIsVisible(true)
  // }
  // const hideForm = () =>{
  //   setIsVisible(false)
  // }
 
  return (
    <div className='app'>
      <Left></Left>
      <List ems={ems} onDelete={deleteEm}></List>
    </div>
  )
}

export default App