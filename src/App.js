import './App.css';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from './views/HomePage';
import EditPage from './views/EditPage';

function App() {
  return (
    <BrowserRouter>
      <div className='App'>
        <Routes>
          <Route path="/" element={
            <HomePage />
          }></Route>
          <Route path="/edit/:_id" element={
            <EditPage />
          }></Route>
        </Routes>
      </div>

    </BrowserRouter>
  );
};

export default App;
