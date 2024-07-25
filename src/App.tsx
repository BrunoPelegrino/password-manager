import './index.css';
import './App.css'
import Title from './components/title/Title';
import Form from './components/form/Form';

function App() {
  return (
    <div className="app-container">
      <Title />
      <div className="center-content">
        <Form />
      </div>
    </div>
  );
}

export default App;