import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './styles.css'
import Navbar from './components/Asset/Navbar';
import Leetcode from './components/Pages/Leetcode';
import Home from './components/Pages/Home';

function App(): JSX.Element {
  return (
    <BrowserRouter>
    <div className="flex flex-col h-screen">
      <div>
        <Navbar />
      </div>
      <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/leetcode" element={<Leetcode />} />
          </Routes>
      </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
