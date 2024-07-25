import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
// Importar JS do Bootstrap (opcional, se você precisar das funcionalidades JavaScript do Bootstrap)
import 'bootstrap/dist/js/bootstrap.bundle.min';

ReactDOM
  .createRoot(document.getElementById('root') as HTMLElement)
  .render(<App />);
