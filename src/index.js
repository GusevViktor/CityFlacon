
import reportWebVitals from './reportWebVitals';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const renderTree = () => {
    ReactDOM.render(
        <StrictMode>
          <App />
        </StrictMode>,
        document.getElementById('root')
      );
}

renderTree()

reportWebVitals();
