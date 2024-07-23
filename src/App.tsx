import './App.css';
import { useState } from 'react';
import Title from './components/Title';
import Form from './components/Form';
import Adicionar from './components/Adicionar';


function App() {
  const [showForm, setShowForm] = useState('');
  return (
    <>
      <Title />
      <Form />
    </>

  );
}

export default App;
