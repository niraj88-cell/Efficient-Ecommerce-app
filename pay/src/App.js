import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Success from './Success';
import logo from './logo.svg';
import './App.css';
import PayAlll from './PayAlll';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/pay" element={<PayAlll />} />
      </Routes>
    </Router>
  );
}

export default App;
