import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import './styles.css'
import Navbar from './components/Asset/Navbar';
import Leetcode from './components/Pages/Leetcode';

function App(): JSX.Element {
  return (
    <div className="flex flex-col h-screen">
      <div>
        <Navbar />
      </div>
      <div className="bg-emerald-600 flex-grow">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Leetcode />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
